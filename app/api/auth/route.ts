// app/api/auth/route.js

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Assuming these types and functions exist for the JSON store fallback
// You'll need to create lib/types/admin.ts and lib/data/users.ts
// For example, lib/types/admin.ts might look like:
// export interface AdminUser {
//   id: number;
//   full_name: string;
//   email: string;
//   password_hash: string; // Or just 'password' if you hash it before storing
//   role: string;
//   status: 'active' | 'inactive';
//   phone?: string | null;
//   created_at: Date | string;
//   updated_at: Date | string;
// }
//
// And lib/data/users.ts would contain the logic to read/write from a JSON file
// or an in-memory store for AdminUsers.
// For example:
// import { AdminUser } from '@/lib/types/admin';
// import fs from 'fs/promises';
// import path from 'path';
//
// const ADMIN_USERS_FILE = path.join(process.cwd(), 'data', 'admin_users.json');
//
// async function readAdminUsers(): Promise<AdminUser[]> {
//   try {
//     const data = await fs.readFile(ADMIN_USERS_FILE, 'utf-8');
//     return JSON.parse(data);
//   } catch (error) {
//     if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
//       return [];
//     }
//     console.error('Error reading admin users file:', error);
//     throw error;
//   }
// }
//
// async function writeAdminUsers(users: AdminUser[]): Promise<void> {
//   await fs.writeFile(ADMIN_USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
// }
//
// export async function getAdminUserById(id: number): Promise<AdminUser | null> {
//   const users = await readAdminUsers();
//   return users.find(user => user.id === id) || null;
// }
//
// export async function authenticateUser(email: string, passwordAttempt: string): Promise<AdminUser | null> {
//   const users = await readAdminUsers();
//   const user = users.find(u => u.email === email);
//   if (user && user.password_hash && await bcrypt.compare(passwordAttempt, user.password_hash)) {
//     return user;
//   }
//   return null;
// }
//
// export async function createAdminUser(data: { full_name: string; email: string; password: string; role: string; phone?: string | null }): Promise<AdminUser> {
//   const users = await readAdminUsers();
//   if (users.some(u => u.email === data.email)) {
//     throw new Error('User already exists');
//   }
//   const hashedPassword = await bcrypt.hash(data.password, 10);
//   const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
//   const now = new Date().toISOString();
//   const newUser: AdminUser = {
//     id: newId,
//     full_name: data.full_name,
//     email: data.email,
//     password_hash: hashedPassword,
//     role: data.role,
//     status: 'active',
//     phone: data.phone ?? null,
//     created_at: now,
//     updated_at: now,
//   };
//   users.push(newUser);
//   await writeAdminUsers(users);
//   return newUser;
// }


// If you are not using TypeScript, you might need to adjust imports
// to plain JS or remove type imports if they cause issues.
// For example, if @prisma/client is not a direct dependency, you'd remove `type { User } from '@prisma/client'`
// If using plain JS, you'd often just rely on JSDoc for types or skip them.
import type { User } from '@prisma/client'; // Keep this if @prisma/client is installed
import type { AdminUser } from '@/lib/types/admin'; // Assuming this exists
import { authenticateUser, createAdminUser, getAdminUserById } from '@/lib/data/users'; // Assuming this exists

/** @typedef {import('@prisma/client').PrismaClient} PrismaClient */

/** @type {PrismaClient | null} */
let prisma = null;

if (process.env.DATABASE_URL) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    prisma = require(path.join(process.cwd(), 'lib', 'prisma.cjs')).prisma;
  } catch (error) {
    console.warn('Prisma client not available for auth endpoint, falling back to JSON store', error);
    prisma = null;
  }
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable must be set');
}

/**
 * @typedef {object} AuthUser
 * @property {number} userId
 * @property {string} email
 * @property {string} role
 */

/**
 * @typedef {object} LoginRequest
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {object} RegisterRequest
 * @property {string} fullName
 * @property {string} email
 * @property {string} password
 * @property {string} [phone]
 */

/**
 * @typedef {object} SerializedUser
 * @property {number} id
 * @property {string} email
 * @property {string} fullName
 * @property {string} role
 * @property {boolean} isActive
 * @property {string} status
 * @property {string | null} phone
 * @property {Date | string} createdAt
 * @property {Date | string} updatedAt
 */

