import type { AdminPromotion } from '@/lib/types/admin'
import type { PublicPromotion } from '@/lib/types/promotions'
import { readJsonFile, writeJsonFile } from '@/lib/data/json-store'

const ADMIN_PROMOTIONS_FILE = 'admin-promotions.json'
const PUBLIC_PROMOTIONS_FILE = 'promotions.json'

async function readAdminPromotions(): Promise<AdminPromotion[]> {
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

async function readPublicPromotions(): Promise<PublicPromotion[]> {
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
  const promotions = await readPublicPromotions()

  const filtered = includeInactive
    ? promotions
    : promotions.filter((promotion) => promotion.status === 'active')

  return filtered.sort((a, b) => a.order - b.order)
}

export async function getPublicPromotionById(id: string): Promise<PublicPromotion | undefined> {
  const promotions = await readPublicPromotions()
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
  const promotions = await readAdminPromotions()

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
  const promotions = await readAdminPromotions()
  return promotions.find((promotion) => promotion.id === id)
}

export async function createAdminPromotion(data: Partial<AdminPromotion>): Promise<AdminPromotion> {
  if (!data.title || !data.type || !data.start_date || !data.end_date) {
    throw new Error('Missing required fields')
  }

  const promotions = await readAdminPromotions()
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
  const promotions = await readAdminPromotions()
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
  const promotions = await readAdminPromotions()
  const index = promotions.findIndex((promotion) => promotion.id === id)
  if (index === -1) {
    return false
  }

  promotions.splice(index, 1)
  await writeAdminPromotions(promotions)
  return true
}
