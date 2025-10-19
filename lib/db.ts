import { hashPassword } from './password'

type QueryResult = {
  rows: any[]
  rowCount: number
}

interface UserRecord {
  id: number
  full_name: string
  email: string
  password_hash: string
  role: string
  status: string
  phone?: string
  location?: string
  created_at: string
  updated_at: string
}

interface CompanyRecord {
  id: number
  name: string
  slug: string
  description?: string
  category: string
  subcategory?: string
  email?: string
  phone?: string
  website?: string
  address?: string
  city: string
  region: string
  country: string
  latitude?: number
  longitude?: number
  established_year?: number
  employee_count?: string
  is_verified: boolean
  is_featured: boolean
  is_premium: boolean
  status: string
  rating: number
  review_count: number
  view_count: number
  created_at: string
  updated_at: string
}

interface PromotionRecord {
  id: number
  title: string
  description?: string
  type: string
  status: string
  start_date: string
  end_date: string
  target_audience?: string
  budget: number
  spent: number
  clicks: number
  conversions: number
  is_active: boolean
  created_at: string
  updated_at: string
}

const users: UserRecord[] = [
  {
    id: 1,
    full_name: 'Helina Yared',
    email: 'helina.yared@yegnabiz.com',
    password_hash: hashPassword('demo-password-1'),
    role: 'admin',
    status: 'active',
    phone: '+251-911-010101',
    location: 'Addis Ababa, Ethiopia',
    created_at: '2024-12-12T08:30:00.000Z',
    updated_at: '2025-02-18T10:15:00.000Z',
  },
  {
    id: 2,
    full_name: 'Samuel Bekele',
    email: 'samuel.bekele@yegnabiz.com',
    password_hash: hashPassword('demo-password-2'),
    role: 'manager',
    status: 'active',
    phone: '+251-911-020202',
    location: 'Bahir Dar, Ethiopia',
    created_at: '2024-11-05T10:45:00.000Z',
    updated_at: '2025-02-10T09:05:00.000Z',
  },
  {
    id: 3,
    full_name: 'Mahi Teshome',
    email: 'mahi.teshome@yegnabiz.com',
    password_hash: hashPassword('demo-password-3'),
    role: 'editor',
    status: 'suspended',
    phone: '+251-911-030303',
    location: 'Dire Dawa, Ethiopia',
    created_at: '2024-09-25T07:15:00.000Z',
    updated_at: '2025-01-28T12:40:00.000Z',
  },
  {
    id: 4,
    full_name: 'Alazar Moges',
    email: 'alazar.moges@yegnabiz.com',
    password_hash: hashPassword('demo-password-4'),
    role: 'support',
    status: 'active',
    phone: '+251-911-040404',
    location: 'Hawassa, Ethiopia',
    created_at: '2024-08-14T12:00:00.000Z',
    updated_at: '2025-02-04T15:55:00.000Z',
  },
  {
    id: 5,
    full_name: 'Ruth Abebe',
    email: 'ruth.abebe@yegnabiz.com',
    password_hash: hashPassword('demo-password-5'),
    role: 'user',
    status: 'pending',
    phone: '+251-911-050505',
    location: 'Gondar, Ethiopia',
    created_at: '2024-07-01T09:20:00.000Z',
    updated_at: '2024-12-22T11:35:00.000Z',
  },
]

