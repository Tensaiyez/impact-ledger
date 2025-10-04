'use client'

import { useEffect } from 'react'
import { initializeSampleData } from '@/lib/data'

export function DataInitializer() {
  useEffect(() => {
    // Initialize sample data on app start
    initializeSampleData()
  }, [])

  return null
}
