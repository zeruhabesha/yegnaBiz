#!/usr/bin/env node

/**
 * Database Seeding Script
 * Seeds PostgreSQL when DATABASE_URL is provided, otherwise hydrates the JSON store.
 */

import { mkdir, readFile, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import { Pool } from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = join(__dirname, '..')
const DATA_DIR = join(ROOT_DIR, 'data')

const ADMIN_USERS_FILE = join(DATA_DIR, 'admin-users.json')
const ADMIN_COMPANIES_FILE = join(DATA_DIR, 'admin-companies.json')
const PUBLIC_COMPANIES_FILE = join(DATA_DIR, 'companies.json')

const ADMIN_SEED = {
  fullName: 'Admin User',
  email: 'admin@yegnabiz.com',
  password: 'admin123',
  phone: '+251911111111',
  location: 'Addis Ababa, Ethiopia',
}

const COMPANY_SEED = [
  {
    name: 'Ethio Telecom',
    slug: 'ethio-telecom',
    description:
      'Leading telecommunications company in Ethiopia providing mobile, internet, and digital services.',
    category: 'Technology',
    subcategory: 'Telecommunications',
    email: 'info@ethiotelecom.et',
    phone: '+251115515155',
    website: 'https://www.ethiotelecom.et',
    address: 'Churchill Road',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    country: 'Ethiopia',
    latitude: 9.0131,
    longitude: 38.7378,
    established_year: 2010,
    employee_count: '10000+',
    is_verified: true,
    is_featured: true,
    is_premium: true,
    status: 'active',
    rating: 4.2,
    review_count: 1250,
    view_count: 50000,
  },
  {
    name: 'Dashen Bank',
    slug: 'dashen-bank',
    description: 'Full-service commercial bank offering personal and business banking solutions.',
    category: 'Finance',
    subcategory: 'Banking',
    email: 'info@dashenbank.com',
    phone: '+251115515800',
    website: 'https://www.dashenbanksc.com',
    address: 'Ras Desta Damtew Street',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    country: 'Ethiopia',
    latitude: 9.0214,
    longitude: 38.7468,
    established_year: 1995,
    employee_count: '5000+',
    is_verified: true,
    is_featured: true,
    is_premium: false,
    status: 'active',
    rating: 4.5,
    review_count: 890,
    view_count: 25000,
  },
  {
    name: 'Ethiopian Airlines',
    slug: 'ethiopian-airlines',
    description: 'Flag carrier of Ethiopia offering domestic and international flights.',
    category: 'Transportation',
    subcategory: 'Airlines',
    email: 'info@ethiopianairlines.com',
    phone: '+251115171700',
    website: 'https://www.ethiopianairlines.com',
    address: 'Bole International Airport',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    country: 'Ethiopia',
    latitude: 8.9797,
    longitude: 38.7994,
    established_year: 1945,
    employee_count: '15000+',
    is_verified: true,
    is_featured: true,
    is_premium: true,
    status: 'active',
    rating: 4.7,
    review_count: 3200,
    view_count: 100000,
  },
]

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true })
}

async function readJsonFile(path) {
  try {
    const raw = await readFile(path, 'utf8')
    return JSON.parse(raw)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null
    }
    throw error
  }
}

async function writeJsonFile(path, data) {
  await writeFile(path, JSON.stringify(data, null, 2), 'utf8')
}

