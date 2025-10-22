import { NextRequest, NextResponse } from 'next/server'
import { createAdminUser, listAdminUsers } from '@/lib/data/users'
import { requireAdmin } from '@/lib/auth-middleware'

// GET /api/admin/users - Get all users with filtering (Admin only)
export const GET = requireAdmin(async (request: NextRequest, _user) => {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const role = searchParams.get('role') || 'all'

    const users = await listAdminUsers({
      search,
      status,
      role,
    })

    return NextResponse.json({
      success: true,
      data: users
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
})

// POST /api/admin/users - Create new user (Admin only)
export const POST = requireAdmin(async (request: NextRequest, _user) => {
  try {
    const body = await request.json()
    const { full_name, email, password, role = 'user', phone, location } = body

    if (!full_name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const created = await createAdminUser({ full_name, email, password, role, phone, location })

    return NextResponse.json({
      success: true,
      data: created
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    )
  }
})
