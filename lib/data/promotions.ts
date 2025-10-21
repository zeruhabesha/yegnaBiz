import type { AdminPromotion } from '@/lib/types/admin'
import type { PublicPromotion } from '@/lib/types/promotions'
import { readJsonFile, writeJsonFile } from '@/lib/data/json-store'
import { dbQuery, isDatabaseEnabled } from '@/lib/data/database'

const ADMIN_PROMOTIONS_FILE = 'admin-promotions.json'
const PUBLIC_PROMOTIONS_FILE = 'promotions.json'

const useDatabase = isDatabaseEnabled()

interface PromotionRow {
  id: number
  title: string
  description: string | null
  type: string
  status: string
  start_date: string | Date
  end_date: string | Date
  target_audience: string | null
  budget: string | null
  spent: string | null
  clicks: number
  conversions: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

async function readAdminPromotionsFromFile(): Promise<AdminPromotion[]> {
  try {
    return await readJsonFile<AdminPromotion[]>(ADMIN_PROMOTIONS_FILE)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function writeAdminPromotions(promotions: AdminPromotion[]) {
  await writeJsonFile(ADMIN_PROMOTIONS_FILE, promotions)
}

async function readPublicPromotionsFromFile(): Promise<PublicPromotion[]> {
  try {
    return await readJsonFile<PublicPromotion[]>(PUBLIC_PROMOTIONS_FILE)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

export async function listPublicPromotions({
  includeInactive = false,
}: { includeInactive?: boolean } = {}): Promise<PublicPromotion[]> {
  if (useDatabase) {
    const conditions: string[] = []
    const values: unknown[] = []

    if (!includeInactive) {
      conditions.push('is_active = true')
      conditions.push("status = 'active'")
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
    const query = `SELECT * FROM promotions ${where} ORDER BY start_date DESC`
    const { rows } = await dbQuery<PromotionRow>(query, values)

    return rows.map((row) => buildPublicPromotion(mapRowToAdminPromotion(row)))
  }

  const promotions = await readPublicPromotionsFromFile()

  const filtered = includeInactive
    ? promotions
    : promotions.filter((promotion) => promotion.status === 'active')

  return filtered.sort((a, b) => a.order - b.order)
}

export async function getPublicPromotionById(id: string): Promise<PublicPromotion | undefined> {
  if (useDatabase) {
    const { rows } = await dbQuery<PromotionRow>('SELECT * FROM promotions WHERE id = $1', [Number(id)])
    const row = rows[0]
    return row ? buildPublicPromotion(mapRowToAdminPromotion(row)) : undefined
  }

  const promotions = await readPublicPromotionsFromFile()
  return promotions.find((promotion) => promotion.id === id)
}

export async function listAdminPromotions({
  search,
  status,
  type,
}: {
  search?: string
  status?: string
  type?: string
}): Promise<AdminPromotion[]> {
  if (useDatabase) {
    const conditions: string[] = []
    const values: unknown[] = []

    if (search) {
      values.push(`%${search}%`)
      const idx = values.length
      conditions.push(`(title ILIKE $${idx} OR description ILIKE $${idx})`)
    }

    if (status && status !== 'all') {
      values.push(status)
      conditions.push(`status = $${values.length}`)
    }

    if (type && type !== 'all') {
      values.push(type)
      conditions.push(`type = $${values.length}`)
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
    const query = `SELECT * FROM promotions ${where} ORDER BY created_at DESC`
    const { rows } = await dbQuery<PromotionRow>(query, values)
    return rows.map((row) => mapRowToAdminPromotion(row))
  }

  const promotions = await readAdminPromotionsFromFile()

  return promotions.filter((promotion) => {
    const matchesSearch = search
      ? promotion.title.toLowerCase().includes(search.toLowerCase()) ||
        (promotion.description ?? '').toLowerCase().includes(search.toLowerCase())
      : true
    const matchesStatus = status && status !== 'all' ? promotion.status === status : true
    const matchesType = type && type !== 'all' ? promotion.type === type : true
    return matchesSearch && matchesStatus && matchesType
  })
}

export async function getAdminPromotionById(id: number): Promise<AdminPromotion | undefined> {
  if (useDatabase) {
    const { rows } = await dbQuery<PromotionRow>('SELECT * FROM promotions WHERE id = $1', [id])
    const row = rows[0]
    return row ? mapRowToAdminPromotion(row) : undefined
  }

  const promotions = await readAdminPromotionsFromFile()
  return promotions.find((promotion) => promotion.id === id)
}

export async function createAdminPromotion(data: Partial<AdminPromotion>): Promise<AdminPromotion> {
  if (!data.title || !data.type || !data.start_date || !data.end_date) {
    throw new Error('Missing required fields')
  }

  if (useDatabase) {
    const { rows } = await dbQuery<PromotionRow>(
      `
        INSERT INTO promotions (
          title, description, type, status, start_date, end_date,
          target_audience, budget, spent, clicks, conversions, is_active
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
      `,
      [
        data.title,
        data.description ?? null,
        data.type,
        data.status ?? 'active',
        data.start_date,
        data.end_date,
        data.target_audience ?? null,
        data.budget ?? 0,
        data.spent ?? 0,
        data.clicks ?? 0,
        data.conversions ?? 0,
        data.is_active ?? true,
      ],
    )

    const row = rows[0]
    return mapRowToAdminPromotion(row)
  }

  const promotions = await readAdminPromotionsFromFile()
  const nextId = promotions.reduce((max, promotion) => Math.max(max, promotion.id), 0) + 1
  const timestamp = new Date().toISOString()

  const promotion: AdminPromotion = {
    id: nextId,
    title: data.title,
    description: data.description ?? '',
    type: data.type,
    status: data.status ?? 'active',
    start_date: data.start_date,
    end_date: data.end_date,
    target_audience: data.target_audience,
    budget: data.budget ?? 0,
    spent: data.spent ?? 0,
    clicks: data.clicks ?? 0,
    conversions: data.conversions ?? 0,
    is_active: data.is_active ?? true,
    created_at: timestamp,
    updated_at: timestamp,
  }

  promotions.push(promotion)
  await writeAdminPromotions(promotions)

  return promotion
}

export async function updateAdminPromotion(
  id: number,
  updates: Partial<AdminPromotion>,
): Promise<AdminPromotion | undefined> {
  if (useDatabase) {
    const fields: string[] = []
    const values: unknown[] = []

    const mapping: Array<[keyof AdminPromotion, string]> = [
      ['title', 'title'],
      ['description', 'description'],
      ['type', 'type'],
      ['status', 'status'],
      ['start_date', 'start_date'],
      ['end_date', 'end_date'],
      ['target_audience', 'target_audience'],
      ['budget', 'budget'],
      ['spent', 'spent'],
      ['clicks', 'clicks'],
      ['conversions', 'conversions'],
      ['is_active', 'is_active'],
    ]

    for (const [key, column] of mapping) {
      if (updates[key] !== undefined) {
        values.push(updates[key])
        fields.push(`${column} = $${values.length}`)
      }
    }

    if (fields.length === 0) {
      return await getAdminPromotionById(id)
    }

    values.push(id)
    const query = `
      UPDATE promotions
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${values.length}
      RETURNING *
    `

    const { rows } = await dbQuery<PromotionRow>(query, values)
    const row = rows[0]
    return row ? mapRowToAdminPromotion(row) : undefined
  }

  const promotions = await readAdminPromotionsFromFile()
  const index = promotions.findIndex((promotion) => promotion.id === id)
  if (index === -1) {
    return undefined
  }

  const updated: AdminPromotion = {
    ...promotions[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  promotions[index] = updated
  await writeAdminPromotions(promotions)

  return updated
}

export async function deleteAdminPromotion(id: number): Promise<boolean> {
  if (useDatabase) {
    const { rowCount } = await dbQuery('DELETE FROM promotions WHERE id = $1', [id])
    return rowCount > 0
  }

  const promotions = await readAdminPromotionsFromFile()
  const index = promotions.findIndex((promotion) => promotion.id === id)
  if (index === -1) {
    return false
  }

  promotions.splice(index, 1)
  await writeAdminPromotions(promotions)
  return true
}

function mapRowToAdminPromotion(row: PromotionRow): AdminPromotion {
  const startDate = typeof row.start_date === 'string' ? row.start_date : row.start_date.toISOString().split('T')[0]
  const endDate = typeof row.end_date === 'string' ? row.end_date : row.end_date.toISOString().split('T')[0]

  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    type: row.type,
    status: row.status,
    start_date: startDate,
    end_date: endDate,
    target_audience: row.target_audience ?? undefined,
    budget: row.budget ? Number(row.budget) : 0,
    spent: row.spent ? Number(row.spent) : 0,
    clicks: row.clicks,
    conversions: row.conversions,
    is_active: row.is_active,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
  }
}

function buildPublicPromotion(promotion: AdminPromotion): PublicPromotion {
  const status = promotion.is_active
    ? promotion.status === 'active'
      ? 'active'
      : promotion.status === 'scheduled'
        ? 'scheduled'
        : 'inactive'
    : 'inactive'

  const budget = promotion.budget ?? 0
  const spent = promotion.spent ?? 0
  const remaining = Math.max(0, budget - spent)

  return {
    id: promotion.id.toString(),
    title: promotion.title,
    description: promotion.description ?? '',
    buttonText: 'View details',
    buttonLink: '/promote',
    bgColor: 'bg-gradient-to-br from-primary via-primary/80 to-purple-600',
    textColor: 'text-white',
    image: undefined,
    status,
    order: promotion.id,
    popup: {
      subtitle: promotion.type,
      badge: status === 'active' ? 'Live now' : status === 'scheduled' ? 'Coming soon' : 'Campaign',
      image: '/promo-default.jpg',
      cta: 'Promote your business',
      ctaLink: '/promote',
      price: {
        original: `₿${budget.toLocaleString('en-US')}`,
        discounted: `₿${remaining.toLocaleString('en-US')}`,
      },
      features: [
        `Target audience: ${promotion.target_audience ?? 'All users'}`,
        `Clicks: ${promotion.clicks}`,
        `Conversions: ${promotion.conversions}`,
      ],
      stats: [
        { label: 'Start date', value: promotion.start_date },
        { label: 'End date', value: promotion.end_date },
      ],
    },
  }
}
