import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable must be set')
}

interface AuthUser {
  userId: number
  email: string
  role: string
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

export function verifyToken(request: NextRequest): AuthUser | null {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET!)

    if (isAuthUser(decoded)) {
      return decoded
    }

    return null
  } catch (error) {
    return null
  }
}

// For regular API routes
export function requireAuth(handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const user = verifyToken(request)

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    return handler(request, user)
  }
}

// For dynamic routes (like [id])
export function requireAuthForDynamic(handler: (request: NextRequest, user: AuthUser, context: any) => Promise<NextResponse>) {
  return async (request: NextRequest, context: any) => {
    const user = verifyToken(request)

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    return handler(request, user, context)
  }
}

export function requireRole(roles: string[]) {
  return function (handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>) {
    return async (request: NextRequest) => {
      const user = verifyToken(request)

      if (!user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }

      if (!roles.includes(user.role)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        )
      }

      return handler(request, user)
    }
  }
}

export function requireRoleForDynamic(roles: string[]) {
  return function (handler: (request: NextRequest, user: AuthUser, context: any) => Promise<NextResponse>) {
    return async (request: NextRequest, context: any) => {
      const user = verifyToken(request)

      if (!user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }

      if (!roles.includes(user.role)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        )
      }

      return handler(request, user, context)
    }
  }
}

export function requireAdmin(handler: (request: NextRequest, user: AuthUser) => Promise<NextResponse>) {
  return requireRole(['admin'])(handler)
}

export function requireAdminForDynamic(handler: (request: NextRequest, user: AuthUser, context: any) => Promise<NextResponse>) {
  return requireRoleForDynamic(['admin'])(handler)
}
