import { NextResponse } from 'next/server'
import { listPublicPromotions } from '@/lib/data/promotions'

export async function GET() {
  try {
    const promotions = await listPublicPromotions()
    return NextResponse.json({ success: true, data: promotions })
  } catch (error) {
    console.error('Error fetching promotions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch promotions' },
      { status: 500 },
    )
  }
}
