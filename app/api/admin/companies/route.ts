import { NextRequest, NextResponse } from 'next/server'
import { createAdminCompany, listAdminCompanies } from '@/lib/data/companies'
import { verifyToken, requireAdmin } from '@/lib/auth-middleware'

// GET /api/admin/companies - Get all companies with filtering (Admin only)
export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const category = searchParams.get('category') || 'all'

    const companies = await listAdminCompanies({
      search,
      status,
      category,
    })

    return NextResponse.json({
      success: true,
      data: companies
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch companies' },
      { status: 500 }
    )
  }
})

// POST /api/admin/companies - Create new company (Admin only)
export const POST = requireAdmin(async (request: NextRequest) => {
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

    const created = await createAdminCompany({
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

    return NextResponse.json({
      success: true,
      data: created
    })
  } catch (error) {
    console.error('Error creating company:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create company' },
      { status: 500 }
    )
  }
})
