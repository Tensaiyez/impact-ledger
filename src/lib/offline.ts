import { openDB, DBSchema, IDBPDatabase } from 'idb'

interface OutboxDB extends DBSchema {
  outbox: {
    key: string
    value: {
      id: string
      url: string
      method: string
      body: any
      timestamp: number
      retries: number
    }
  }
}

class OfflineManager {
  private db: IDBPDatabase<OutboxDB> | null = null

  async init() {
    if (typeof window === 'undefined') return

    this.db = await openDB<OutboxDB>('impactledger-outbox', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('outbox')) {
          db.createObjectStore('outbox', { keyPath: 'id' })
        }
      },
    })
  }

  async queueRequest(url: string, method: string, body: any): Promise<string> {
    if (!this.db) await this.init()
    if (!this.db) throw new Error('Failed to initialize offline database')

    const id = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    await this.db.add('outbox', {
      id,
      url,
      method,
      body,
      timestamp: Date.now(),
      retries: 0,
    })

    return id
  }

  async getQueuedRequests(): Promise<Array<{
    id: string
    url: string
    method: string
    body: any
    timestamp: number
    retries: number
  }>> {
    if (!this.db) await this.init()
    if (!this.db) return []

    const tx = this.db.transaction('outbox', 'readonly')
    const store = tx.objectStore('outbox')
    return await store.getAll()
  }

  async removeRequest(id: string): Promise<void> {
    if (!this.db) await this.init()
    if (!this.db) return

    await this.db.delete('outbox', id)
  }

  async incrementRetries(id: string): Promise<void> {
    if (!this.db) await this.init()
    if (!this.db) return

    const tx = this.db.transaction('outbox', 'readwrite')
    const store = tx.objectStore('outbox')
    const request = await store.get(id)
    
    if (request) {
      request.retries += 1
      await store.put(request)
    }
  }

  async clearAll(): Promise<void> {
    if (!this.db) await this.init()
    if (!this.db) return

    const tx = this.db.transaction('outbox', 'readwrite')
    const store = tx.objectStore('outbox')
    await store.clear()
  }
}

export const offlineManager = new OfflineManager()

// Background sync handler
export async function handleBackgroundSync() {
  if (!navigator.onLine) return

  const requests = await offlineManager.getQueuedRequests()
  
  for (const request of requests) {
    try {
      const response = await fetch(request.url, {
        method: request.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.body),
      })

      if (response.ok) {
        await offlineManager.removeRequest(request.id)
        console.log(`Successfully synced request ${request.id}`)
      } else {
        await offlineManager.incrementRetries(request.id)
        console.warn(`Failed to sync request ${request.id}, retry count: ${request.retries + 1}`)
      }
    } catch (error) {
      await offlineManager.incrementRetries(request.id)
      console.error(`Error syncing request ${request.id}:`, error)
    }
  }
}

// Register background sync
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    if ('sync' in window.ServiceWorkerRegistration.prototype) {
      registration.sync.register('background-sync')
    }
  })
}
