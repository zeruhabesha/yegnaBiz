import type { AdminCompany, AdminPromotion, AdminUser } from "@/lib/types/admin"

export interface Company {
  id: number
  name: string
  slug: string
  description: string
  category: string
  subcategory?: string
  city?: string
  region?: string
  country?: string
  address?: string
  email?: string
  phone?: string
  website?: string
  coverImageUrl?: string
  logoUrl?: string
  rating: number
  reviewCount: number
  viewCount: number
  isVerified: boolean
  isFeatured: boolean
  isPremium: boolean
  establishedYear?: number
  employeeCount?: string
  status: "active" | "pending" | "suspended" | "rejected"
  latitude?: number
  longitude?: number
}

export interface Review {
  id: number
  companyId: number
  userName: string
  title: string
  comment: string
  rating: number
  createdAt: string
  isVerified: boolean
}

export interface BusinessHour {
  dayOfWeek: number
  openTime: string
  closeTime: string
  isClosed: boolean
}

export interface SocialLink {
  platform: "facebook" | "twitter" | "linkedin" | "instagram"
  url: string
}

type StoredAdminUser = AdminUser & { password_hash: string }

const INITIAL_TIMESTAMP = "2024-01-10T08:00:00.000Z"

const baseCompanies: Company[] = [
  {
    id: 1,
    name: "Ethio Tech Solutions",
    slug: "ethio-tech-solutions",
    description: "Full-service technology consultancy delivering software, cloud, and analytics solutions for Ethiopian enterprises.",
    category: "Technology",
    subcategory: "Software",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    address: "Bole Road",
    email: "info@ethiotech.com",
    phone: "+251 911 234 567",
    website: "https://ethiotech.com",
    coverImageUrl: "/hero-companies.jpg",
    logoUrl: "/placeholder-logo.png",
    rating: 4.8,
    reviewCount: 128,
    viewCount: 5400,
    isVerified: true,
    isFeatured: true,
    isPremium: true,
    establishedYear: 2015,
    employeeCount: "50-100",
    status: "active",
    latitude: 9.0108,
    longitude: 38.7613,
  },
  {
    id: 2,
    name: "Nile Logistics",
    slug: "nile-logistics",
    description: "Integrated logistics partner specializing in nationwide distribution and cold-chain management.",
    category: "Transportation",
    subcategory: "Logistics",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    address: "Meskel Flower",
    email: "support@nilelogistics.com",
    phone: "+251 912 345 678",
    website: "https://nilelogistics.com",
    coverImageUrl: "/hero-about.jpg",
    logoUrl: "/placeholder-logo.png",
    rating: 4.4,
    reviewCount: 94,
    viewCount: 3200,
    isVerified: true,
    isFeatured: false,
    isPremium: false,
    establishedYear: 2010,
    employeeCount: "200-500",
    status: "active",
    latitude: 9.0054,
    longitude: 38.7636,
  },
  {
    id: 3,
    name: "Awash Foods",
    slug: "awash-foods",
    description: "Premium Ethiopian packaged foods and corporate catering services with nationwide delivery.",
    category: "Food & Beverage",
    subcategory: "Manufacturing",
    city: "Addis Ababa",
    region: "Oromia",
    country: "Ethiopia",
    address: "CMC Road",
    email: "orders@awashfoods.com",
    phone: "+251 913 456 789",
    website: "https://awashfoods.com",
    coverImageUrl: "/hero-home.jpg",
    logoUrl: "/placeholder-logo.png",
    rating: 4.1,
    reviewCount: 56,
    viewCount: 1875,
    isVerified: false,
    isFeatured: true,
    isPremium: false,
    establishedYear: 2012,
    employeeCount: "100-200",
    status: "pending",
    latitude: 9.0401,
    longitude: 38.8076,
  },
  {
    id: 4,
    name: "Horizon Construction",
    slug: "horizon-construction",
    description: "Residential and commercial construction specialists delivering infrastructure projects across Ethiopia.",
    category: "Construction",
    subcategory: "Engineering",
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    address: "Piassa",
    email: "info@horizonconstruction.com",
    phone: "+251 914 567 890",
    website: "https://horizonconstruction.com",
    coverImageUrl: "/hero-promote.jpg",
    logoUrl: "/placeholder-logo.png",
    rating: 3.6,
    reviewCount: 32,
    viewCount: 980,
    isVerified: false,
    isFeatured: false,
    isPremium: false,
    establishedYear: 2005,
    employeeCount: "500+",
    status: "suspended",
    latitude: 9.0312,
    longitude: 38.7543,
  },
]

