import { NextRequest, NextResponse } from 'next/server'
import { getBusinessHoursForCompany, getCompanyBySlug, getReviewsForCompany, getSocialLinksForCompany } from '@/lib/data/companies'

let prisma: any = null
if (process.env.DATABASE_URL) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path')
    const prismaPath = path.join(process.cwd(), 'lib', 'prisma.cjs')
    prisma = require(prismaPath).prisma
  } catch (e) {
    prisma = null
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    let company = null
    if (prisma) {
      company = await prisma.company.findUnique({ where: { slug: params.slug } })
    } else {
      company = await getCompanyBySlug(params.slug)
    }

    if (!company) {
      return NextResponse.json({ success: false, error: 'Company not found' }, { status: 404 })
    }

    let reviews = [], socialLinks = [], businessHours = []
    if (prisma) {
      reviews = await prisma.review.findMany({ where: { companyId: company.id } }).catch(() => [])
      // socialLink/businessHour models may not exist; attempt with safe catches
      try { socialLinks = await prisma.socialLink.findMany({ where: { companyId: company.id } }) } catch (e) { socialLinks = [] }
      try { businessHours = await prisma.businessHour.findMany({ where: { companyId: company.id } }) } catch (e) { businessHours = [] }
    } else {
      const [r, s, h] = await Promise.all([
        getReviewsForCompany(company.id),
        getSocialLinksForCompany(company.id),
        getBusinessHoursForCompany(company.id),
      ])
      reviews = r
      socialLinks = s
      businessHours = h
    }

    return NextResponse.json({
      success: true,
      data: {
        company,
        reviews,
        socialLinks,
        businessHours,
      },
    })
  } catch (error) {
    console.error('Error fetching company:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch company' }, { status: 500 })
  }
}
