import { NextResponse } from 'next/server'
import { getPublicPromotionById } from '@/lib/data/promotions'

interface RouteContext {
  params: { id: string }
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = context.params

  try {
    const promotion = await getPublicPromotionById(id)

    if (!promotion) {
      return NextResponse.json(
        { success: false, error: 'Promotion not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true, data: promotion })
  } catch (error) {
    console.error('Error fetching promotion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch promotion' },
      { status: 500 },
    )
  }
}
