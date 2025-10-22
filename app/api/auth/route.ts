import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable must be set')
}

interface AuthUser {
  userId: number
  email: string
  role: string
}

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  full_name: string
  email: string
  password: string
  phone?: string
  location?: string
}

function isAuthUser(payload: any): payload is AuthUser {
  return (
    payload &&
    typeof payload === 'object' &&
    typeof payload.userId === 'number' &&
    typeof payload.email === 'string' &&
    typeof payload.role === 'string'
  )
}

// POST /api/auth/login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    switch (action) {
      case 'login':
        return await handleLogin(data as LoginRequest)
      case 'register':
        return await handleRegister(data as RegisterRequest)
      case 'logout':
        return await handleLogout()
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Auth API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/auth/me - Get current user info
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET!)

    if (!isAuthUser(decoded)) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

async function handleLogin(data: LoginRequest) {
  const { email, password: userPassword } = data

  if (!email || !userPassword) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    )
  }

  // Find user by email using Prisma
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  // Verify password
  const isValidPassword = user.password ? await bcrypt.compare(userPassword, user.password) : false
  if (!isValidPassword) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  // Check if user is active
  if (!user.isActive) {
    return NextResponse.json(
      { error: 'Account is not active' },
      { status: 401 }
    )
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET!,
    { expiresIn: '7d' }
  )

  // Return user without password and token
  const { password, ...userWithoutPassword } = user
  return NextResponse.json({
    user: userWithoutPassword,
    token,
    message: 'Login successful'
  })
}

async function handleRegister(data: RegisterRequest) {
  const { full_name, email, password: userPassword, phone, location } = data

  if (!full_name || !email || !userPassword) {
    return NextResponse.json(
      { error: 'Full name, email, and password are required' },
      { status: 400 }
    )
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userPassword, 10)

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return NextResponse.json(
      { error: 'User already exists' },
      { status: 409 }
    )
  }

  // Create new user
  const newUser = await prisma.user.create({
    data: {
      fullName: full_name,
      email,
      password: hashedPassword,
      role: 'user',
      phone: phone || null,
      location: location || null,
    }
  })

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    },
    JWT_SECRET!,
    { expiresIn: '7d' }
  )

  // Return user without password and token
  const { password, ...userWithoutPassword } = newUser
  return NextResponse.json({
    user: userWithoutPassword,
    token,
    message: 'Registration successful'
  })
}

async function handleLogout() {
  // For logout, we just return success since JWT is stateless
  // Client should remove the token from storage
  return NextResponse.json({ message: 'Logout successful' })
}
