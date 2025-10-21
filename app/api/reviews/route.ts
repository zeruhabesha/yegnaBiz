import { NextRequest, NextResponse } from 'next/server'
import { getAllReviews, getAllCompanies } from '@/lib/data/companies'
import type { Company } from '@/lib/types/company'

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')?.toLowerCase() || ''

    let reviews = [], companies = []
    if (prisma) {
      reviews = await prisma.review.findMany()
      companies = await prisma.company.findMany()
    } else {
      ;[reviews, companies] = await Promise.all([getAllReviews(), getAllCompanies()])
    }
    const companyMap = new Map<number, Company>(
      (companies as any[]).map((company: any) => [company.id as number, company as Company]),
    )

    const filteredReviews = (reviews as any[]).filter((review: any) => {
      if (!search) return true
      return (
        (review.userName || '').toLowerCase().includes(search) ||
        (review.title || '').toLowerCase().includes(search) ||
        ((companyMap.get(review.companyId)?.name || '') as string).toLowerCase().includes(search)
      )
    })

    return NextResponse.json({
      success: true,
      data: filteredReviews.map((review: any) => ({
        ...review,
  companyName: companyMap.get(review.companyId)?.name ?? 'Unknown company',
      })),
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 })
  }
}