/**
 * Maps a Prisma User object to a SerializedUser object.
 * @param {User} user
 * @returns {SerializedUser}
 */
function mapPrismaUser(user) {
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
  };
}

/**
 * Maps an AdminUser object (from JSON store) to a SerializedUser object.
 * @param {AdminUser} user
 * @returns {SerializedUser}
 */
function mapAdminUser(user) {
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
  };
}

/**
 * Type guard to check if a payload is an AuthUser.
 * @param {any} payload
 * @returns {payload is AuthUser}
 */
function isAuthUser(payload) {
  return (
    payload &&
    typeof payload === 'object' &&
    typeof payload.userId === 'number' &&
    typeof payload.email === 'string' &&
    typeof payload.role === 'string'
  );
}

// POST /api/auth/login
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'login':
        return await handleLogin(data);
      case 'register':
        return await handleRegister(data);
      case 'logout':
        return await handleLogout();
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/auth/me - Get current user info
export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!isAuthUser(decoded)) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
    }

    /** @type {SerializedUser | null} */
    let serializedUser = null;

    if (prisma) {
      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: decoded.userId },
        });

        if (dbUser) {
          serializedUser = mapPrismaUser(dbUser);
        }
      } catch (error) {
        console.error('Error fetching user from database, attempting JSON fallback:', error);
      }
    }

    if (!serializedUser) {
      const fallbackUser = await getAdminUserById(decoded.userId);
      if (fallbackUser) {
        serializedUser = mapAdminUser(fallbackUser);
      }
    }

    if (!serializedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: serializedUser });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

/**
 * Handles user login.
 * @param {LoginRequest} data
 * @returns {Promise<NextResponse>}
 */
async function handleLogin(data) {
  const { email, password: userPassword } = data;

  if (!email || !userPassword) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  if (prisma) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const isValidPassword = user.password ? await bcrypt.compare(userPassword, user.password) : false;
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      if (!user.isActive) {
        return NextResponse.json(
          { error: 'Account is not active' },
          { status: 401 }
        );
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return NextResponse.json({
        user: mapPrismaUser(user),
        token,
        message: 'Login successful',
      });
    } catch (error) {
      console.error('Database login error, attempting JSON fallback:', error);
    }
  }

  const fallbackUser = await authenticateUser(email, userPassword);

  if (!fallbackUser) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }

  if (fallbackUser.status && fallbackUser.status !== 'active') {
    return NextResponse.json(
      { error: 'Account is not active' },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    {
      userId: fallbackUser.id,
      email: fallbackUser.email,
      role: fallbackUser.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return NextResponse.json({
    user: mapAdminUser(fallbackUser),
    token,
    message: 'Login successful',
  });
}

/**
 * Handles user registration.
 * @param {RegisterRequest} data
 * @returns {Promise<NextResponse>}
 */
async function handleRegister(data) {
  const { fullName, email, password: userPassword, phone } = data;

  if (!fullName || !email || !userPassword) {
    return NextResponse.json(
      { error: 'Full name, email, and password are required' },
      { status: 400 }
    );
  }

  if (prisma) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 409 }
        );
      }

      const hashedPassword = await bcrypt.hash(userPassword, 10);

      const newUser = await prisma.user.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
          role: 'user',
          phone: phone || null,
        },
      });

      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
          role: newUser.role,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return NextResponse.json({
        user: mapPrismaUser(newUser),
        token,
        message: 'Registration successful',
      });
    } catch (error) {
      if ((error).code === 'P2002') { // Prisma unique constraint violation
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 409 }
        );
      }

      console.error('Database registration error, attempting JSON fallback:', error);
    }
  }

  try {
    const newUser = await createAdminUser({
      full_name: fullName,
      email,
      password: userPassword, // The createAdminUser function should handle hashing internally
      role: 'user',
      phone,
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      user: mapAdminUser(newUser),
      token,
      message: 'Registration successful',
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'User already exists') {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    console.error('JSON store registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}

/**
 * Handles user logout.
 * @returns {NextResponse}
 */
async function handleLogout() {
  // For logout, we just return success since JWT is stateless
  // Client should remove the token from storage
  return NextResponse.json({ message: 'Logout successful' });
}
