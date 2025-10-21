import type { AdminCompany } from '@/lib/types/admin'
import type { BusinessHour, Company, Review, SocialLink } from '@/lib/types/company'
import { readJsonFile, writeJsonFile } from '@/lib/data/json-store'
import { dbQuery, isDatabaseEnabled } from '@/lib/data/database'

const PUBLIC_COMPANIES_FILE = 'companies.json'
const ADMIN_COMPANIES_FILE = 'admin-companies.json'
const REVIEWS_FILE = 'reviews.json'
const SOCIAL_LINKS_FILE = 'social-links.json'
const BUSINESS_HOURS_FILE = 'business-hours.json'

const useDatabase = isDatabaseEnabled()

interface CompanyRow {
  id: number
  name: string
  slug: string
  description: string | null
  category: string
  subcategory: string | null
  email: string | null
  phone: string | null
  website: string | null
  address: string | null
  city: string | null
  region: string | null
  country: string | null
  latitude: string | null
  longitude: string | null
  established_year: number | null
  employee_count: string | null
  is_verified: boolean
  is_featured: boolean
  is_premium: boolean
  status: string
  rating: string | null
  review_count: number
  view_count: number
  created_at: Date
  updated_at: Date
  logo_url: string | null
  cover_image_url: string | null
}

interface ReviewRow {
  id: number
  company_id: number
  user_name: string
  title: string | null
  comment: string | null
  rating: number
  is_verified: boolean
  created_at: Date
}

interface SocialLinkRow {
  company_id: number
  platform: string
  url: string
}

interface BusinessHourRow {
  company_id: number
  day_of_week: number
  open_time: string | null
  close_time: string | null
  is_closed: boolean
}

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
    coverImageUrl: adminCompany.cover_image_url ?? previous?.coverImageUrl ?? '/hero-companies.jpg',
    logoUrl: adminCompany.logo_url ?? previous?.logoUrl ?? '/placeholder-logo.png',
  }
}

function mapRowToAdminCompany(row: CompanyRow): AdminCompany {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? undefined,
    category: row.category,
    subcategory: row.subcategory ?? undefined,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    website: row.website ?? undefined,
    address: row.address ?? undefined,
    city: row.city ?? '',
    region: row.region ?? '',
    country: row.country ?? 'Ethiopia',
    latitude: row.latitude ? Number(row.latitude) : undefined,
    longitude: row.longitude ? Number(row.longitude) : undefined,
    established_year: row.established_year ?? undefined,
    employee_count: row.employee_count ?? undefined,
    is_verified: row.is_verified,
    is_featured: row.is_featured,
    is_premium: row.is_premium,
    status: row.status,
    rating: row.rating ? Number(row.rating) : 0,
    review_count: row.review_count,
    view_count: row.view_count,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
    logo_url: row.logo_url ?? undefined,
    cover_image_url: row.cover_image_url ?? undefined,
  }
}

function mapRowToPublicCompany(row: CompanyRow, previous?: Company): Company {
  return mapAdminToPublicCompany(mapRowToAdminCompany(row), previous)
}

