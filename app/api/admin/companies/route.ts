import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/admin/companies - Get all companies with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const category = searchParams.get('category') || 'all'

    let whereClause = ''
    const params: any[] = []
    let paramIndex = 1

    if (search) {
      whereClause += ` AND (name ILIKE $${paramIndex} OR city ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    if (status !== 'all') {
      whereClause += ` AND status = $${paramIndex}`
      params.push(status)
      paramIndex++
    }

    if (category !== 'all') {
      whereClause += ` AND category = $${paramIndex}`
      params.push(category)
    }

    const result = await query(`
      SELECT
        id, name, slug, description, category, city, region, country,
        email, phone, website, address,
        is_verified, is_featured, is_premium, status,
        rating, review_count, view_count, established_year, employee_count,
        created_at, updated_at
      FROM companies
      WHERE 1=1 ${whereClause}
      ORDER BY created_at DESC
    `, params)

    return NextResponse.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch companies' },
      { status: 500 }
    )
  }
}

// POST /api/admin/companies - Create new company
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name, slug, description, category, subcategory, email, phone, website,
      address, city, region, country, latitude, longitude,
      established_year, employee_count, is_verified, is_featured, is_premium, status
    } = body

    if (!name || !slug || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await query(
      `INSERT INTO companies (
        name, slug, description, category, subcategory, email, phone, website,
        address, city, region, country, latitude, longitude,
        established_year, employee_count, is_verified, is_featured, is_premium, status
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
      ) RETURNING *`,
      [
        name, slug, description, category, subcategory, email, phone, website,
        address, city, region, country || 'Ethiopia', latitude, longitude,
        established_year, employee_count, is_verified || false, is_featured || false,
        is_premium || false, status || 'active'
      ]
    )

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error creating company:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create company' },
      { status: 500 }
    )
  }
}
