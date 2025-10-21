import { NextRequest, NextResponse } from 'next/server'
import { createAdminCompany, listAdminCompanies } from '@/lib/data/companies'
import { verifyToken, requireAdmin } from '@/lib/auth-middleware'

// Optional Prisma integration
let prisma: any = null
if (process.env.DATABASE_URL) {
  try {
    // require the CommonJS wrapper using an absolute path so runtime aliasing is not required
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path')
    const prismaPath = path.join(process.cwd(), 'lib', 'prisma.cjs')
    prisma = require(prismaPath).prisma
  } catch (e) {
    console.warn('Prisma client not available, falling back to JSON store')
    prisma = null
  }
}

// GET /api/admin/companies - Get all companies with filtering (Admin only)
export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const category = searchParams.get('category') || 'all'

    let companies
    if (prisma) {
      // Map query into Prisma where clause
      const where: any = {}
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } },
        ]
      }
      if (status && status !== 'all') where.status = status
      if (category && category !== 'all') where.category = category

      companies = await prisma.company.findMany({ where })
    } else {
      companies = await listAdminCompanies({
        search,
        status,
        category,
      })
    }

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

    let created
    if (prisma) {
      created = await prisma.company.create({ data: {
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
        establishedYear: established_year,
        employeeCount: employee_count,
        isVerified: !!is_verified,
        isFeatured: !!is_featured,
        isPremium: !!is_premium,
        status,
      }})
    } else {
      created = await createAdminCompany({
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
    }

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
