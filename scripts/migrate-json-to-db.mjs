#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const dataDir = path.join(projectRoot, 'data')

async function safeReadJson(filename) {
  const p = path.join(dataDir, filename)
  try {
    const raw = await fs.promises.readFile(p, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    if (err.code === 'ENOENT') return []
    throw err
  }
}

async function run() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Abort migration.')
    process.exit(1)
  }

  // Lazy import prisma client so script can run after npm install
  // Use Node's createRequire to synchronously require the CommonJS wrapper
  const { createRequire } = await import('module')
  const require = createRequire(import.meta.url)
  const { prisma } = require('../lib/prisma.cjs')

  // Migrate users
  const users = await safeReadJson('admin-users.json')
  for (const u of users) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } }).catch(() => null)
    if (existing) continue
    await prisma.user.create({ data: {
      fullName: u.full_name || undefined,
      email: u.email,
      password: u.password || undefined,
      role: u.role || 'admin',
      phone: u.phone || undefined,
      location: u.location || undefined,
      createdAt: u.created_at ? new Date(u.created_at) : undefined,
      updatedAt: u.updated_at ? new Date(u.updated_at) : undefined,
    }})
    console.log('Imported user:', u.email)
  }

  // Migrate companies
  const companies = await safeReadJson('admin-companies.json')
  for (const c of companies) {
    const existing = await prisma.company.findUnique({ where: { slug: c.slug } }).catch(() => null)
    if (existing) continue
    await prisma.company.create({ data: {
      name: c.name,
      slug: c.slug,
      description: c.description || undefined,
      category: c.category || 'Uncategorized',
      subcategory: c.subcategory || undefined,
      city: c.city || undefined,
      region: c.region || undefined,
      country: c.country || undefined,
      address: c.address || undefined,
      email: c.email || undefined,
      phone: c.phone || undefined,
      website: c.website || undefined,
      isVerified: !!c.is_verified,
      isFeatured: !!c.is_featured,
      isPremium: !!c.is_premium,
      rating: typeof c.rating === 'number' ? c.rating : undefined,
      reviewCount: c.review_count || 0,
      viewCount: c.view_count || 0,
      establishedYear: c.established_year || undefined,
      employeeCount: c.employee_count || undefined,
      createdAt: c.created_at ? new Date(c.created_at) : undefined,
      updatedAt: c.updated_at ? new Date(c.updated_at) : undefined,
    }})
    console.log('Imported company:', c.slug)
  }

  // Migrate promotions
  const promotions = await safeReadJson('admin-promotions.json')
  for (const p of promotions) {
    const existing = await prisma.promotion.findFirst({ where: { title: p.title } }).catch(() => null)
    if (existing) continue
    await prisma.promotion.create({ data: {
      title: p.title,
      description: p.description || undefined,
      type: p.type || 'banner',
      status: p.status || 'inactive',
      isActive: !!p.is_active,
      clicks: p.clicks || 0,
      conversions: p.conversions || 0,
      budget: p.budget || 0,
      spent: p.spent || 0,
      startDate: p.start_date ? new Date(p.start_date) : undefined,
      endDate: p.end_date ? new Date(p.end_date) : undefined,
      createdAt: p.created_at ? new Date(p.created_at) : undefined,
      updatedAt: p.updated_at ? new Date(p.updated_at) : undefined,
    }})
    console.log('Imported promotion:', p.title)
  }

  // Migrate reviews
  const reviews = await safeReadJson('reviews.json')
  for (const r of reviews) {
    // determine if review already exists by unique combination (companyId + createdAt + author email if present)
    const where = {
      companyId: r.companyId,
      rating: r.rating,
      createdAt: r.createdAt ? new Date(r.createdAt) : undefined,
    }
    const existing = await prisma.review.findFirst({ where }).catch(() => null)
    if (existing) continue
    await prisma.review.create({ data: {
      companyId: r.companyId,
      authorId: r.authorId || undefined,
      title: r.title || undefined,
      comment: r.comment || '',
      rating: r.rating || 0,
      createdAt: r.createdAt ? new Date(r.createdAt) : undefined,
    }}).catch((e) => { console.warn('Failed to import review', e) })
  }

  // Migrate social links
  const socialLinks = await safeReadJson('social-links.json')
  for (const s of socialLinks) {
    // social-links are small; store them in a lightweight table if schema existed — we'll attach to companies via metadata (skip if company missing)
    // Here we add them as reviews-like entries in case schema exists; if not, skip with a warning
    try {
      await prisma.$queryRaw`SELECT 1`
      // If a SocialLink model doesn't exist, this will throw. We'll try inserting into a `socialLink` model if present.
      const modelExists = !!prisma.socialLink
      if (modelExists) {
        const existing = await prisma.socialLink.findFirst({ where: { companyId: s.companyId, url: s.url } }).catch(() => null)
        if (!existing) {
          await prisma.socialLink.create({ data: {
            companyId: s.companyId,
            provider: s.provider || undefined,
            url: s.url || undefined,
          }})
        }
      } else {
        console.warn('No socialLink model found in prisma schema; skipping social links migration')
        break
      }
    } catch (err) {
      console.warn('Skipping social links migration (no socialLink model?)', err.message || err)
      break
    }
  }

  // Migrate business hours
  const hours = await safeReadJson('business-hours.json')
  for (const h of hours) {
    try {
      if (!prisma.businessHour) {
        console.warn('No businessHour model in Prisma schema; skipping business-hours migration')
        break
      }
      const exists = await prisma.businessHour.findFirst({ where: { companyId: h.companyId, day: h.day } }).catch(() => null)
      if (exists) continue
      await prisma.businessHour.create({ data: {
        companyId: h.companyId,
        day: h.day,
        open: h.open || null,
        close: h.close || null,
        isClosed: !!h.isClosed,
      }})
    } catch (err) {
      console.warn('Skipping business-hours row, model might not exist:', err.message || err)
      break
    }
  }

  console.log('Migration complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
