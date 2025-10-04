// Mock auth client for MVP
import { useState, useEffect } from 'react'
import { auth, Session, AuthUser } from './auth'

// Mock session hook
export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch('/api/auth/get-session')
        if (response.ok) {
          const currentSession = await response.json()
          setSession(currentSession)
        } else {
          setSession(null)
        }
      } catch (error) {
        console.error('Error loading session:', error)
        setSession(null)
      } finally {
        setIsPending(false)
      }
    }

    loadSession()
    
    // Listen for auth changes
    const handleAuthChange = () => {
      loadSession()
    }
    
    window.addEventListener('auth-change', handleAuthChange)
    return () => window.removeEventListener('auth-change', handleAuthChange)
  }, [])

  return {
    data: session,
    isPending,
    error: null,
  }
}

// Mock sign in function
export const signIn = {
  email: async ({ email, password }: { email: string; password: string }) => {
    try {
      const result = await auth.signIn(email, password)
      // Trigger a re-render by updating the session
      window.dispatchEvent(new Event('auth-change'))
      return result
    } catch (error) {
      throw error
    }
  },
}

// Mock sign up function
export const signUp = {
  email: async ({ email, password, name, role }: { 
    email: string; 
    password: string; 
    name: string; 
    role: string 
  }) => {
    try {
      const result = await auth.signUp(email, password, name, role)
      // Trigger a re-render by updating the session
      window.dispatchEvent(new Event('auth-change'))
      return result
    } catch (error) {
      throw error
    }
  },
}

// Mock sign out function
export const signOut = async () => {
  try {
    await fetch('/api/auth/sign-out', { method: 'POST' })
    // Trigger a re-render by updating the session
    window.dispatchEvent(new Event('auth-change'))
  } catch (error) {
    throw error
  }
}

// Mock get session function
export const getSession = async () => {
  return await auth.getSession()
}
