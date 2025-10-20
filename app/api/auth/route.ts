import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { readJsonFile, writeJsonFile } from '@/lib/data/json-store'

const USERS_FILE = 'admin-users.json'
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'

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

async function readUsers() {
  try {
    return await readJsonFile<any[]>(USERS_FILE)
  } catch (error) {
    // Return empty array if file doesn't exist
    return []
  }
}

async function writeUsers(users: any[]) {
  await writeJsonFile(USERS_FILE, users)
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
    const decoded = jwt.verify(token, JWT_SECRET) as any

    const users = await readUsers()
    const user = users.find((u: any) => u.id === decoded.userId)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Return user without password
    const { password_hash, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

async function handleLogin(data: LoginRequest) {
  const { email, password } = data

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    )
  }

  const users = await readUsers()
  const user = users.find((u: any) => u.email === email)

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password_hash)
  if (!isValidPassword) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  // Check if user is active
  if (user.status !== 'active') {
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
    JWT_SECRET,
    { expiresIn: '7d' }
  )

  // Return user without password and token
  const { password_hash: _, ...userWithoutPassword } = user
  return NextResponse.json({
    user: userWithoutPassword,
    token,
    message: 'Login successful'
  })
}

async function handleRegister(data: RegisterRequest) {
  const { full_name, email, password, phone, location } = data

  if (!full_name || !email || !password) {
    return NextResponse.json(
      { error: 'Full name, email, and password are required' },
      { status: 400 }
    )
  }

  const users = await readUsers()

  // Check if user already exists
  const existingUser = users.find((u: any) => u.email === email)
  if (existingUser) {
    return NextResponse.json(
      { error: 'User already exists' },
      { status: 409 }
    )
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create new user
  const newUser = {
    id: Date.now(),
    full_name,
    email,
    password_hash: hashedPassword,
    role: 'user', // Default role
    status: 'active',
    phone: phone || null,
    location: location || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  users.push(newUser)
  await writeUsers(users)

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )

  // Return user without password and token
  const { password_hash: _, ...userWithoutPassword } = newUser
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
