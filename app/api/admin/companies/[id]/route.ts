import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET /api/admin/companies/[id] - Get single company
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const result = await query(`
      SELECT
        id, name, slug, description, category, subcategory, city, region, country,
        email, phone, website, address, latitude, longitude,
        is_verified, is_featured, is_premium, status,
        rating, review_count, view_count, established_year, employee_count,
        created_at, updated_at
      FROM companies WHERE id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching company:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch company' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/companies/[id] - Update company
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const {
      name, slug, description, category, subcategory, email, phone, website,
      address, city, region, country, latitude, longitude,
      established_year, employee_count, is_verified, is_featured, is_premium, status
    } = body

    const result = await query(
      `UPDATE companies SET
        name = $1, slug = $2, description = $3, category = $4, subcategory = $5,
        email = $6, phone = $7, website = $8, address = $9, city = $10,
        region = $11, country = $12, latitude = $13, longitude = $14,
        established_year = $15, employee_count = $16, is_verified = $17,
        is_featured = $18, is_premium = $19, status = $20, updated_at = CURRENT_TIMESTAMP
       WHERE id = $21
       RETURNING *`,
      [
        name, slug, description, category, subcategory, email, phone, website,
        address, city, region, country, latitude, longitude,
        established_year, employee_count, is_verified, is_featured, is_premium, status, id
      ]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error updating company:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update company' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/companies/[id] - Delete company
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Check if company exists
    const checkResult = await query('SELECT id FROM companies WHERE id = $1', [id])
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      )
    }

    // Delete company (CASCADE will handle related records)
    await query('DELETE FROM companies WHERE id = $1', [id])

    return NextResponse.json({
      success: true,
      message: 'Company deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting company:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete company' },
      { status: 500 }
    )
  }
}
