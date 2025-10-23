import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { User } from '@prisma/client'
import type { AdminUser } from '@/lib/types/admin'
import { authenticateUser, createAdminUser, getAdminUserById } from '@/lib/data/users'

type PrismaClient = import('@prisma/client').PrismaClient

let prisma: PrismaClient | null = null

if (process.env.DATABASE_URL) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    prisma = require(path.join(process.cwd(), 'lib', 'prisma.cjs')).prisma as PrismaClient
  } catch (error) {
    console.warn('Prisma client not available for auth endpoint, falling back to JSON store')
    prisma = null
  }
}

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
  fullName: string
  email: string
  password: string
  phone?: string
  // location?: string  // Removed since it doesn't exist in database
}

interface SerializedUser {
  id: number
  email: string
  fullName: string
  role: string
  isActive: boolean
  status: string
  phone: string | null
  createdAt: Date | string
  updatedAt: Date | string
}

function mapPrismaUser(user: User): SerializedUser {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName ?? '',
    role: user.role,
    isActive: user.isActive,
    status: user.isActive ? 'active' : 'inactive',
    phone: user.phone ?? null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

function mapAdminUser(user: AdminUser): SerializedUser {
  return {
    id: user.id,
    email: user.email,
    fullName: user.full_name,
    role: user.role,
    isActive: user.status !== 'inactive',
    status: user.status,
    phone: user.phone ?? null,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  }
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

    let serializedUser: SerializedUser | null = null

    if (prisma) {
      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: decoded.userId },
        })

        if (dbUser) {
          serializedUser = mapPrismaUser(dbUser)
        }
      } catch (error) {
        console.error('Error fetching user from database, attempting JSON fallback:', error)
      }
    }

    if (!serializedUser) {
      const fallbackUser = await getAdminUserById(decoded.userId)
      if (fallbackUser) {
        serializedUser = mapAdminUser(fallbackUser)
      }
    }

    if (!serializedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user: serializedUser })
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

  if (prisma) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }

      const isValidPassword = user.password ? await bcrypt.compare(userPassword, user.password) : false
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }

      if (!user.isActive) {
        return NextResponse.json(
          { error: 'Account is not active' },
          { status: 401 }
        )
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET!,
        { expiresIn: '7d' }
      )

      return NextResponse.json({
        user: mapPrismaUser(user),
        token,
        message: 'Login successful',
      })
    } catch (error) {
      console.error('Database login error, attempting JSON fallback:', error)
    }
  }

  const fallbackUser = await authenticateUser(email, userPassword)

  if (!fallbackUser) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  if (fallbackUser.status && fallbackUser.status !== 'active') {
    return NextResponse.json(
      { error: 'Account is not active' },
      { status: 401 }
    )
  }

  const token = jwt.sign(
    {
      userId: fallbackUser.id,
      email: fallbackUser.email,
      role: fallbackUser.role,
    },
    JWT_SECRET!,
    { expiresIn: '7d' }
  )

  return NextResponse.json({
    user: mapAdminUser(fallbackUser),
    token,
    message: 'Login successful',
  })
}

async function handleRegister(data: RegisterRequest) {
  const { fullName, email, password: userPassword, phone } = data

  if (!fullName || !email || !userPassword) {
    return NextResponse.json(
      { error: 'Full name, email, and password are required' },
      { status: 400 }
    )
  }

  if (prisma) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 409 }
        )
      }

      const hashedPassword = await bcrypt.hash(userPassword, 10)

      const newUser = await prisma.user.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
          role: 'user',
          phone: phone || null,
        },
      })

      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
          role: newUser.role,
        },
        JWT_SECRET!,
        { expiresIn: '7d' }
      )

      return NextResponse.json({
        user: mapPrismaUser(newUser),
        token,
        message: 'Registration successful',
      })
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002') {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 409 }
        )
      }

      console.error('Database registration error, attempting JSON fallback:', error)
    }
  }

  try {
    const newUser = await createAdminUser({
      full_name: fullName,
      email,
      password: userPassword,
      role: 'user',
      phone,
    })

    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      user: mapAdminUser(newUser),
      token,
      message: 'Registration successful',
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'User already exists') {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    console.error('JSON store registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    )
  }
}

async function handleLogout() {
  // For logout, we just return success since JWT is stateless
  // Client should remove the token from storage
  return NextResponse.json({ message: 'Logout successful' })
}
