// API service functions for admin operations

import type { AdminCompany, AdminPromotion, AdminUser } from "@/lib/types/admin"

export type { AdminCompany, AdminPromotion, AdminUser } from "@/lib/types/admin"

const API_BASE_URL = '/api/admin'

function getAuthHeaders(isJson = true): Record<string, string> {
  const headers: Record<string, string> = {}
  if (isJson) headers['Content-Type'] = 'application/json'
  try {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      if (token) headers['Authorization'] = `Bearer ${token}`
    }
  } catch (e) {
    // ignore (e.g., server-side)
  }
  return headers
}

export async function getUsers(search?: string, status?: string, role?: string): Promise<AdminUser[]> {
  const params = new URLSearchParams()
  if (search) params.append('search', search)
  if (status && status !== 'all') params.append('status', status)
  if (role && role !== 'all') params.append('role', role)

  const response = await fetch(`${API_BASE_URL}/users?${params}`, { headers: getAuthHeaders(false) })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch users')
  }

  return data.data
}

export async function getUser(id: number): Promise<AdminUser> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, { headers: getAuthHeaders(false) })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch user')
  }

  return data.data
}

export async function createUser(userData: Partial<AdminUser>): Promise<AdminUser> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(userData),
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to create user')
  }

  return data.data
}

export async function updateUser(id: number, userData: Partial<AdminUser>): Promise<AdminUser> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
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
    headers: getAuthHeaders(false),
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to delete user')
  }
}

// Companies API
export async function getCompanies(search?: string, status?: string, category?: string): Promise<AdminCompany[]> {
  const params = new URLSearchParams()
  if (search) params.append('search', search)
  if (status && status !== 'all') params.append('status', status)
  if (category && category !== 'all') params.append('category', category)

  const response = await fetch(`${API_BASE_URL}/companies?${params}`, { headers: getAuthHeaders(false) })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch companies')
  }

  return data.data
}

export async function getCompany(id: number): Promise<AdminCompany> {
  const response = await fetch(`${API_BASE_URL}/companies/${id}`, { headers: getAuthHeaders(false) })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch company')
  }

  return data.data
}

export async function createCompany(companyData: Partial<AdminCompany>): Promise<AdminCompany> {
  const response = await fetch(`${API_BASE_URL}/companies`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(companyData),
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to create company')
  }

  return data.data
}

export async function updateCompany(id: number, companyData: Partial<AdminCompany>): Promise<AdminCompany> {
  const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
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
    headers: getAuthHeaders(false),
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to delete company')
  }
}

// Promotions API
export async function getPromotions(search?: string, status?: string, type?: string): Promise<AdminPromotion[]> {
  const params = new URLSearchParams()
  if (search) params.append('search', search)
  if (status && status !== 'all') params.append('status', status)
  if (type && type !== 'all') params.append('type', type)

  const response = await fetch(`${API_BASE_URL}/promotions?${params}`, { headers: getAuthHeaders(false) })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch promotions')
  }

  return data.data
}

export async function getPromotion(id: number): Promise<AdminPromotion> {
  const response = await fetch(`${API_BASE_URL}/promotions/${id}`, { headers: getAuthHeaders(false) })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch promotion')
  }

  return data.data
}

export async function createPromotion(promotionData: Partial<AdminPromotion>): Promise<AdminPromotion> {
  const response = await fetch(`${API_BASE_URL}/promotions`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(promotionData),
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to create promotion')
  }

  return data.data
}

export async function updatePromotion(id: number, promotionData: Partial<AdminPromotion>): Promise<AdminPromotion> {
  const response = await fetch(`${API_BASE_URL}/promotions/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
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
    headers: getAuthHeaders(false),
  })
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Failed to delete promotion')
  }
}
