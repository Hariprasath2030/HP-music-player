import { NextRequest, NextResponse } from 'next/server'
import { musicApiClient } from '@/lib/musicApi'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    const results = await musicApiClient.searchTracks(query, limit)
    
    return NextResponse.json(results)
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Failed to search tracks' },
      { status: 500 }
    )
  }
}