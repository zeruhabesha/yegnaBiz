import { NextRequest, NextResponse } from 'next/server'
import { deleteCompanyById, getCompanyById, updateCompanyById } from '@/lib/mock-data'

// GET /api/admin/companies/[id] - Get single company
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const company = getCompanyById(Number(id))

    if (!company) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: company
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

    const updated = updateCompanyById(Number(id), {
      name,
      slug,
      description,
      category,
      subcategory,
      email,
      phone,
      website,
      address,
      city,
      region,
      country,
      latitude,
      longitude,
      established_year,
      employee_count,
      is_verified,
      is_featured,
      is_premium,
      status,
    })

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updated
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
    const deleted = deleteCompanyById(Number(id))
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      )
    }

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