function mapAdminCompanyToPublic(company) {
  return {
    id: company.id,
    name: company.name,
    slug: company.slug,
    description: company.description ?? '',
    category: company.category,
    subcategory: company.subcategory ?? undefined,
    email: company.email ?? undefined,
    phone: company.phone ?? undefined,
    website: company.website ?? undefined,
    address: company.address ?? undefined,
    city: company.city ?? undefined,
    region: company.region ?? undefined,
    country: company.country ?? undefined,
    rating: company.rating ?? 0,
    reviewCount: company.review_count ?? 0,
    viewCount: company.view_count ?? 0,
    isVerified: company.is_verified ?? false,
    isFeatured: company.is_featured ?? false,
    isPremium: company.is_premium ?? false,
    establishedYear: company.established_year ?? undefined,
    employeeCount: company.employee_count ?? undefined,
    status: company.status ?? 'active',
    coverImageUrl: company.cover_image_url ?? '/hero-companies.jpg',
    logoUrl: company.logo_url ?? '/placeholder-logo.png',
    latitude: company.latitude ?? undefined,
    longitude: company.longitude ?? undefined,
  }
}

function resolveSslConfig(connectionString) {
  const flag = process.env.DATABASE_SSL?.toLowerCase()

  const shouldUseSsl =
    flag === 'true' || (flag === undefined && connectionString.includes('sslmode=require'))

  if (!shouldUseSsl) {
    return undefined
  }

  const rejectUnauthorized = process.env.DATABASE_SSL_REJECT_UNAUTHORIZED?.toLowerCase() !== 'false'
  return { rejectUnauthorized }
}

async function seedJsonStore() {
  console.log('📁 DATABASE_URL not set – seeding local JSON files...')
  await ensureDataDir()

  const existingUsers = (await readJsonFile(ADMIN_USERS_FILE)) ?? []
  if (existingUsers.length === 0) {
    const passwordHash = await bcrypt.hash(ADMIN_SEED.password, 10)
    const timestamp = new Date().toISOString()

    const adminUser = {
      id: 1,
      full_name: ADMIN_SEED.fullName,
      email: ADMIN_SEED.email,
      password_hash: passwordHash,
      role: 'admin',
      status: 'active',
      phone: ADMIN_SEED.phone,
      location: ADMIN_SEED.location,
      created_at: timestamp,
      updated_at: timestamp,
    }

    await writeJsonFile(ADMIN_USERS_FILE, [adminUser])
    console.log(`✅ Wrote admin credentials to ${ADMIN_USERS_FILE}`)
  } else {
    console.log('✅ Admin users already exist – skipping JSON seed')
  }

  const existingCompanies = (await readJsonFile(ADMIN_COMPANIES_FILE)) ?? []
  if (existingCompanies.length === 0) {
    const timestamp = new Date().toISOString()
    const adminCompanies = COMPANY_SEED.map((company, index) => ({
      id: index + 1,
      created_at: timestamp,
      updated_at: timestamp,
      logo_url: company.logo_url ?? null,
      cover_image_url: company.cover_image_url ?? null,
      ...company,
    }))

    await writeJsonFile(ADMIN_COMPANIES_FILE, adminCompanies)
    await writeJsonFile(
      PUBLIC_COMPANIES_FILE,
      adminCompanies.map((company) => mapAdminCompanyToPublic(company)),
    )

    console.log(
      `✅ Seeded ${adminCompanies.length} companies to ${ADMIN_COMPANIES_FILE} and ${PUBLIC_COMPANIES_FILE}`,
    )
  } else {
    console.log('✅ Companies already exist – skipping JSON seed')
  }
}