export const mockCompanies: Company[] = baseCompanies.map((company) => ({ ...company }))

const allowedStatuses: Company["status"][] = ["active", "pending", "suspended", "rejected"]

const normalizeStatus = (status?: string): Company["status"] =>
  allowedStatuses.includes(status as Company["status"]) ? (status as Company["status"]) : "active"

export const mockReviews: Review[] = [
  {
    id: 1,
    companyId: 1,
    userName: "Marta Abebe",
    title: "Exceptional delivery",
    comment: "Their engineering team delivered our digital platform ahead of schedule with outstanding quality.",
    rating: 5,
    createdAt: "2024-07-12T09:30:00.000Z",
    isVerified: true,
  },
  {
    id: 2,
    companyId: 1,
    userName: "Henok Getnet",
    title: "Reliable support",
    comment: "Great communication and reliable after-care support throughout the project.",
    rating: 4,
    createdAt: "2024-06-04T11:20:00.000Z",
    isVerified: true,
  },
  {
    id: 3,
    companyId: 2,
    userName: "Lensa Mengistu",
    title: "Trusted logistics partner",
    comment: "We depend on Nile Logistics for refrigerated distribution and they consistently deliver on time.",
    rating: 5,
    createdAt: "2024-05-18T08:15:00.000Z",
    isVerified: false,
  },
  {
    id: 4,
    companyId: 3,
    userName: "Samuel Teshome",
    title: "Quality food products",
    comment: "Our hotel chain sources packaged meals from Awash Foods and the quality has been excellent.",
    rating: 4,
    createdAt: "2024-04-27T15:45:00.000Z",
    isVerified: true,
  },
]

export const mockSocialLinks: Record<number, SocialLink[]> = {
  1: [
    { platform: "facebook", url: "https://facebook.com/ethiotech" },
    { platform: "linkedin", url: "https://linkedin.com/company/ethiotech" },
    { platform: "twitter", url: "https://twitter.com/ethiotech" },
  ],
  2: [
    { platform: "facebook", url: "https://facebook.com/nilelogistics" },
    { platform: "instagram", url: "https://instagram.com/nilelogistics" },
  ],
  3: [
    { platform: "facebook", url: "https://facebook.com/awashfoods" },
    { platform: "instagram", url: "https://instagram.com/awashfoods" },
  ],
}

export const mockBusinessHours: Record<number, BusinessHour[]> = {
  1: [
    { dayOfWeek: 0, openTime: "09:00", closeTime: "18:00", isClosed: false },
    { dayOfWeek: 1, openTime: "09:00", closeTime: "18:00", isClosed: false },
    { dayOfWeek: 2, openTime: "09:00", closeTime: "18:00", isClosed: false },
    { dayOfWeek: 3, openTime: "09:00", closeTime: "18:00", isClosed: false },
    { dayOfWeek: 4, openTime: "09:00", closeTime: "17:00", isClosed: false },
    { dayOfWeek: 5, openTime: "10:00", closeTime: "14:00", isClosed: false },
    { dayOfWeek: 6, openTime: "00:00", closeTime: "00:00", isClosed: true },
  ],
  2: [
    { dayOfWeek: 0, openTime: "08:00", closeTime: "20:00", isClosed: false },
    { dayOfWeek: 1, openTime: "08:00", closeTime: "20:00", isClosed: false },
    { dayOfWeek: 2, openTime: "08:00", closeTime: "20:00", isClosed: false },
    { dayOfWeek: 3, openTime: "08:00", closeTime: "20:00", isClosed: false },
    { dayOfWeek: 4, openTime: "08:00", closeTime: "20:00", isClosed: false },
    { dayOfWeek: 5, openTime: "09:00", closeTime: "14:00", isClosed: false },
    { dayOfWeek: 6, openTime: "00:00", closeTime: "00:00", isClosed: true },
  ],
}

export const categories = Array.from(new Set(mockCompanies.map((company) => company.category))).sort()