async function readPublicCompaniesFromFile(): Promise<Company[]> {
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

async function readAdminCompaniesFromFile(): Promise<AdminCompany[]> {
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
  if (useDatabase) {
    return
  }

  const existing = await readPublicCompaniesFromFile()
  const existingMap = new Map(existing.map((company) => [company.id, company]))
  const publicCompanies = adminCompanies.map((adminCompany) =>
    mapAdminToPublicCompany(adminCompany, existingMap.get(adminCompany.id)),
  )
  await writePublicCompanies(publicCompanies)
}

export async function getAllCompanies(): Promise<Company[]> {
  if (useDatabase) {
    const { rows } = await dbQuery<CompanyRow>(
      `SELECT * FROM companies ORDER BY name ASC`,
    )
    return rows.map((row) => mapRowToPublicCompany(row))
  }

  return await readPublicCompaniesFromFile()
}

export async function getCompanyBySlug(slug: string): Promise<Company | undefined> {
  if (useDatabase) {
    const { rows } = await dbQuery<CompanyRow>(
      `SELECT * FROM companies WHERE slug = $1 LIMIT 1`,
      [slug],
    )
    const row = rows[0]
    return row ? mapRowToPublicCompany(row) : undefined
  }

  const companies = await readPublicCompaniesFromFile()
  return companies.find((company) => company.slug === slug)
}

export async function getFeaturedCompanies(limit = 6): Promise<Company[]> {
  if (useDatabase) {
    const { rows } = await dbQuery<CompanyRow>(
      `SELECT * FROM companies WHERE is_featured = true ORDER BY rating DESC NULLS LAST LIMIT $1`,
      [limit],
    )
    return rows.map((row) => mapRowToPublicCompany(row))
  }

  const companies = await readPublicCompaniesFromFile()
  return companies.filter((company) => company.isFeatured).slice(0, limit)
}

export async function getCompanyStats() {
  if (useDatabase) {
    const { rows } = await dbQuery<{
      total: string
      verified: string
      featured: string
      premium: string
      total_reviews: string
    }>(
      `
        SELECT
          COUNT(*) AS total,
          COUNT(*) FILTER (WHERE is_verified) AS verified,
          COUNT(*) FILTER (WHERE is_featured) AS featured,
          COUNT(*) FILTER (WHERE is_premium) AS premium,
          COALESCE(SUM(review_count), 0) AS total_reviews
        FROM companies
      `,
    )

    const stats = rows[0] ?? {
      total: '0',
      verified: '0',
      featured: '0',
      premium: '0',
      total_reviews: '0',
    }

    return {
      total: Number(stats.total),
      verified: Number(stats.verified),
      featured: Number(stats.featured),
      premium: Number(stats.premium),
      totalReviews: Number(stats.total_reviews),
    }
  }

  const companies = await readPublicCompaniesFromFile()
  const total = companies.length
  const verified = companies.filter((company) => company.isVerified).length
  const featured = companies.filter((company) => company.isFeatured).length
  const premium = companies.filter((company) => company.isPremium).length
  const totalReviews = companies.reduce((sum, company) => sum + company.reviewCount, 0)

  return { total, verified, featured, premium, totalReviews }
}

export async function getCategoryCounts() {
  if (useDatabase) {
    const { rows } = await dbQuery<{ name: string; count: string }>(
      `SELECT category AS name, COUNT(*) AS count FROM companies GROUP BY category ORDER BY category ASC`,
    )
    return rows.map((row) => ({ name: row.name, count: Number(row.count) }))
  }

  const companies = await readPublicCompaniesFromFile()
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
  const {
    search,
    location,
    categories = [],
    cities = [],
    verifiedOnly = false,
    featuredOnly = false,
    sortBy = 'relevance',
  } = params

  if (useDatabase) {
    const conditions: string[] = []
    const values: unknown[] = []

    if (search) {
      values.push(`%${search}%`)
      const idx = values.length
      conditions.push(`(name ILIKE $${idx} OR description ILIKE $${idx} OR category ILIKE $${idx} OR subcategory ILIKE $${idx})`)
    }

    if (location) {
      values.push(`%${location}%`)
      const idx = values.length
      conditions.push(`(city ILIKE $${idx} OR region ILIKE $${idx} OR address ILIKE $${idx})`)
    }

    if (categories.length > 0) {
      values.push(categories)
      conditions.push(`category = ANY($${values.length}::text[])`)
    }

    if (cities.length > 0) {
      values.push(cities)
      conditions.push(`city = ANY($${values.length}::text[])`)
    }

    if (verifiedOnly) {
      conditions.push(`is_verified = true`)
    }

    if (featuredOnly) {
      conditions.push(`is_featured = true`)
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    let orderBy = 'ORDER BY is_featured DESC, rating DESC NULLS LAST'
    switch (sortBy) {
      case 'rating':
        orderBy = 'ORDER BY rating DESC NULLS LAST'
        break
      case 'reviews':
        orderBy = 'ORDER BY review_count DESC'
        break
      case 'newest':
        orderBy = 'ORDER BY created_at DESC'
        break
      default:
        orderBy = 'ORDER BY is_featured DESC, rating DESC NULLS LAST'
    }

    const query = `SELECT * FROM companies ${where} ${orderBy}`
    const { rows } = await dbQuery<CompanyRow>(query, values)
    return rows.map((row) => mapRowToPublicCompany(row))
  }

  const companies = await readPublicCompaniesFromFile()

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
  if (useDatabase) {
    const { rows } = await dbQuery<ReviewRow>(
      `
        SELECT id, company_id, user_name, title, comment, rating, is_verified, created_at
        FROM reviews
        WHERE company_id = $1
        ORDER BY created_at DESC
      `,
      [companyId],
    )

    return rows.map((row) => ({
      id: row.id,
      companyId: row.company_id,
      userName: row.user_name,
      title: row.title ?? '',
      comment: row.comment ?? '',
      rating: row.rating,
      createdAt: row.created_at.toISOString(),
      isVerified: row.is_verified,
    }))
  }

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
  if (useDatabase) {
    const { rows } = await dbQuery<ReviewRow>(
      `SELECT id, company_id, user_name, title, comment, rating, is_verified, created_at FROM reviews ORDER BY created_at DESC`,
    )

    return rows.map((row) => ({
      id: row.id,
      companyId: row.company_id,
      userName: row.user_name,
      title: row.title ?? '',
      comment: row.comment ?? '',
      rating: row.rating,
      createdAt: row.created_at.toISOString(),
      isVerified: row.is_verified,
    }))
  }

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
  if (useDatabase) {
    const { rows } = await dbQuery<SocialLinkRow>(
      `SELECT company_id, platform, url FROM social_links WHERE company_id = $1`,
      [companyId],
    )

    return rows.map((row) => ({
      companyId: row.company_id,
      platform: row.platform as SocialLink['platform'],
      url: row.url,
    }))
  }

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
  if (useDatabase) {
    const { rows } = await dbQuery<BusinessHourRow>(
      `
        SELECT company_id, day_of_week, open_time, close_time, is_closed
        FROM business_hours
        WHERE company_id = $1
        ORDER BY day_of_week ASC
      `,
      [companyId],
    )

    return rows.map((row) => ({
      companyId: row.company_id,
      dayOfWeek: row.day_of_week,
      openTime: row.open_time ?? '',
      closeTime: row.close_time ?? '',
      isClosed: row.is_closed,
    }))
  }

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
  if (useDatabase) {
    const conditions: string[] = []
    const values: unknown[] = []

    if (search) {
      values.push(`%${search}%`)
      const idx = values.length
      conditions.push(`(name ILIKE $${idx} OR city ILIKE $${idx} OR region ILIKE $${idx})`)
    }

    if (status && status !== 'all') {
      values.push(status)
      conditions.push(`status = $${values.length}`)
    }

    if (category && category !== 'all') {
      values.push(category)
      conditions.push(`category = $${values.length}`)
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
    const query = `SELECT * FROM companies ${where} ORDER BY created_at DESC`
    const { rows } = await dbQuery<CompanyRow>(query, values)
    return rows.map((row) => mapRowToAdminCompany(row))
  }

  const companies = await readAdminCompaniesFromFile()

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
  if (useDatabase) {
    const { rows } = await dbQuery<CompanyRow>(`SELECT * FROM companies WHERE id = $1`, [id])
    const row = rows[0]
    return row ? mapRowToAdminCompany(row) : undefined
  }

  const companies = await readAdminCompaniesFromFile()
  return companies.find((company) => company.id === id)
}

export async function createAdminCompany(data: Partial<AdminCompany>): Promise<AdminCompany> {
  if (!data.name || !data.slug || !data.category) {
    throw new Error('Missing required fields')
  }

  if (useDatabase) {
    const { rows } = await dbQuery<CompanyRow>(
      `
        INSERT INTO companies (
          name, slug, description, category, subcategory, email, phone, website, address,
          city, region, country, latitude, longitude, established_year, employee_count,
          is_verified, is_featured, is_premium, status, rating, review_count, view_count,
          logo_url, cover_image_url
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9,
          $10, $11, $12, $13, $14, $15, $16,
          $17, $18, $19, $20, $21, $22, $23,
          $24, $25
        )
        RETURNING *
      `,
      [
        data.name,
        data.slug,
        data.description ?? null,
        data.category,
        data.subcategory ?? null,
        data.email ?? null,
        data.phone ?? null,
        data.website ?? null,
        data.address ?? null,
        data.city ?? null,
        data.region ?? null,
        data.country ?? 'Ethiopia',
        data.latitude ?? null,
        data.longitude ?? null,
        data.established_year ?? null,
        data.employee_count ?? null,
        data.is_verified ?? false,
        data.is_featured ?? false,
        data.is_premium ?? false,
        data.status ?? 'active',
        data.rating ?? 0,
        data.review_count ?? 0,
        data.view_count ?? 0,
        data.logo_url ?? null,
        data.cover_image_url ?? null,
      ],
    )

    const row = rows[0]
    return mapRowToAdminCompany(row)
  }

  const companies = await readAdminCompaniesFromFile()
  const nextId = companies.reduce((max, company) => Math.max(max, company.id), 0) + 1
  const timestamp = new Date().toISOString()

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
    logo_url: data.logo_url,
    cover_image_url: data.cover_image_url,
  }

  companies.push(adminCompany)
  await writeAdminCompanies(companies)
  await syncPublicCompanies(companies)

  return adminCompany
}

export async function updateAdminCompany(id: number, updates: Partial<AdminCompany>): Promise<AdminCompany | undefined> {
  if (useDatabase) {
    const fields: string[] = []
    const values: unknown[] = []

    const mapping: Array<[keyof AdminCompany, string]> = [
      ['name', 'name'],
      ['slug', 'slug'],
      ['description', 'description'],
      ['category', 'category'],
      ['subcategory', 'subcategory'],
      ['email', 'email'],
      ['phone', 'phone'],
      ['website', 'website'],
      ['address', 'address'],
      ['city', 'city'],
      ['region', 'region'],
      ['country', 'country'],
      ['latitude', 'latitude'],
      ['longitude', 'longitude'],
      ['established_year', 'established_year'],
      ['employee_count', 'employee_count'],
      ['is_verified', 'is_verified'],
      ['is_featured', 'is_featured'],
      ['is_premium', 'is_premium'],
      ['status', 'status'],
      ['rating', 'rating'],
      ['review_count', 'review_count'],
      ['view_count', 'view_count'],
      ['logo_url', 'logo_url'],
      ['cover_image_url', 'cover_image_url'],
    ]

    for (const [key, column] of mapping) {
      if (updates[key] !== undefined) {
        values.push(updates[key])
        fields.push(`${column} = $${values.length}`)
      }
    }

    if (fields.length === 0) {
      return await getAdminCompanyById(id)
    }

    values.push(id)
    const query = `
      UPDATE companies
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${values.length}
      RETURNING *
    `

    const { rows } = await dbQuery<CompanyRow>(query, values)
    const row = rows[0]
    return row ? mapRowToAdminCompany(row) : undefined
  }

  const companies = await readAdminCompaniesFromFile()
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
  if (useDatabase) {
    const { rowCount } = await dbQuery('DELETE FROM companies WHERE id = $1', [id])
    return rowCount > 0
  }

  const companies = await readAdminCompaniesFromFile()
  const index = companies.findIndex((company) => company.id === id)
  if (index === -1) {
    return false
  }

  companies.splice(index, 1)
  await writeAdminCompanies(companies)
  await syncPublicCompanies(companies)
  return true
}
