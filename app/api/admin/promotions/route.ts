import { NextRequest, NextResponse } from 'next/server'
import { createAdminPromotion, listAdminPromotions } from '@/lib/data/promotions'

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

// GET /api/admin/promotions - Get all promotions with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const type = searchParams.get('type') || 'all'

    let promotions
    if (prisma) {
      const where: any = {}
      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ]
      }
      if (status && status !== 'all') where.status = status
      if (type && type !== 'all') where.type = type

      promotions = await prisma.promotion.findMany({ where, orderBy: { createdAt: 'desc' } })
    } else {
      promotions = await listAdminPromotions({
        search,
        status,
        type,
      })
    }

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

    let created
    if (prisma) {
      created = await prisma.promotion.create({ data: {
        title,
        description,
        type,
        status,
        startDate: start_date ? new Date(start_date) : undefined,
        endDate: end_date ? new Date(end_date) : undefined,
        targetAudience: target_audience,
        budget: budget ?? 0,
        spent: spent ?? 0,
        clicks: clicks ?? 0,
        conversions: conversions ?? 0,
        isActive: !!is_active,
      }})
    } else {
      created = await createAdminPromotion({
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
    }

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
