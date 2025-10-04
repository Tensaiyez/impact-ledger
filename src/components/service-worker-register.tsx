'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration)
          
          // Wait for the service worker to be active before registering background sync
          if (registration.active) {
            registerBackgroundSync(registration)
          } else {
            // Wait for the service worker to become active
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'activated') {
                    registerBackgroundSync(registration)
                  }
                })
              }
            })
          }
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
          // Don't show error in development mode
          if (process.env.NODE_ENV === 'production') {
            console.warn('Service Worker not available - offline features disabled')
          }
        })
    }
  }, [])

  const registerBackgroundSync = (registration: ServiceWorkerRegistration) => {
    if ('sync' in window.ServiceWorkerRegistration.prototype) {
      registration.sync.register('background-sync')
        .then(() => {
          console.log('Background sync registered successfully')
        })
        .catch((error) => {
          console.error('Background sync registration failed:', error)
        })
    }
  }

  return null
}