const adminUsers: StoredAdminUser[] = [
  {
    id: 1,
    full_name: "Sara Bekele",
    email: "sara.bekele@yegnabiz.com",
    role: "admin",
    status: "active",
    phone: "+251 911 111 111",
    location: "Addis Ababa, Ethiopia",
    created_at: INITIAL_TIMESTAMP,
    updated_at: INITIAL_TIMESTAMP,
    password_hash: hashPassword("Admin#123"),
  },
  {
    id: 2,
    full_name: "Lulit Worku",
    email: "lulit.worku@yegnabiz.com",
    role: "moderator",
    status: "active",
    phone: "+251 922 222 222",
    location: "Adama, Ethiopia",
    created_at: INITIAL_TIMESTAMP,
    updated_at: INITIAL_TIMESTAMP,
    password_hash: hashPassword("Moderator#456"),
  },
  {
    id: 3,
    full_name: "Yonatan Alemu",
    email: "yonatan.alemu@yegnabiz.com",
    role: "user",
    status: "suspended",
    phone: "+251 933 333 333",
    location: "Bahir Dar, Ethiopia",
    created_at: INITIAL_TIMESTAMP,
    updated_at: INITIAL_TIMESTAMP,
    password_hash: hashPassword("User#789"),
  },
]

const adminCompanies: AdminCompany[] = mockCompanies.map((company) => ({
  id: company.id,
  name: company.name,
  slug: company.slug,
  description: company.description,
  category: company.category,
  subcategory: company.subcategory,
  email: company.email,
  phone: company.phone,
  website: company.website,
  address: company.address,
  city: company.city ?? "",
  region: company.region ?? "",
  country: company.country ?? "Ethiopia",
  latitude: company.latitude,
  longitude: company.longitude,
  established_year: company.establishedYear,
  employee_count: company.employeeCount,
  is_verified: company.isVerified,
  is_featured: company.isFeatured,
  is_premium: company.isPremium,
  status: company.status,
  rating: company.rating,
  review_count: company.reviewCount,
  view_count: company.viewCount,
  created_at: INITIAL_TIMESTAMP,
  updated_at: INITIAL_TIMESTAMP,
}))

const adminPromotions: AdminPromotion[] = [
  {
    id: 1,
    title: "Ethiopian New Year Deals",
    description: "Promote holiday offers for local merchants during Enkutatash.",
    type: "banner",
    status: "active",
    start_date: "2024-08-25",
    end_date: "2024-09-12",
    target_audience: "all_users",
    budget: 5000,
    spent: 3200,
    clicks: 12500,
    conversions: 3200,
    is_active: true,
    created_at: INITIAL_TIMESTAMP,
    updated_at: INITIAL_TIMESTAMP,
  },
  {
    id: 2,
    title: "Premium Vendor Spotlight",
    description: "Highlight top-performing premium vendors in Addis Ababa.",
    type: "featured",
    status: "scheduled",
    start_date: "2024-10-01",
    end_date: "2024-10-14",
    target_audience: "premium_users",
    budget: 3000,
    spent: 0,
    clicks: 0,
    conversions: 0,
    is_active: false,
    created_at: INITIAL_TIMESTAMP,
    updated_at: INITIAL_TIMESTAMP,
  },
  {
    id: 3,
    title: "Logistics Partner Signup Drive",
    description: "Encourage logistics companies to join the YegnaBiz marketplace.",
    type: "popup",
    status: "paused",
    start_date: "2024-07-10",
    end_date: "2024-09-30",
    target_audience: "all_users",
    budget: 4500,
    spent: 1500,
    clicks: 5400,
    conversions: 1100,
    is_active: false,
    created_at: INITIAL_TIMESTAMP,
    updated_at: INITIAL_TIMESTAMP,
  },
]

let nextUserId = adminUsers.length + 1
let nextCompanyId = adminCompanies.length + 1
let nextPromotionId = adminPromotions.length + 1

function hashPassword(password: string) {
  const salt = Math.random().toString(36).slice(2, 10)
  let hash = 0
  for (const char of password + salt) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  }
  return `${salt}:${hash.toString(16)}`
}

function updateTimestamp<T extends { updated_at: string }>(record: T) {
  record.updated_at = new Date().toISOString()
  return record
}

