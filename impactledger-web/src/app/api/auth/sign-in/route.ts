import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const result = await auth.signIn(email, password)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Sign in error:', error)
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }
}
