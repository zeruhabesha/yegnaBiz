import { NextRequest, NextResponse } from 'next/server'

import { createAdminUser } from '@/lib/data/users'

export async function POST(request: NextRequest) {
  try {
    const { email, password, full_name, role = 'user', phone, location } = await request.json()

    if (!email || !password || !full_name) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and password are required' },
        { status: 400 },
      )
    }

    const user = await createAdminUser({ email, password, full_name, role, phone, location })

    return NextResponse.json({ success: true, data: user }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Email already exists') {
      return NextResponse.json({ success: false, error: error.message }, { status: 409 })
    }

    console.error('Error during registration:', error)
    return NextResponse.json({ success: false, error: 'Failed to create account' }, { status: 500 })
  }
}