async function seedPostgres() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  const config = {
    connectionString,
    max: Number(process.env.DATABASE_POOL_MAX ?? 10),
  }

  const ssl = resolveSslConfig(connectionString)
  if (ssl) {
    config.ssl = ssl
  }

  const pool = new Pool(config)

  pool.on('error', (error) => {
    console.error('[seed] unexpected error on idle client', error)
  })

  console.log('🗄️ DATABASE_URL detected – seeding PostgreSQL...')

  try {
    await pool.query('SELECT 1')
    console.log('✅ Connected to PostgreSQL')

    const createTablesSql = await readFile(join(__dirname, '01-create-tables.sql'), 'utf8')
    await pool.query(createTablesSql)
    console.log('✅ Ensured database schema exists')

    const passwordHash = await bcrypt.hash(ADMIN_SEED.password, 10)
    const adminResult = await pool.query(
      `
        INSERT INTO users (email, password_hash, full_name, phone, location, role, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (email)
        DO UPDATE SET
          password_hash = EXCLUDED.password_hash,
          full_name = EXCLUDED.full_name,
          phone = EXCLUDED.phone,
          location = EXCLUDED.location,
          role = EXCLUDED.role,
          status = EXCLUDED.status,
          updated_at = NOW()
        RETURNING id
      `,
      [
        ADMIN_SEED.email,
        passwordHash,
        ADMIN_SEED.fullName,
        ADMIN_SEED.phone,
        ADMIN_SEED.location,
        'admin',
        'active',
      ],
    )

    const adminId = adminResult.rows[0]?.id
    if (adminId) {
      console.log(`✅ Admin user ready (id: ${adminId})`)
    }

    for (const company of COMPANY_SEED) {
      await pool.query(
        `
          INSERT INTO companies (
            name, slug, description, category, subcategory, email, phone, website, address,
            city, region, country, latitude, longitude, established_year, employee_count,
            is_verified, is_featured, is_premium, status, rating, review_count, view_count,
            logo_url, cover_image_url
          )
          VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9,
            $10, $11, $12, $13, $14, $15, $16,
            $17, $18, $19, $20, $21, $22, $23,
            $24, $25
          )
          ON CONFLICT (slug)
          DO UPDATE SET
            description = EXCLUDED.description,
            category = EXCLUDED.category,
            subcategory = EXCLUDED.subcategory,
            email = EXCLUDED.email,
            phone = EXCLUDED.phone,
            website = EXCLUDED.website,
            address = EXCLUDED.address,
            city = EXCLUDED.city,
            region = EXCLUDED.region,
            country = EXCLUDED.country,
            latitude = EXCLUDED.latitude,
            longitude = EXCLUDED.longitude,
            established_year = EXCLUDED.established_year,
            employee_count = EXCLUDED.employee_count,
            is_verified = EXCLUDED.is_verified,
            is_featured = EXCLUDED.is_featured,
            is_premium = EXCLUDED.is_premium,
            status = EXCLUDED.status,
            rating = EXCLUDED.rating,
            review_count = EXCLUDED.review_count,
            view_count = EXCLUDED.view_count,
            logo_url = EXCLUDED.logo_url,
            cover_image_url = EXCLUDED.cover_image_url,
            updated_at = NOW()
        `,
        [
          company.name,
          company.slug,
          company.description ?? null,
          company.category,
          company.subcategory ?? null,
          company.email ?? null,
          company.phone ?? null,
          company.website ?? null,
          company.address ?? null,
          company.city ?? null,
          company.region ?? null,
          company.country ?? 'Ethiopia',
          company.latitude ?? null,
          company.longitude ?? null,
          company.established_year ?? null,
          company.employee_count ?? null,
          company.is_verified ?? false,
          company.is_featured ?? false,
          company.is_premium ?? false,
          company.status ?? 'active',
          company.rating ?? 0,
          company.review_count ?? 0,
          company.view_count ?? 0,
          company.logo_url ?? null,
          company.cover_image_url ?? null,
        ],
      )
    }

    console.log(`✅ Seeded ${COMPANY_SEED.length} companies`)
  } finally {
    await pool.end()
  }
}

async function main() {
  console.log('🚀 Starting database seeding...')

  if (process.env.DATABASE_URL) {
    await seedPostgres()
  } else {
    await seedJsonStore()
  }

  console.log('\n✨ Seeding completed!')
  console.log('\n📋 Admin Credentials:')
  console.log(`Email: ${ADMIN_SEED.email}`)
  console.log(`Password: ${ADMIN_SEED.password}`)
  console.log('\n🔗 Access the application at http://localhost:3000')
}

main().catch((error) => {
  console.error('❌ Error during seeding:', error)
  process.exit(1)
})