const companies: CompanyRecord[] = [
  {
    id: 1,
    name: 'Addis Tech Innovations',
    slug: 'addis-tech-innovations',
    description: 'Leading provider of enterprise software solutions for Ethiopian businesses.',
    category: 'Technology',
    subcategory: 'Software',
    email: 'info@addistech.et',
    phone: '+251-11-123-4567',
    website: 'https://addistech.et',
    address: 'Bole Road 221',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    country: 'Ethiopia',
    latitude: 8.9806,
    longitude: 38.7578,
    established_year: 2014,
    employee_count: '51-100',
    is_verified: true,
    is_featured: true,
    is_premium: true,
    status: 'active',
    rating: 4.7,
    review_count: 184,
    view_count: 12840,
    created_at: '2024-10-02T11:00:00.000Z',
    updated_at: '2025-02-16T13:45:00.000Z',
  },
  {
    id: 2,
    name: 'Lakeview Hospitality Group',
    slug: 'lakeview-hospitality-group',
    description: 'Boutique hotels and resorts across the Rift Valley lakes.',
    category: 'Hospitality',
    subcategory: 'Hotels',
    email: 'reservations@lakeview.et',
    phone: '+251-46-220-3300',
    website: 'https://lakeviewhotels.et',
    address: 'Piassa 78',
    city: 'Hawassa',
    region: 'Sidama',
    country: 'Ethiopia',
    latitude: 7.0594,
    longitude: 38.4769,
    established_year: 2010,
    employee_count: '201-500',
    is_verified: true,
    is_featured: false,
    is_premium: true,
    status: 'active',
    rating: 4.4,
    review_count: 92,
    view_count: 6820,
    created_at: '2024-09-14T14:30:00.000Z',
    updated_at: '2025-01-09T09:10:00.000Z',
  },
  {
    id: 3,
    name: 'Green Harvest Agro',
    slug: 'green-harvest-agro',
    description: 'Export-focused agribusiness specializing in organic coffee and spices.',
    category: 'Agriculture',
    subcategory: 'Exports',
    email: 'hello@greenharvest.et',
    phone: '+251-91-445-7788',
    website: 'https://greenharvest.et',
    address: 'Millennium Avenue 45',
    city: 'Jimma',
    region: 'Oromia',
    country: 'Ethiopia',
    latitude: 7.6733,
    longitude: 36.8340,
    established_year: 2018,
    employee_count: '101-200',
    is_verified: false,
    is_featured: false,
    is_premium: false,
    status: 'pending',
    rating: 4.1,
    review_count: 38,
    view_count: 2941,
    created_at: '2024-11-22T16:20:00.000Z',
    updated_at: '2025-01-21T08:05:00.000Z',
  },
  {
    id: 4,
    name: 'Skyline Logistics PLC',
    slug: 'skyline-logistics-plc',
    description: 'Integrated logistics services with nationwide coverage and customs expertise.',
    category: 'Transportation',
    subcategory: 'Logistics',
    email: 'contact@skylinelogistics.et',
    phone: '+251-11-778-9900',
    website: 'https://skylinelogistics.et',
    address: 'Ring Road 19',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    country: 'Ethiopia',
    latitude: 8.9805,
    longitude: 38.7578,
    established_year: 2012,
    employee_count: '501-1000',
    is_verified: true,
    is_featured: true,
    is_premium: false,
    status: 'active',
    rating: 4.6,
    review_count: 143,
    view_count: 11234,
    created_at: '2024-07-30T09:50:00.000Z',
    updated_at: '2025-02-12T07:22:00.000Z',
  },
  {
    id: 5,
    name: 'Blue Nile Construction',
    slug: 'blue-nile-construction',
    description: 'Civil engineering and infrastructure projects across Ethiopia.',
    category: 'Construction',
    subcategory: 'Infrastructure',
    email: 'projects@bluenileconstruction.et',
    phone: '+251-11-665-4400',
    website: 'https://bluenileconstruction.et',
    address: 'Kazanchis 101',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    country: 'Ethiopia',
    latitude: 8.9803,
    longitude: 38.7579,
    established_year: 2008,
    employee_count: '1001-5000',
    is_verified: false,
    is_featured: false,
    is_premium: false,
    status: 'suspended',
    rating: 3.8,
    review_count: 57,
    view_count: 5120,
    created_at: '2024-06-11T13:00:00.000Z',
    updated_at: '2025-01-30T12:18:00.000Z',
  },
]

