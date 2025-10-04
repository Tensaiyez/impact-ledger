import { NextRequest, NextResponse } from 'next/server'
import { programStore } from '@/lib/data'
import { 
  validateEthereumAddress, 
  validateProgramName, 
  validateDate, 
  validateDateRange 
} from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Server-side validation
    const nameValidation = validateProgramName(body.name)
    if (!nameValidation.isValid) {
      return NextResponse.json(
        { error: nameValidation.error || 'Invalid program name' },
        { status: 400 }
      )
    }

    const tokenValidation = validateEthereumAddress(body.tokenAddr)
    if (!tokenValidation.isValid) {
      return NextResponse.json(
        { error: tokenValidation.error || 'Invalid token address' },
        { status: 400 }
      )
    }

    const ownerValidation = validateEthereumAddress(body.ownerAddr)
    if (!ownerValidation.isValid) {
      return NextResponse.json(
        { error: ownerValidation.error || 'Invalid owner address' },
        { status: 400 }
      )
    }

    // Validate dates if provided
    if (body.startDate) {
      const startDateValidation = validateDate(body.startDate)
      if (!startDateValidation.isValid) {
        return NextResponse.json(
          { error: startDateValidation.error || 'Invalid start date' },
          { status: 400 }
        )
      }
    }

    if (body.endDate) {
      const endDateValidation = validateDate(body.endDate)
      if (!endDateValidation.isValid) {
        return NextResponse.json(
          { error: endDateValidation.error || 'Invalid end date' },
          { status: 400 }
        )
      }
    }

    // Validate date range
    if (body.startDate && body.endDate) {
      const rangeValidation = validateDateRange(body.startDate, body.endDate)
      if (!rangeValidation.isValid) {
        return NextResponse.json(
          { error: rangeValidation.error || 'Invalid date range' },
          { status: 400 }
        )
      }
    }

    // Create program with sanitized data
    const program = programStore.create({
      name: nameValidation.sanitized,
      tokenAddr: tokenValidation.sanitized,
      ownerAddr: ownerValidation.sanitized,
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      endDate: body.endDate ? new Date(body.endDate) : undefined,
    })

    return NextResponse.json({ id: program.id })
  } catch (error) {
    console.error('Error creating program:', error)
    return NextResponse.json(
      { error: 'Failed to create program' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const programs = programStore.getAll()
    return NextResponse.json(programs)
  } catch (error) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    )
  }
}
