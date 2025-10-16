import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/admin/promotions/[id] - Get single promotion
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await query(`
      SELECT
        id, title, description, type, status, start_date, end_date,
        target_audience, budget, spent, clicks, conversions,
        is_active, created_at, updated_at
      FROM promotions WHERE id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Promotion not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
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

    const result = await query(
      `UPDATE promotions SET
        title = $1, description = $2, type = $3, status = $4, start_date = $5,
        end_date = $6, target_audience = $7, budget = $8, spent = $9, clicks = $10,
        conversions = $11, is_active = $12, updated_at = CURRENT_TIMESTAMP
       WHERE id = $13
       RETURNING *`,
      [
        title, description, type, status, start_date, end_date,
        target_audience, budget, spent, clicks, conversions, is_active, id
      ]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Promotion not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
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
    const checkResult = await query('SELECT id FROM promotions WHERE id = $1', [id])
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Promotion not found' },
        { status: 404 }
      )
    }

    // Delete promotion
    await query('DELETE FROM promotions WHERE id = $1', [id])

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