const promotions: PromotionRecord[] = [
  {
    id: 1,
    title: 'Holiday Marketplace Spotlight',
    description: 'Feature Ethiopian artisan products during the Timket season.',
    type: 'featured',
    status: 'active',
    start_date: '2025-01-01',
    end_date: '2025-01-20',
    target_audience: 'Local shoppers',
    budget: 15000,
    spent: 12450,
    clicks: 18450,
    conversions: 1750,
    is_active: true,
    created_at: '2024-12-15T08:00:00.000Z',
    updated_at: '2025-01-18T06:30:00.000Z',
  },
  {
    id: 2,
    title: 'Premium Supplier Showcase',
    description: 'Highlight verified exporters to international buyers.',
    type: 'banner',
    status: 'scheduled',
    start_date: '2025-03-01',
    end_date: '2025-03-31',
    target_audience: 'Global procurement teams',
    budget: 22000,
    spent: 0,
    clicks: 0,
    conversions: 0,
    is_active: false,
    created_at: '2025-01-25T11:20:00.000Z',
    updated_at: '2025-02-05T09:10:00.000Z',
  },
  {
    id: 3,
    title: 'Logistics Partner Spotlight',
    description: 'Drive awareness for nationwide logistics partners.',
    type: 'popup',
    status: 'active',
    start_date: '2025-02-01',
    end_date: '2025-02-28',
    target_audience: 'Export-ready SMEs',
    budget: 9000,
    spent: 6425,
    clicks: 8200,
    conversions: 610,
    is_active: true,
    created_at: '2024-12-28T07:45:00.000Z',
    updated_at: '2025-02-14T14:25:00.000Z',
  },
  {
    id: 4,
    title: 'Startup Launch Booster',
    description: 'Support new Ethiopian startups with discounted placements.',
    type: 'featured',
    status: 'paused',
    start_date: '2024-11-10',
    end_date: '2025-02-10',
    target_audience: 'Early adopters',
    budget: 6000,
    spent: 4820,
    clicks: 5100,
    conversions: 380,
    is_active: false,
    created_at: '2024-10-18T12:05:00.000Z',
    updated_at: '2025-01-27T16:40:00.000Z',
  },
  {
    id: 5,
    title: 'Regional Expansion Week',
    description: 'Campaign promoting expansion opportunities in emerging cities.',
    type: 'banner',
    status: 'completed',
    start_date: '2024-08-05',
    end_date: '2024-08-19',
    target_audience: 'Regional investors',
    budget: 7500,
    spent: 7500,
    clicks: 6400,
    conversions: 520,
    is_active: false,
    created_at: '2024-07-12T09:30:00.000Z',
    updated_at: '2024-08-20T08:55:00.000Z',
  },
]

let userIdCounter = users.length
let companyIdCounter = companies.length
let promotionIdCounter = promotions.length

