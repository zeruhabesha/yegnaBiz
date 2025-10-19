import { createHash, randomBytes } from 'crypto'
import type { AdminUser } from '@/lib/types/admin'
import { readJsonFile, writeJsonFile } from '@/lib/data/json-store'

const ADMIN_USERS_FILE = 'admin-users.json'

type StoredAdminUser = AdminUser & { password_hash: string }

function mapStoredUser(user: StoredAdminUser): AdminUser {
  const { password_hash: _password, ...rest } = user
  return rest
}

function hashPassword(password: string) {
  const salt = randomBytes(8).toString('hex')
  const hash = createHash('sha256').update(password + salt).digest('hex')
  return `${salt}:${hash}`
}

async function readAdminUsers(): Promise<StoredAdminUser[]> {
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
  const users = await readAdminUsers()
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
  const users = await readAdminUsers()
  const user = users.find((item) => item.id === id)
  return user ? mapStoredUser(user) : undefined
}

export async function createAdminUser(data: {
  full_name?: string
  email?: string
  password?: string
  role?: string
  phone?: string
  location?: string
}): Promise<AdminUser> {
  if (!data.full_name || !data.email || !data.password) {
    throw new Error('Missing required fields')
  }

  const users = await readAdminUsers()
  const nextId = users.reduce((max, user) => Math.max(max, user.id), 0) + 1
  const timestamp = new Date().toISOString()

  const stored: StoredAdminUser = {
    id: nextId,
    full_name: data.full_name,
    email: data.email,
    role: data.role ?? 'user',
    status: 'active',
    phone: data.phone,
    location: data.location,
    created_at: timestamp,
    updated_at: timestamp,
    password_hash: hashPassword(data.password),
  }

  users.push(stored)
  await writeAdminUsers(users)

  return mapStoredUser(stored)
}

export async function updateAdminUser(id: number, updates: Partial<AdminUser>): Promise<AdminUser | undefined> {
  const users = await readAdminUsers()
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
  const users = await readAdminUsers()
  const index = users.findIndex((user) => user.id === id)
  if (index === -1) {
    return false
  }

  users.splice(index, 1)
  await writeAdminUsers(users)
  return true
}
