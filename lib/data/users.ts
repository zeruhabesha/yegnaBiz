import bcrypt from 'bcryptjs'
import type { AdminUser } from '@/lib/types/admin'
import { readJsonFile, writeJsonFile } from '@/lib/data/json-store'
import { dbQuery, isDatabaseEnabled } from '@/lib/data/database'

const ADMIN_USERS_FILE = 'admin-users.json'

type StoredAdminUser = AdminUser & { password_hash: string }

interface AdminUserRow {
  id: number
  full_name: string
  email: string
  role: string
  status: string
  phone: string | null
  location: string | null
  created_at: Date
  updated_at: Date
  password_hash: string
}

const useDatabase = isDatabaseEnabled()

function mapStoredUser(user: StoredAdminUser): AdminUser {
  const { password_hash: _password, ...rest } = user
  return rest
}

function mapRowToStoredUser(row: AdminUserRow): StoredAdminUser {
  return {
    id: row.id,
    full_name: row.full_name,
    email: row.email,
    role: row.role,
    status: row.status,
    phone: row.phone ?? undefined,
    location: row.location ?? undefined,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
    password_hash: row.password_hash,
  }
}

async function readAdminUsersFromFile(): Promise<StoredAdminUser[]> {
  try {
    return await readJsonFile<StoredAdminUser[]>(ADMIN_USERS_FILE)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function writeAdminUsers(users: StoredAdminUser[]) {
  await writeJsonFile(ADMIN_USERS_FILE, users)
}

export async function listAdminUsers({
  search,
  status,
  role,
}: {
  search?: string
  status?: string
  role?: string
}): Promise<AdminUser[]> {
  if (useDatabase) {
    const conditions: string[] = []
    const values: unknown[] = []

    if (search) {
      values.push(`%${search}%`)
      const index = values.length
      conditions.push(`(full_name ILIKE $${index} OR email ILIKE $${index})`)
    }

    if (status && status !== 'all') {
      values.push(status)
      conditions.push(`status = $${values.length}`)
    }

    if (role && role !== 'all') {
      values.push(role)
      conditions.push(`role = $${values.length}`)
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
    const query = `
      SELECT id, full_name, email, role, status, phone, location, created_at, updated_at, password_hash
      FROM users
      ${whereClause}
      ORDER BY created_at DESC
    `

    const { rows } = await dbQuery<AdminUserRow>(query, values)
    return rows.map((row) => mapStoredUser(mapRowToStoredUser(row)))
  }

  const users = await readAdminUsersFromFile()
  return users
    .filter((user) => {
      const matchesSearch = search
        ? user.full_name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        : true
      const matchesStatus = status && status !== 'all' ? user.status === status : true
      const matchesRole = role && role !== 'all' ? user.role === role : true
      return matchesSearch && matchesStatus && matchesRole
    })
    .map(mapStoredUser)
}

export async function getAdminUserById(id: number): Promise<AdminUser | undefined> {
  if (useDatabase) {
    const { rows } = await dbQuery<AdminUserRow>(
      `SELECT id, full_name, email, role, status, phone, location, created_at, updated_at, password_hash FROM users WHERE id = $1`,
      [id],
    )
    const row = rows[0]
    return row ? mapStoredUser(mapRowToStoredUser(row)) : undefined
  }

  const users = await readAdminUsersFromFile()
  const user = users.find((item) => item.id === id)
  return user ? mapStoredUser(user) : undefined
}

export async function getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
  if (useDatabase) {
    const { rows } = await dbQuery<AdminUserRow>(
      `SELECT id, full_name, email, role, status, phone, location, created_at, updated_at, password_hash FROM users WHERE email = $1`,
      [email],
    )
    const row = rows[0]
    return row ? mapStoredUser(mapRowToStoredUser(row)) : undefined
  }

  const users = await readAdminUsersFromFile()
  const user = users.find((item) => item.email === email)
  return user ? mapStoredUser(user) : undefined
}

export async function createAdminUser(data: {
  full_name: string
  email: string
  password: string
  role?: string
  phone?: string
  location?: string
}): Promise<AdminUser> {
  if (!data.full_name || !data.email || !data.password) {
    throw new Error('Missing required fields')
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)
  const role = data.role ?? 'user'
  const status = 'active'

  if (useDatabase) {
    const { rows } = await dbQuery<AdminUserRow>(
      `
        INSERT INTO users (full_name, email, password_hash, role, status, phone, location)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, full_name, email, role, status, phone, location, created_at, updated_at, password_hash
      `,
      [data.full_name, data.email, hashedPassword, role, status, data.phone ?? null, data.location ?? null],
    )

    const row = rows[0]
    return mapStoredUser(mapRowToStoredUser(row))
  }

  const users = await readAdminUsersFromFile()

  const existingUser = users.find((user) => user.email === data.email)
  if (existingUser) {
    throw new Error('User already exists')
  }

  const nextId = users.reduce((max, user) => Math.max(max, user.id), 0) + 1
  const timestamp = new Date().toISOString()

  const stored: StoredAdminUser = {
    id: nextId,
    full_name: data.full_name,
    email: data.email,
    role,
    status,
    phone: data.phone,
    location: data.location,
    created_at: timestamp,
    updated_at: timestamp,
    password_hash: hashedPassword,
  }

  users.push(stored)
  await writeAdminUsers(users)

  return mapStoredUser(stored)
}

export async function updateAdminUser(id: number, updates: Partial<AdminUser>): Promise<AdminUser | undefined> {
  if (useDatabase) {
    const fields: string[] = []
    const values: unknown[] = []

    const allowed: Array<[keyof AdminUser, string]> = [
      ['full_name', 'full_name'],
      ['email', 'email'],
      ['role', 'role'],
      ['status', 'status'],
      ['phone', 'phone'],
      ['location', 'location'],
    ]

    for (const [key, column] of allowed) {
      if (updates[key] !== undefined) {
        values.push(updates[key])
        fields.push(`${column} = $${values.length}`)
      }
    }

    if (fields.length === 0) {
      return await getAdminUserById(id)
    }

    values.push(id)
    const query = `
      UPDATE users
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${values.length}
      RETURNING id, full_name, email, role, status, phone, location, created_at, updated_at, password_hash
    `

    const { rows } = await dbQuery<AdminUserRow>(query, values)
    const row = rows[0]
    return row ? mapStoredUser(mapRowToStoredUser(row)) : undefined
  }

  const users = await readAdminUsersFromFile()
  const index = users.findIndex((user) => user.id === id)
  if (index === -1) {
    return undefined
  }

  const updated: StoredAdminUser = {
    ...users[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }
  users[index] = updated
  await writeAdminUsers(users)

  return mapStoredUser(updated)
}

export async function deleteAdminUser(id: number): Promise<boolean> {
  if (useDatabase) {
    const { rowCount } = await dbQuery('DELETE FROM users WHERE id = $1', [id])
    return rowCount > 0
  }

  const users = await readAdminUsersFromFile()
  const index = users.findIndex((user) => user.id === id)
  if (index === -1) {
    return false
  }

  users.splice(index, 1)
  await writeAdminUsers(users)
  return true
}

export async function authenticateUser(email: string, password: string): Promise<AdminUser | null> {
  if (useDatabase) {
    const { rows } = await dbQuery<AdminUserRow>(
      `SELECT id, full_name, email, role, status, phone, location, created_at, updated_at, password_hash FROM users WHERE email = $1`,
      [email],
    )
    const row = rows[0]

    if (!row) {
      return null
    }

    const isValidPassword = await bcrypt.compare(password, row.password_hash)
    if (!isValidPassword) {
      return null
    }

    return mapStoredUser(mapRowToStoredUser(row))
  }

  const users = await readAdminUsersFromFile()
  const user = users.find((item) => item.email === email)

  if (!user) {
    return null
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash)
  if (!isValidPassword) {
    return null
  }

  return mapStoredUser(user)
}
