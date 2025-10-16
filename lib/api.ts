// API service functions for admin operations

const API_BASE_URL = '/api/admin'

// Users API
export interface User {
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

export async function getUsers(search?: string, status?: string, role?: string): Promise<User[]> {
  const params = new URLSearchParams()
  if (search) params.append('search', search)
  if (status && status !== 'all') params.append('status', status)
  if (role && role !== 'all') params.append('role', role)

  const response = await fetch(`${API_BASE_URL}/users?${params}`)
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch users')
  }

  return data.data
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`)
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch user')
  }

  return data.data
}

export async function createUser(userData: Partial<User>): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to create user')
  }

  return data.data
}

export async function updateUser(id: number, userData: Partial<User>): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to update user')
  }

  return data.data
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to delete user')
  }
}

// Companies API
export interface Company {
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

export async function getCompanies(search?: string, status?: string, category?: string): Promise<Company[]> {
  const params = new URLSearchParams()
  if (search) params.append('search', search)
  if (status && status !== 'all') params.append('status', status)
  if (category && category !== 'all') params.append('category', category)

  const response = await fetch(`${API_BASE_URL}/companies?${params}`)
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch companies')
  }

  return data.data
}

export async function getCompany(id: number): Promise<Company> {
  const response = await fetch(`${API_BASE_URL}/companies/${id}`)
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch company')
  }

  return data.data
}

export async function createCompany(companyData: Partial<Company>): Promise<Company> {
  const response = await fetch(`${API_BASE_URL}/companies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(companyData),
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to create company')
  }

  return data.data
}

export async function updateCompany(id: number, companyData: Partial<Company>): Promise<Company> {
  const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(companyData),
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to update company')
  }

  return data.data
}

export async function deleteCompany(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
    method: 'DELETE',
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to delete company')
  }
}

// Promotions API
export interface Promotion {
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

export async function getPromotions(search?: string, status?: string, type?: string): Promise<Promotion[]> {
  const params = new URLSearchParams()
  if (search) params.append('search', search)
  if (status && status !== 'all') params.append('status', status)
  if (type && type !== 'all') params.append('type', type)

  const response = await fetch(`${API_BASE_URL}/promotions?${params}`)
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch promotions')
  }

  return data.data
}

export async function getPromotion(id: number): Promise<Promotion> {
  const response = await fetch(`${API_BASE_URL}/promotions/${id}`)
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch promotion')
  }

  return data.data
}

export async function createPromotion(promotionData: Partial<Promotion>): Promise<Promotion> {
  const response = await fetch(`${API_BASE_URL}/promotions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(promotionData),
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to create promotion')
  }

  return data.data
}

export async function updatePromotion(id: number, promotionData: Partial<Promotion>): Promise<Promotion> {
  const response = await fetch(`${API_BASE_URL}/promotions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(promotionData),
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to update promotion')
  }

  return data.data
}

export async function deletePromotion(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/promotions/${id}`, {
    method: 'DELETE',
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to delete promotion')
  }
}