function normalizeQuery(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

function sanitizeUser(user: UserRecord) {
  const { password_hash, ...rest } = user
  return rest
}

function cloneRow<T>(row: T): T {
  return JSON.parse(JSON.stringify(row))
}

function handleSelectUsers(normalized: string, params: any[]): QueryResult {
  let index = 0
  let searchTerm: string | undefined
  let statusFilter: string | undefined
  let roleFilter: string | undefined

  if (normalized.includes('ILIKE')) {
    const raw = params[index++] ?? ''
    searchTerm = typeof raw === 'string' ? raw.replace(/%/g, '').toLowerCase() : undefined
  }

  if (normalized.includes('status =')) {
    statusFilter = params[index++]
  }

  if (normalized.includes('role =')) {
    roleFilter = params[index++]
  }

  let result = users.slice()

  if (searchTerm) {
    const term = searchTerm
    result = result.filter((user) => {
      const lower = term.toLowerCase()
      return (
        user.full_name.toLowerCase().includes(lower) ||
        user.email.toLowerCase().includes(lower)
      )
    })
  }

  if (statusFilter) {
    result = result.filter((user) => user.status === statusFilter)
  }

  if (roleFilter) {
    result = result.filter((user) => user.role === roleFilter)
  }

  result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const rows = result.map((user) => sanitizeUser(user))
  return { rows, rowCount: rows.length }
}

function handleInsertUser(params: any[]): QueryResult {
  const [full_name, email, password_hash, role, phone, location] = params
  const now = new Date().toISOString()
  const newUser: UserRecord = {
    id: ++userIdCounter,
    full_name,
    email,
    password_hash,
    role,
    status: 'active',
    phone,
    location,
    created_at: now,
    updated_at: now,
  }
  users.push(newUser)

  const row = {
    id: newUser.id,
    full_name: newUser.full_name,
    email: newUser.email,
    role: newUser.role,
    status: newUser.status,
    created_at: newUser.created_at,
  }

  return { rows: [row], rowCount: 1 }
}

function handleSelectUserById(id: number): QueryResult {
  const user = users.find((record) => record.id === id)
  if (!user) {
    return { rows: [], rowCount: 0 }
  }
  return { rows: [sanitizeUser(user)], rowCount: 1 }
}

function handleUpdateUser(params: any[]): QueryResult {
  const [full_name, email, role, status, phone, location, id] = params
  const numericId = Number(id)
  const user = users.find((record) => record.id === numericId)
  if (!user) {
    return { rows: [], rowCount: 0 }
  }

  user.full_name = full_name ?? user.full_name
  user.email = email ?? user.email
  user.role = role ?? user.role
  user.status = status ?? user.status
  user.phone = phone
  user.location = location
  user.updated_at = new Date().toISOString()

  const row = sanitizeUser(user)
  return { rows: [row], rowCount: 1 }
}

function handleDeleteUser(id: number): QueryResult {
  const index = users.findIndex((record) => record.id === id)
  if (index === -1) {
    return { rows: [], rowCount: 0 }
  }

  users.splice(index, 1)
  return { rows: [], rowCount: 1 }
}

function handleSelectCompanies(normalized: string, params: any[]): QueryResult {
  let index = 0
  let searchTerm: string | undefined
  let statusFilter: string | undefined
  let categoryFilter: string | undefined

  if (normalized.includes('name ILIKE')) {
    const raw = params[index++] ?? ''
    searchTerm = typeof raw === 'string' ? raw.replace(/%/g, '').toLowerCase() : undefined
  }

  if (normalized.includes('status =')) {
    statusFilter = params[index++]
  }

  if (normalized.includes('category =')) {
    categoryFilter = params[index++]
  }

  let result = companies.slice()

  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    result = result.filter((company) => {
      return (
        company.name.toLowerCase().includes(term) ||
        company.city.toLowerCase().includes(term)
      )
    })
  }

  if (statusFilter) {
    result = result.filter((company) => company.status === statusFilter)
  }

  if (categoryFilter) {
    result = result.filter((company) => company.category === categoryFilter)
  }

  result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return { rows: result.map((company) => cloneRow(company)), rowCount: result.length }
}

function handleInsertCompany(params: any[]): QueryResult {
  const [
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
  ] = params

  const now = new Date().toISOString()
  const newCompany: CompanyRecord = {
    id: ++companyIdCounter,
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
    is_verified: Boolean(is_verified),
    is_featured: Boolean(is_featured),
    is_premium: Boolean(is_premium),
    status: (status as string) || 'active',
    rating: 0,
    review_count: 0,
    view_count: 0,
    created_at: now,
    updated_at: now,
  }

  companies.push(newCompany)

  return { rows: [cloneRow(newCompany)], rowCount: 1 }
}

function handleSelectCompanyById(id: number): QueryResult {
  const company = companies.find((record) => record.id === id)
  if (!company) {
    return { rows: [], rowCount: 0 }
  }
  return { rows: [cloneRow(company)], rowCount: 1 }
}

