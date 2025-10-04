import { NextRequest, NextResponse } from 'next/server'
import { podStore, disbursementStore, beneficiaryStore } from '@/lib/data'

// Simple hash function for MVP
const simpleHash = (data: string): string => {
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString(16)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Basic validation
    if (!body.disbursementId || !body.beneficiaryId) {
      return NextResponse.json(
        { error: 'Disbursement ID and Beneficiary ID are required' },
        { status: 400 }
      )
    }

    // Generate PoD hash
    const podData = {
      disbursementId: body.disbursementId,
      beneficiaryId: body.beneficiaryId,
      gpsLat: body.gpsLat,
      gpsLng: body.gpsLng,
      photoUri: body.photoUri,
      ts: new Date().toISOString(),
    }
    
    const podHash = simpleHash(JSON.stringify(podData))

    const pod = podStore.create({
      disbursementId: body.disbursementId,
      beneficiaryId: body.beneficiaryId,
      gpsLat: body.gpsLat,
      gpsLng: body.gpsLng,
      photoUri: body.photoUri,
      ts: new Date(),
      podHash,
      status: 'pending',
    })

    return NextResponse.json({ id: pod.id, podHash })
  } catch (error) {
    console.error('Error creating PoD:', error)
    return NextResponse.json(
      { error: 'Failed to create PoD' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    let pods = podStore.getAll()
    
    // Filter by status if provided
    if (status) {
      pods = pods.filter(pod => pod.status === status)
    }

    // Simple pagination
    const total = pods.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPods = pods.slice(startIndex, endIndex)

    return NextResponse.json({
      pods: paginatedPods,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching PoDs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch PoDs' },
      { status: 500 }
    )
  }
}