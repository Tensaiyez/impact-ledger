import { NextRequest, NextResponse } from 'next/server'
import { milestoneStore } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { programId, ...milestoneData } = body
    
    // Basic validation
    if (!programId || !milestoneData.name || !milestoneData.amount) {
      return NextResponse.json(
        { error: 'Program ID, Name, and Amount are required' },
        { status: 400 }
      )
    }

    // Parse criteria JSON
    let criteria
    try {
      criteria = JSON.parse(milestoneData.criteria)
    } catch {
      criteria = { description: milestoneData.criteria }
    }

    const milestone = milestoneStore.create({
      programId,
      name: milestoneData.name,
      amount: parseFloat(milestoneData.amount),
      criteria,
    })

    return NextResponse.json({ id: milestone.id })
  } catch (error) {
    console.error('Error creating milestone:', error)
    return NextResponse.json(
      { error: 'Failed to create milestone' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const programId = searchParams.get('programId')

    const milestones = milestoneStore.getAll(programId || undefined)
    return NextResponse.json(milestones)
  } catch (error) {
    console.error('Error fetching milestones:', error)
    return NextResponse.json(
      { error: 'Failed to fetch milestones' },
      { status: 500 }
    )
  }
}
