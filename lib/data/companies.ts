import type { AdminCompany } from '@/lib/types/admin'
import type { BusinessHour, Company, Review, SocialLink } from '@/lib/types/company'
import { readJsonFile, writeJsonFile } from '@/lib/data/json-store'

const PUBLIC_COMPANIES_FILE = 'companies.json'
const ADMIN_COMPANIES_FILE = 'admin-companies.json'
const REVIEWS_FILE = 'reviews.json'
const SOCIAL_LINKS_FILE = 'social-links.json'
const BUSINESS_HOURS_FILE = 'business-hours.json'

function normalizeStatus(status?: string): Company['status'] {
  const allowed: Company['status'][] = ['active', 'pending', 'suspended', 'rejected']
  return allowed.includes(status as Company['status']) ? (status as Company['status']) : 'active'
}

function mapAdminToPublicCompany(adminCompany: AdminCompany, previous?: Company): Company {
  return {
    id: adminCompany.id,
    name: adminCompany.name,
    slug: adminCompany.slug,
    description: adminCompany.description ?? '',
    category: adminCompany.category,
    subcategory: adminCompany.subcategory ?? undefined,
    email: adminCompany.email ?? undefined,
    phone: adminCompany.phone ?? undefined,
    website: adminCompany.website ?? undefined,
    address: adminCompany.address ?? undefined,
    city: adminCompany.city || undefined,
    region: adminCompany.region || undefined,
    country: adminCompany.country || undefined,
    latitude: adminCompany.latitude,
    longitude: adminCompany.longitude,
    rating: adminCompany.rating,
    reviewCount: adminCompany.review_count,
    viewCount: adminCompany.view_count,
    isVerified: adminCompany.is_verified,
    isFeatured: adminCompany.is_featured,
    isPremium: adminCompany.is_premium,
    establishedYear: adminCompany.established_year,
    employeeCount: adminCompany.employee_count ?? undefined,
    status: normalizeStatus(adminCompany.status),
    coverImageUrl: previous?.coverImageUrl ?? '/hero-companies.jpg',
    logoUrl: previous?.logoUrl ?? '/placeholder-logo.png',
  }
}

