import { NextRequest, NextResponse } from 'next/server'
import { deleteAdminCompany, getAdminCompanyById, updateAdminCompany } from '@/lib/data/companies'
import { requireAdminForDynamic } from '@/lib/auth-middleware'

// GET /api/admin/companies/[id] - Get single company (Admin only)
export const GET = requireAdminForDynamic(async (
  request: NextRequest,
  user: any,
  context: { params: { id: string } }
) => {
  try {
    const { id } = context.params

    const company = await getAdminCompanyById(Number(id))

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
})

// PUT /api/admin/companies/[id] - Update company (Admin only)
export const PUT = requireAdminForDynamic(async (
  request: NextRequest,
  user: any,
  context: { params: { id: string } }
) => {
  try {
    const { id } = context.params
    const body = await request.json()
    const {
      name, slug, description, category, subcategory, email, phone, website,
      address, city, region, country, latitude, longitude,
      established_year, employee_count, is_verified, is_featured, is_premium, status
    } = body

    const updated = await updateAdminCompany(Number(id), {
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
})

// DELETE /api/admin/companies/[id] - Delete company (Admin only)
export const DELETE = requireAdminForDynamic(async (
  request: NextRequest,
  user: any,
  context: { params: { id: string } }
) => {
  try {
    const { id } = context.params

    // Check if company exists
    const deleted = await deleteAdminCompany(Number(id))
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
})
