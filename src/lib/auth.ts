// Mock authentication for MVP
// This will be replaced with BetterAuth in production

import { userStore, User } from "./data"

let currentUser: User | null = null

export const auth = {
  // Mock session object
  getSession: async () => {
    return {
      user: currentUser,
      session: currentUser ? { id: 'mock-session', userId: currentUser.id } : null,
    }
  },
  
  // Mock sign in
  signIn: async (email: string, password: string) => {
    const user = userStore.findByEmail(email)
    if (user) {
      currentUser = user
      return { user, session: { id: 'mock-session', userId: user.id } }
    }
    throw new Error('Invalid credentials')
  },
  
  // Mock sign up
  signUp: async (email: string, password: string, name: string, role: string) => {
    const existingUser = userStore.findByEmail(email)
    if (existingUser) {
      throw new Error('User already exists')
    }
    
    const user = userStore.create({
      email,
      name,
      role: role as 'NGO_ADMIN' | 'IMPLEMENTER' | 'AUDITOR',
    })
    
    currentUser = user
    return { user, session: { id: 'mock-session', userId: user.id } }
  },
  
  // Mock sign out
  signOut: async () => {
    currentUser = null
    return { success: true }
  },
}

export type Session = { user: User | null; session: { id: string; userId: string } | null }
export type AuthUser = User
