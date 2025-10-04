// Service Worker for ImpactLedger PWA
const CACHE_NAME = 'impactledger-v1'
const OFFLINE_URL = '/offline'

// Files to cache for offline functionality
const STATIC_CACHE_URLS = [
  '/',
  '/offline',
  '/manifest.webmanifest',
  // Add other static assets as needed
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      return self.clients.claim()
    })
  )
})

// Fetch event - handle requests with caching and offline support
self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request))
    return
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request))
    return
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Clone the response
            const responseToCache = response.clone()

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache)
              })

            return response
          })
      })
      .catch(() => {
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
          return caches.match(OFFLINE_URL)
        }
      })
  )
})

// Handle API requests with offline queue
async function handleApiRequest(request) {
  try {
    const response = await fetch(request)
    return response
  } catch (error) {
    // If offline and it's a POST request to /api/pods, queue it
    if (request.method === 'POST' && request.url.includes('/api/pods')) {
      const requestData = await request.clone().json()
      
      // Store in IndexedDB for later sync
      await queueOfflineRequest(request.url, request.method, requestData)
      
      return new Response(
        JSON.stringify({ 
          message: 'Request queued for offline sync',
          queued: true 
        }),
        {
          status: 202,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    
    throw error
  }
}

// Handle navigation requests
async function handleNavigationRequest(request) {
  try {
    const response = await fetch(request)
    return response
  } catch (error) {
    // Return cached version or offline page
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    return caches.match(OFFLINE_URL) || new Response('Offline', { status: 503 })
  }
}

// Queue offline requests in IndexedDB
async function queueOfflineRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('impactledger-outbox', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['outbox'], 'readwrite')
      const store = transaction.objectStore('outbox')
      
      const id = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const requestData = {
        id,
        url,
        method,
        body: data,
        timestamp: Date.now(),
        retries: 0,
      }
      
      const addRequest = store.add(requestData)
      addRequest.onsuccess = () => resolve()
      addRequest.onerror = () => reject(addRequest.error)
    }
    
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('outbox')) {
        db.createObjectStore('outbox', { keyPath: 'id' })
      }
    }
  })
}

// Background sync event
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncOfflineRequests())
  }
})

// Sync queued offline requests
async function syncOfflineRequests() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('impactledger-outbox', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['outbox'], 'readwrite')
      const store = transaction.objectStore('outbox')
      
      const getAllRequest = store.getAll()
      getAllRequest.onsuccess = async () => {
        const requests = getAllRequest.result
        
        for (const requestData of requests) {
          try {
            const response = await fetch(requestData.url, {
              method: requestData.method,
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestData.body),
            })

            if (response.ok) {
              await new Promise((deleteResolve, deleteReject) => {
                const deleteRequest = store.delete(requestData.id)
                deleteRequest.onsuccess = () => deleteResolve()
                deleteRequest.onerror = () => deleteReject(deleteRequest.error)
              })
              console.log(`Successfully synced request ${requestData.id}`)
            } else {
              // Increment retry count
              requestData.retries += 1
              if (requestData.retries < 3) {
                await new Promise((putResolve, putReject) => {
                  const putRequest = store.put(requestData)
                  putRequest.onsuccess = () => putResolve()
                  putRequest.onerror = () => putReject(putRequest.error)
                })
              } else {
                // Remove after 3 failed attempts
                await new Promise((deleteResolve, deleteReject) => {
                  const deleteRequest = store.delete(requestData.id)
                  deleteRequest.onsuccess = () => deleteResolve()
                  deleteRequest.onerror = () => deleteReject(deleteRequest.error)
                })
              }
            }
          } catch (error) {
            console.error(`Error syncing request ${requestData.id}:`, error)
            // Increment retry count
            requestData.retries += 1
            if (requestData.retries < 3) {
              await new Promise((putResolve, putReject) => {
                const putRequest = store.put(requestData)
                putRequest.onsuccess = () => putResolve()
                putRequest.onerror = () => putReject(putRequest.error)
              })
            } else {
              await new Promise((deleteResolve, deleteReject) => {
                const deleteRequest = store.delete(requestData.id)
                deleteRequest.onsuccess = () => deleteResolve()
                deleteRequest.onerror = () => deleteReject(deleteRequest.error)
              })
            }
          }
        }
        resolve()
      }
      getAllRequest.onerror = () => reject(getAllRequest.error)
    }
    
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('outbox')) {
        db.createObjectStore('outbox', { keyPath: 'id' })
      }
    }
  })
}