async function readPublicCompanies(): Promise<Company[]> {
  try {
    return await readJsonFile<Company[]>(PUBLIC_COMPANIES_FILE)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function writePublicCompanies(companies: Company[]) {
  await writeJsonFile(PUBLIC_COMPANIES_FILE, companies)
}

async function readAdminCompanies(): Promise<AdminCompany[]> {
  try {
    return await readJsonFile<AdminCompany[]>(ADMIN_COMPANIES_FILE)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function writeAdminCompanies(companies: AdminCompany[]) {
  await writeJsonFile(ADMIN_COMPANIES_FILE, companies)
}

async function syncPublicCompanies(adminCompanies: AdminCompany[]) {
  const existing = await readPublicCompanies()
  const existingMap = new Map(existing.map((company) => [company.id, company]))
  const publicCompanies = adminCompanies.map((adminCompany) =>
    mapAdminToPublicCompany(adminCompany, existingMap.get(adminCompany.id)),
  )
  await writePublicCompanies(publicCompanies)
}

export async function getAllCompanies(): Promise<Company[]> {
  return await readPublicCompanies()
}

export async function getCompanyBySlug(slug: string): Promise<Company | undefined> {
  const companies = await readPublicCompanies()
  return companies.find((company) => company.slug === slug)
}

export async function getFeaturedCompanies(limit = 6): Promise<Company[]> {
  const companies = await readPublicCompanies()
  return companies.filter((company) => company.isFeatured).slice(0, limit)
}

export async function getCompanyStats() {
  const companies = await readPublicCompanies()
  const total = companies.length
  const verified = companies.filter((company) => company.isVerified).length
  const featured = companies.filter((company) => company.isFeatured).length
  const premium = companies.filter((company) => company.isPremium).length
  const totalReviews = companies.reduce((sum, company) => sum + company.reviewCount, 0)

  return { total, verified, featured, premium, totalReviews }
}

export async function getCategoryCounts() {
  const companies = await readPublicCompanies()
  const categoryMap = new Map<string, number>()

  for (const company of companies) {
    categoryMap.set(company.category, (categoryMap.get(company.category) ?? 0) + 1)
  }

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export async function getCompaniesByFilters(params: {
  search?: string
  location?: string
  categories?: string[]
  cities?: string[]
  verifiedOnly?: boolean
  featuredOnly?: boolean
  sortBy?: string
}): Promise<Company[]> {
  const companies = await readPublicCompanies()
  const {
    search,
    location,
    categories = [],
    cities = [],
    verifiedOnly = false,
    featuredOnly = false,
    sortBy = 'relevance',
  } = params

  let filtered = [...companies]

  if (search) {
    const query = search.toLowerCase()
    filtered = filtered.filter(
      (company) =>
        company.name.toLowerCase().includes(query) ||
        company.description.toLowerCase().includes(query) ||
        company.category.toLowerCase().includes(query) ||
        company.subcategory?.toLowerCase().includes(query),
    )
  }

  if (location) {
    const locationQuery = location.toLowerCase()
    filtered = filtered.filter(
      (company) =>
        company.city?.toLowerCase().includes(locationQuery) ||
        company.region?.toLowerCase().includes(locationQuery) ||
        company.address?.toLowerCase().includes(locationQuery),
    )
  }

  if (categories.length > 0) {
    filtered = filtered.filter((company) => categories.includes(company.category))
  }

  if (cities.length > 0) {
    filtered = filtered.filter((company) => (company.city ? cities.includes(company.city) : false))
  }

  if (verifiedOnly) {
    filtered = filtered.filter((company) => company.isVerified)
  }

  if (featuredOnly) {
    filtered = filtered.filter((company) => company.isFeatured)
  }

  switch (sortBy) {
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'reviews':
      filtered.sort((a, b) => b.reviewCount - a.reviewCount)
      break
    case 'newest':
      filtered.sort((a, b) => b.id - a.id)
      break
    default:
      filtered.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        return b.rating - a.rating
      })
  }

  return filtered
}

export async function getReviewsForCompany(companyId: number): Promise<Review[]> {
  try {
    const reviews = await readJsonFile<Review[]>(REVIEWS_FILE)
    return reviews.filter((review) => review.companyId === companyId)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

export async function getAllReviews(): Promise<Review[]> {
  try {
    return await readJsonFile<Review[]>(REVIEWS_FILE)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

export async function getSocialLinksForCompany(companyId: number): Promise<SocialLink[]> {
  try {
    const links = await readJsonFile<SocialLink[]>(SOCIAL_LINKS_FILE)
    return links.filter((link) => link.companyId === companyId)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

export async function getBusinessHoursForCompany(companyId: number): Promise<BusinessHour[]> {
  try {
    const hours = await readJsonFile<BusinessHour[]>(BUSINESS_HOURS_FILE)
    return hours.filter((entry) => entry.companyId === companyId)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

export async function listAdminCompanies({
  search,
  status,
  category,
}: {
  search?: string
  status?: string
  category?: string
}): Promise<AdminCompany[]> {
  const companies = await readAdminCompanies()

  return companies.filter((company) => {
    const matchesSearch = search
      ? company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.city?.toLowerCase().includes(search.toLowerCase())
      : true
    const matchesStatus = status && status !== 'all' ? company.status === status : true
    const matchesCategory = category && category !== 'all' ? company.category === category : true
    return matchesSearch && matchesStatus && matchesCategory
  })
}

export async function getAdminCompanyById(id: number): Promise<AdminCompany | undefined> {
  const companies = await readAdminCompanies()
  return companies.find((company) => company.id === id)
}

export async function createAdminCompany(data: Partial<AdminCompany>): Promise<AdminCompany> {
  const companies = await readAdminCompanies()
  const nextId = companies.reduce((max, company) => Math.max(max, company.id), 0) + 1
  const timestamp = new Date().toISOString()

  if (!data.name || !data.slug || !data.category) {
    throw new Error('Missing required fields')
  }

  const adminCompany: AdminCompany = {
    id: nextId,
    name: data.name,
    slug: data.slug,
    description: data.description ?? '',
    category: data.category,
    subcategory: data.subcategory,
    email: data.email,
    phone: data.phone,
    website: data.website,
    address: data.address,
    city: data.city ?? '',
    region: data.region ?? '',
    country: data.country ?? 'Ethiopia',
    latitude: data.latitude,
    longitude: data.longitude,
    established_year: data.established_year,
    employee_count: data.employee_count,
    is_verified: data.is_verified ?? false,
    is_featured: data.is_featured ?? false,
    is_premium: data.is_premium ?? false,
    status: data.status ?? 'active',
    rating: data.rating ?? 0,
    review_count: data.review_count ?? 0,
    view_count: data.view_count ?? 0,
    created_at: timestamp,
    updated_at: timestamp,
  }

  companies.push(adminCompany)
  await writeAdminCompanies(companies)
  await syncPublicCompanies(companies)

  return adminCompany
}

export async function updateAdminCompany(id: number, updates: Partial<AdminCompany>): Promise<AdminCompany | undefined> {
  const companies = await readAdminCompanies()
  const index = companies.findIndex((company) => company.id === id)
  if (index === -1) {
    return undefined
  }

  const updated = {
    ...companies[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }
  companies[index] = updated

  await writeAdminCompanies(companies)
  await syncPublicCompanies(companies)

  return updated
}

export async function deleteAdminCompany(id: number): Promise<boolean> {
  const companies = await readAdminCompanies()
  const index = companies.findIndex((company) => company.id === id)
  if (index === -1) {
    return false
  }

  companies.splice(index, 1)
  await writeAdminCompanies(companies)
  await syncPublicCompanies(companies)
  return true
}