function handleUpdateCompany(params: any[]): QueryResult {
  const [
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
    id,
  ] = params

  const numericId = Number(id)
  const company = companies.find((record) => record.id === numericId)
  if (!company) {
    return { rows: [], rowCount: 0 }
  }

  company.name = name ?? company.name
  company.slug = slug ?? company.slug
  company.description = description
  company.category = category ?? company.category
  company.subcategory = subcategory
  company.email = email
  company.phone = phone
  company.website = website
  company.address = address
  company.city = city ?? company.city
  company.region = region ?? company.region
  company.country = country ?? company.country
  company.latitude = latitude
  company.longitude = longitude
  company.established_year = established_year
  company.employee_count = employee_count
  company.is_verified = Boolean(is_verified)
  company.is_featured = Boolean(is_featured)
  company.is_premium = Boolean(is_premium)
  company.status = status ?? company.status
  company.updated_at = new Date().toISOString()

  return { rows: [cloneRow(company)], rowCount: 1 }
}

function handleDeleteCompany(id: number): QueryResult {
  const index = companies.findIndex((record) => record.id === id)
  if (index === -1) {
    return { rows: [], rowCount: 0 }
  }
  companies.splice(index, 1)
  return { rows: [], rowCount: 1 }
}

function handleSelectPromotions(normalized: string, params: any[]): QueryResult {
  let index = 0
  let searchTerm: string | undefined
  let statusFilter: string | undefined
  let typeFilter: string | undefined

  if (normalized.includes('title ILIKE')) {
    const raw = params[index++] ?? ''
    searchTerm = typeof raw === 'string' ? raw.replace(/%/g, '').toLowerCase() : undefined
  }

  if (normalized.includes('status =')) {
    statusFilter = params[index++]
  }

  if (normalized.includes('type =')) {
    typeFilter = params[index++]
  }

  let result = promotions.slice()

  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    result = result.filter((promo) => {
      const titleMatch = promo.title.toLowerCase().includes(term)
      const descriptionMatch = promo.description?.toLowerCase().includes(term) ?? false
      return titleMatch || descriptionMatch
    })
  }

  if (statusFilter) {
    result = result.filter((promo) => promo.status === statusFilter)
  }

  if (typeFilter) {
    result = result.filter((promo) => promo.type === typeFilter)
  }

  result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return { rows: result.map((promo) => cloneRow(promo)), rowCount: result.length }
}

function handleInsertPromotion(params: any[]): QueryResult {
  const [
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
  ] = params

  const now = new Date().toISOString()
  const newPromotion: PromotionRecord = {
    id: ++promotionIdCounter,
    title,
    description,
    type,
    status: (status as string) || 'active',
    start_date,
    end_date,
    target_audience,
    budget: Number(budget) || 0,
    spent: Number(spent) || 0,
    clicks: Number(clicks) || 0,
    conversions: Number(conversions) || 0,
    is_active: Boolean(is_active),
    created_at: now,
    updated_at: now,
  }

  promotions.push(newPromotion)
  return { rows: [cloneRow(newPromotion)], rowCount: 1 }
}

function handleSelectPromotionById(id: number): QueryResult {
  const promo = promotions.find((record) => record.id === id)
  if (!promo) {
    return { rows: [], rowCount: 0 }
  }
  return { rows: [cloneRow(promo)], rowCount: 1 }
}

function handleUpdatePromotion(params: any[]): QueryResult {
  const [
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
    id,
  ] = params

  const numericId = Number(id)
  const promo = promotions.find((record) => record.id === numericId)
  if (!promo) {
    return { rows: [], rowCount: 0 }
  }

  promo.title = title ?? promo.title
  promo.description = description
  promo.type = type ?? promo.type
  promo.status = status ?? promo.status
  promo.start_date = start_date ?? promo.start_date
  promo.end_date = end_date ?? promo.end_date
  promo.target_audience = target_audience
  promo.budget = Number(budget ?? promo.budget)
  promo.spent = Number(spent ?? promo.spent)
  promo.clicks = Number(clicks ?? promo.clicks)
  promo.conversions = Number(conversions ?? promo.conversions)
  promo.is_active = Boolean(is_active)
  promo.updated_at = new Date().toISOString()

  return { rows: [cloneRow(promo)], rowCount: 1 }
}

