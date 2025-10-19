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
  companyId: number
  dayOfWeek: number
  openTime: string
  closeTime: string
  isClosed: boolean
}

export interface SocialLink {
  companyId: number
  platform: "facebook" | "twitter" | "linkedin" | "instagram"
  url: string
}
