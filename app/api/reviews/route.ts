import { NextRequest, NextResponse } from 'next/server'
import { getAllReviews, getAllCompanies } from '@/lib/data/companies'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')?.toLowerCase() || ''

    const [reviews, companies] = await Promise.all([getAllReviews(), getAllCompanies()])
    const companyMap = new Map(companies.map((company) => [company.id, company]))

    const filteredReviews = reviews.filter((review) => {
      if (!search) return true
      return (
        review.userName.toLowerCase().includes(search) ||
        review.title.toLowerCase().includes(search) ||
        companyMap.get(review.companyId)?.name.toLowerCase().includes(search)
      )
    })

    return NextResponse.json({
      success: true,
      data: filteredReviews.map((review) => ({
        ...review,
        companyName: companyMap.get(review.companyId)?.name ?? 'Unknown company',
      })),
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 })
  }
}
