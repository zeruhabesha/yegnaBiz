import { NextRequest, NextResponse } from 'next/server'
import { getBusinessHoursForCompany, getCompanyBySlug, getReviewsForCompany, getSocialLinksForCompany } from '@/lib/data/companies'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const company = await getCompanyBySlug(params.slug)

    if (!company) {
      return NextResponse.json({ success: false, error: 'Company not found' }, { status: 404 })
    }

    const [reviews, socialLinks, businessHours] = await Promise.all([
      getReviewsForCompany(company.id),
      getSocialLinksForCompany(company.id),
      getBusinessHoursForCompany(company.id),
    ])

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