function syncCompanyToPublicData(adminCompany: AdminCompany) {
  const existing = mockCompanies.find((company) => company.id === adminCompany.id)
  const mapped: Partial<Company> = {
    name: adminCompany.name,
    slug: adminCompany.slug,
    description: adminCompany.description ?? "",
    category: adminCompany.category,
    subcategory: adminCompany.subcategory ?? undefined,
    email: adminCompany.email ?? undefined,
    phone: adminCompany.phone ?? undefined,
    website: adminCompany.website ?? undefined,
    address: adminCompany.address ?? undefined,
    city: adminCompany.city || undefined,
    region: adminCompany.region || undefined,
    country: adminCompany.country || undefined,
    rating: adminCompany.rating,
    reviewCount: adminCompany.review_count,
    viewCount: adminCompany.view_count,
    isVerified: adminCompany.is_verified,
    isFeatured: adminCompany.is_featured,
    isPremium: adminCompany.is_premium,
    establishedYear: adminCompany.established_year,
    employeeCount: adminCompany.employee_count,
    status: normalizeStatus(adminCompany.status),
    latitude: adminCompany.latitude,
    longitude: adminCompany.longitude,
  }

  if (existing) {
    Object.assign(existing, mapped)
  } else {
    mockCompanies.push({
      id: adminCompany.id,
      name: adminCompany.name,
      slug: adminCompany.slug,
      description: adminCompany.description ?? "",
      category: adminCompany.category,
      subcategory: adminCompany.subcategory ?? undefined,
      email: adminCompany.email ?? undefined,
      phone: adminCompany.phone ?? undefined,
      website: adminCompany.website ?? undefined,
      address: adminCompany.address ?? undefined,
      city: adminCompany.city || undefined,
      region: adminCompany.region || undefined,
      country: adminCompany.country || undefined,
      rating: adminCompany.rating,
      reviewCount: adminCompany.review_count,
      viewCount: adminCompany.view_count,
      isVerified: adminCompany.is_verified,
      isFeatured: adminCompany.is_featured,
      isPremium: adminCompany.is_premium,
      establishedYear: adminCompany.established_year,
      employeeCount: adminCompany.employee_count,
      status: normalizeStatus(adminCompany.status),
      latitude: adminCompany.latitude,
      longitude: adminCompany.longitude,
      coverImageUrl: "/hero-companies.jpg",
      logoUrl: "/placeholder-logo.png",
    })
  }
}

export function listUsers({ search, status, role }: { search?: string; status?: string; role?: string }) {
  return adminUsers
    .filter((user) => {
      const matchesSearch = search
        ? user.full_name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        : true
      const matchesStatus = status && status !== "all" ? user.status === status : true
      const matchesRole = role && role !== "all" ? user.role === role : true
      return matchesSearch && matchesStatus && matchesRole
    })
    .map(stripPassword)
}

export function getUserById(id: number) {
  const user = adminUsers.find((u) => u.id === id)
  return user ? stripPassword(user) : undefined
}

export function createUser({ full_name, email, password, role = "user", phone, location }: { full_name?: string; email?: string; password?: string; role?: string; phone?: string; location?: string }) {
  if (!full_name || !email || !password) {
    throw new Error("Missing required fields")
  }

  const timestamp = new Date().toISOString()
  const newUser: StoredAdminUser = {
    id: nextUserId++,
    full_name,
    email,
    role,
    status: "active",
    phone,
    location,
    created_at: timestamp,
    updated_at: timestamp,
    password_hash: hashPassword(password),
  }

  adminUsers.push(newUser)
  return stripPassword(newUser)
}

export function updateUserById(id: number, updates: Partial<AdminUser>) {
  const user = adminUsers.find((u) => u.id === id)
  if (!user) return undefined

  Object.assign(user, updates)
  updateTimestamp(user)
  return stripPassword(user)
}

export function deleteUserById(id: number) {
  const index = adminUsers.findIndex((u) => u.id === id)
  if (index === -1) return false
  adminUsers.splice(index, 1)
  return true
}

