import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/admin/promotions - Get all promotions with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const type = searchParams.get('type') || 'all'

    let whereClause = ''
    const params: any[] = []
    let paramIndex = 1

    if (search) {
      whereClause += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    if (status !== 'all') {
      whereClause += ` AND status = $${paramIndex}`
      params.push(status)
      paramIndex++
    }

    if (type !== 'all') {
      whereClause += ` AND type = $${paramIndex}`
      params.push(type)
    }

    const result = await query(`
      SELECT
        id, title, description, type, status, start_date, end_date,
        target_audience, budget, spent, clicks, conversions,
        is_active, created_at, updated_at
      FROM promotions
      WHERE 1=1 ${whereClause}
      ORDER BY created_at DESC
    `, params)

    return NextResponse.json({
      success: true,
      data: result.rows
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

    const result = await query(
      `INSERT INTO promotions (
        title, description, type, status, start_date, end_date,
        target_audience, budget, spent, clicks, conversions, is_active
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
      ) RETURNING *`,
      [
        title, description, type, status || 'active', start_date, end_date,
        target_audience, budget || 0, spent || 0, clicks || 0, conversions || 0, is_active !== false
      ]
    )

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error creating promotion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create promotion' },
      { status: 500 }
    )
  }
}
