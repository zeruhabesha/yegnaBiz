import { NextRequest, NextResponse } from 'next/server'

import { authenticateAdminUser } from '@/lib/data/users'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 })
    }

    const user = await authenticateAdminUser(email, password)

    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 })
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    if (error instanceof Error && error.message === 'Account is not active') {
      return NextResponse.json({ success: false, error: error.message }, { status: 403 })
    }

    console.error('Error during login:', error)
    return NextResponse.json({ success: false, error: 'Failed to sign in' }, { status: 500 })
  }
}
