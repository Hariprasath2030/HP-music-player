import { NextRequest, NextResponse } from 'next/server'
import { musicApiClient } from '@/lib/musicApi'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const trackId = params.id

    if (!trackId) {
      return NextResponse.json(
        { error: 'Track ID is required' },
        { status: 400 }
      )
    }

    const track = await musicApiClient.getTrack(trackId)
    
    return NextResponse.json(track)
  } catch (error) {
    console.error('Track API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch track' },
      { status: 500 }
    )
  }
}