import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { hashPassword } from '@/lib/password'

// GET /api/admin/users - Get all users with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const role = searchParams.get('role') || 'all'

    let whereClause = ''
    const params: any[] = []
    let paramIndex = 1

    if (search) {
      whereClause += ` AND (full_name ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    if (status !== 'all') {
      whereClause += ` AND status = $${paramIndex}`
      params.push(status)
      paramIndex++
    }

    if (role !== 'all') {
      whereClause += ` AND role = $${paramIndex}`
      params.push(role)
    }

    const result = await query(`
      SELECT id, full_name, email, role, status, created_at, updated_at
      FROM users
      WHERE 1=1 ${whereClause}
      ORDER BY created_at DESC
    `, params)

    return NextResponse.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/admin/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { full_name, email, password, role = 'user', phone, location } = body

    if (!full_name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Hash password
    const password_hash = hashPassword(password)

    const result = await query(
      `INSERT INTO users (full_name, email, password_hash, role, phone, location, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'active')
       RETURNING id, full_name, email, role, status, created_at`,
      [full_name, email, password_hash, role, phone, location]
    )

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
