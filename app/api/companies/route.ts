import { NextRequest, NextResponse } from 'next/server'
import { getAllCompanies, getCompaniesByFilters } from '@/lib/data/companies'

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

    const allCompanies = await getAllCompanies()
    const companies = await getCompaniesByFilters({
      search,
      location,
      categories: selectedCategories,
      cities: selectedCities,
      verifiedOnly,
      featuredOnly,
      sortBy,
    })

    const allCategories = Array.from(new Set(allCompanies.map((company) => company.category))).sort()
    const allCities = Array.from(
      new Set(allCompanies.map((company) => company.city).filter((city): city is string => Boolean(city))),
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
