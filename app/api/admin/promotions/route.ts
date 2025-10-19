import { NextRequest, NextResponse } from 'next/server'
import { createAdminPromotion, listAdminPromotions } from '@/lib/data/promotions'

// GET /api/admin/promotions - Get all promotions with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const type = searchParams.get('type') || 'all'

    const promotions = await listAdminPromotions({
      search,
      status,
      type,
    })

    return NextResponse.json({
      success: true,
      data: promotions
    })
  } catch (error) {
    console.error('Error fetching promotions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch promotions' },
      { status: 500 }
    )
  }
}

// POST /api/admin/promotions - Create new promotion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title, description, type, status, start_date, end_date,
      target_audience, budget, spent, clicks, conversions, is_active
    } = body

    if (!title || !type || !start_date || !end_date) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const created = await createAdminPromotion({
      title,
      description,
      type,
      status,
      start_date,
      end_date,
      target_audience,
      budget,
      spent,
      clicks,
      conversions,
      is_active,
    })

    return NextResponse.json({
      success: true,
      data: created
    })
  } catch (error) {
    console.error('Error creating promotion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create promotion' },
      { status: 500 }
    )
  }
}