function handleDeletePromotion(id: number): QueryResult {
  const index = promotions.findIndex((record) => record.id === id)
  if (index === -1) {
    return { rows: [], rowCount: 0 }
  }

  promotions.splice(index, 1)
  return { rows: [], rowCount: 1 }
}

export async function query(text: string, params: any[] = []): Promise<QueryResult> {
  const normalized = normalizeQuery(text)

  if (normalized.startsWith('SELECT') && normalized.includes('FROM users WHERE 1=1')) {
    return handleSelectUsers(normalized, params)
  }

  if (normalized.startsWith('SELECT') && normalized.includes('FROM users WHERE id = $1')) {
    const id = Number(params[0])
    return handleSelectUserById(id)
  }

  if (normalized === 'SELECT id FROM users WHERE id = $1') {
    const id = Number(params[0])
    const exists = users.some((user) => user.id === id)
    return exists ? { rows: [{ id }], rowCount: 1 } : { rows: [], rowCount: 0 }
  }

  if (normalized.startsWith('INSERT INTO users')) {
    return handleInsertUser(params)
  }

  if (normalized.startsWith('UPDATE users SET')) {
    return handleUpdateUser(params)
  }

  if (normalized.startsWith('DELETE FROM users WHERE id = $1')) {
    const id = Number(params[0])
    return handleDeleteUser(id)
  }

  if (normalized.startsWith('SELECT') && normalized.includes('FROM companies WHERE 1=1')) {
    return handleSelectCompanies(normalized, params)
  }

  if (normalized.startsWith('SELECT') && normalized.includes('FROM companies WHERE id = $1')) {
    const id = Number(params[0])
    return handleSelectCompanyById(id)
  }

  if (normalized === 'SELECT id FROM companies WHERE id = $1') {
    const id = Number(params[0])
    const exists = companies.some((company) => company.id === id)
    return exists ? { rows: [{ id }], rowCount: 1 } : { rows: [], rowCount: 0 }
  }

  if (normalized.startsWith('INSERT INTO companies')) {
    return handleInsertCompany(params)
  }

  if (normalized.startsWith('UPDATE companies SET')) {
    return handleUpdateCompany(params)
  }

  if (normalized.startsWith('DELETE FROM companies WHERE id = $1')) {
    const id = Number(params[0])
    return handleDeleteCompany(id)
  }

  if (normalized.startsWith('SELECT') && normalized.includes('FROM promotions WHERE 1=1')) {
    return handleSelectPromotions(normalized, params)
  }

  if (normalized.startsWith('SELECT') && normalized.includes('FROM promotions WHERE id = $1')) {
    const id = Number(params[0])
    return handleSelectPromotionById(id)
  }

  if (normalized === 'SELECT id FROM promotions WHERE id = $1') {
    const id = Number(params[0])
    const exists = promotions.some((promo) => promo.id === id)
    return exists ? { rows: [{ id }], rowCount: 1 } : { rows: [], rowCount: 0 }
  }

  if (normalized.startsWith('INSERT INTO promotions')) {
    return handleInsertPromotion(params)
  }

  if (normalized.startsWith('UPDATE promotions SET')) {
    return handleUpdatePromotion(params)
  }

  if (normalized.startsWith('DELETE FROM promotions WHERE id = $1')) {
    const id = Number(params[0])
    return handleDeletePromotion(id)
  }

  throw new Error(`Unsupported query: ${normalized}`)
}