export function listCompanies({ search, status, category }: { search?: string; status?: string; category?: string }) {
  return adminCompanies.filter((company) => {
    const matchesSearch = search
      ? company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.city?.toLowerCase().includes(search.toLowerCase())
      : true
    const matchesStatus = status && status !== "all" ? company.status === status : true
    const matchesCategory = category && category !== "all" ? company.category === category : true
    return matchesSearch && matchesStatus && matchesCategory
  })
}

export function getCompanyById(id: number) {
  return adminCompanies.find((company) => company.id === id)
}

export function createCompanyRecord(data: Partial<AdminCompany>) {
  if (!data.name || !data.slug || !data.category) {
    throw new Error("Missing required fields")
  }

  const timestamp = new Date().toISOString()
  const adminCompany: AdminCompany = {
    id: nextCompanyId++,
    name: data.name,
    slug: data.slug,
    description: data.description ?? "",
    category: data.category,
    subcategory: data.subcategory,
    email: data.email,
    phone: data.phone,
    website: data.website,
    address: data.address,
    city: data.city ?? "",
    region: data.region ?? "",
    country: data.country ?? "Ethiopia",
    latitude: data.latitude,
    longitude: data.longitude,
    established_year: data.established_year,
    employee_count: data.employee_count,
    is_verified: data.is_verified ?? false,
    is_featured: data.is_featured ?? false,
    is_premium: data.is_premium ?? false,
    status: data.status ?? "active",
    rating: data.rating ?? 0,
    review_count: data.review_count ?? 0,
    view_count: data.view_count ?? 0,
    created_at: timestamp,
    updated_at: timestamp,
  }

  adminCompanies.push(adminCompany)
  syncCompanyToPublicData(adminCompany)
  return adminCompany
}

export function updateCompanyById(id: number, updates: Partial<AdminCompany>) {
  const company = adminCompanies.find((c) => c.id === id)
  if (!company) return undefined

  Object.assign(company, updates)
  updateTimestamp(company)
  syncCompanyToPublicData(company)
  return company
}

export function deleteCompanyById(id: number) {
  const index = adminCompanies.findIndex((c) => c.id === id)
  if (index === -1) return false
  adminCompanies.splice(index, 1)

  const publicIndex = mockCompanies.findIndex((company) => company.id === id)
  if (publicIndex !== -1) {
    mockCompanies.splice(publicIndex, 1)
  }
  return true
}

export function listPromotions({ search, status, type }: { search?: string; status?: string; type?: string }) {
  return adminPromotions.filter((promo) => {
    const matchesSearch = search
      ? promo.title.toLowerCase().includes(search.toLowerCase()) ||
        (promo.description ?? "").toLowerCase().includes(search.toLowerCase())
      : true
    const matchesStatus = status && status !== "all" ? promo.status === status : true
    const matchesType = type && type !== "all" ? promo.type === type : true
    return matchesSearch && matchesStatus && matchesType
  })
}

export function getPromotionById(id: number) {
  return adminPromotions.find((promo) => promo.id === id)
}

export function createPromotionRecord(data: Partial<AdminPromotion>) {
  if (!data.title || !data.type || !data.start_date || !data.end_date) {
    throw new Error("Missing required fields")
  }

  const timestamp = new Date().toISOString()
  const promotion: AdminPromotion = {
    id: nextPromotionId++,
    title: data.title,
    description: data.description ?? "",
    type: data.type,
    status: data.status ?? "active",
    start_date: data.start_date,
    end_date: data.end_date,
    target_audience: data.target_audience,
    budget: data.budget ?? 0,
    spent: data.spent ?? 0,
    clicks: data.clicks ?? 0,
    conversions: data.conversions ?? 0,
    is_active: data.is_active ?? true,
    created_at: timestamp,
    updated_at: timestamp,
  }

  adminPromotions.push(promotion)
  return promotion
}

export function updatePromotionById(id: number, updates: Partial<AdminPromotion>) {
  const promotion = adminPromotions.find((promo) => promo.id === id)
  if (!promotion) return undefined

  Object.assign(promotion, updates)
  updateTimestamp(promotion)
  return promotion
}

export function deletePromotionById(id: number) {
  const index = adminPromotions.findIndex((promo) => promo.id === id)
  if (index === -1) return false
  adminPromotions.splice(index, 1)
  return true
}

function stripPassword(user: StoredAdminUser): AdminUser {
  const { password_hash, ...rest } = user
  return { ...rest }
}

