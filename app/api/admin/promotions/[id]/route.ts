import { NextRequest, NextResponse } from 'next/server'
import { deleteAdminPromotion, getAdminPromotionById, updateAdminPromotion } from '@/lib/data/promotions'

// GET /api/admin/promotions/[id] - Get single promotion
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const promotion = await getAdminPromotionById(Number(id))

    if (!promotion) {
      return NextResponse.json(
        { success: false, error: 'Promotion not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: promotion
    })
  } catch (error) {
    console.error('Error fetching promotion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch promotion' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/promotions/[id] - Update promotion
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const {
      title, description, type, status, start_date, end_date,
      target_audience, budget, spent, clicks, conversions, is_active
    } = body

    const updated = await updateAdminPromotion(Number(id), {
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

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Promotion not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updated
    })
  } catch (error) {
    console.error('Error updating promotion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update promotion' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/promotions/[id] - Delete promotion
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Check if promotion exists
    const deleted = await deleteAdminPromotion(Number(id))
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Promotion not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Promotion deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting promotion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete promotion' },
      { status: 500 }
    )
  }
}
