import { NextRequest, NextResponse } from 'next/server'
import { getAllCompanies, getCompaniesByFilters } from '@/lib/data/companies'
import type { Company } from '@/lib/types/company'

let prisma: any = null
if (process.env.DATABASE_URL) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path')
    const prismaPath = path.join(process.cwd(), 'lib', 'prisma.cjs')
    prisma = require(prismaPath).prisma
  } catch (e) {
    console.warn('Prisma client not available for public companies endpoint, falling back to JSON store')
    prisma = null
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || undefined
    const location = searchParams.get('location') || undefined
    const categoriesParam = searchParams.get('categories') || ''
    const citiesParam = searchParams.get('cities') || ''
    const verifiedOnly = searchParams.get('verified') === 'true'
    const featuredOnly = searchParams.get('featured') === 'true'
    const sortBy = searchParams.get('sort') || undefined

    const selectedCategories = categoriesParam
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
    const selectedCities = citiesParam
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)

    let allCompanies: Company[]
    let companies: Company[]
    if (prisma) {
      // map filters to Prisma query
      const where: any = {}
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
        ]
      }
      if (location) {
        where.OR = where.OR || []
        where.OR.push({ city: { contains: location, mode: 'insensitive' } }, { region: { contains: location, mode: 'insensitive' } })
      }
      if (selectedCategories.length > 0) {
        where.category = { in: selectedCategories }
      }
      if (selectedCities.length > 0) {
        where.city = { in: selectedCities }
      }
      if (verifiedOnly) where.isVerified = true
      if (featuredOnly) where.isFeatured = true

      // fetch full list for categories/cities aggregation
      allCompanies = await prisma.company.findMany()

      companies = await prisma.company.findMany({ where })
      // apply sort locally if Prisma schema lacks specific computed fields
  if (sortBy === 'rating') companies.sort((a: Company, b: Company) => (b.rating || 0) - (a.rating || 0))
  if (sortBy === 'reviews') companies.sort((a: Company, b: Company) => (b.reviewCount || 0) - (a.reviewCount || 0))
    } else {
      allCompanies = await getAllCompanies()
      companies = await getCompaniesByFilters({
        search,
        location,
        categories: selectedCategories,
        cities: selectedCities,
        verifiedOnly,
        featuredOnly,
        sortBy,
      })
    }

    const allCategories = Array.from(new Set(allCompanies.map((company: Company) => company.category))).sort()
    const allCities = Array.from(
      new Set(allCompanies.map((company: Company) => company.city).filter((city): city is string => Boolean(city))),
    ).sort()

    return NextResponse.json({
      success: true,
      data: {
        companies,
        allCategories,
        allCities,
        total: allCompanies.length,
      },
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch companies' }, { status: 500 })
  }
}
