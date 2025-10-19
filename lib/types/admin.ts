export interface AdminUser {
  id: number
  full_name: string
  email: string
  role: string
  status: string
  phone?: string
  location?: string
  created_at: string
  updated_at: string
}

export interface AdminCompany {
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

export interface AdminPromotion {
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
