#!/usr/bin/env node

/**
 * Database Seeding Script
 * Seeds initial data for development and testing
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import bcrypt from 'bcryptjs'

const DATA_DIR = join(process.cwd(), 'data')
const USERS_FILE = join(DATA_DIR, 'admin-users.json')
const COMPANIES_FILE = join(DATA_DIR, 'admin-companies.json')

function ensureDirectory() {
  try {
    mkdirSync(DATA_DIR, { recursive: true })
  } catch (error) {
    // Directory might already exist, that's okay
  }
}

async function readJsonFile(filename) {
  ensureDirectory()
  try {
    const raw = readFileSync(filename, 'utf8')
    return JSON.parse(raw)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function writeJsonFile(filename, data) {
  ensureDirectory()
  writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8')
}

async function seedUsers() {
  console.log('🌱 Seeding users...')

  try {
    // Check if users already exist
    const existingUsers = await readJsonFile(USERS_FILE)
    if (existingUsers.length > 0) {
      console.log('✅ Users already exist, skipping...')
      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const adminUser = {
      id: 1,
      full_name: 'Admin User',
      email: 'admin@yegnabiz.com',
      password_hash: hashedPassword,
      role: 'admin',
      status: 'active',
      phone: '+251911111111',
      location: 'Addis Ababa, Ethiopia',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Create regular user
    const hashedPassword2 = await bcrypt.hash('user123', 10)
    const regularUser = {
      id: 2,
      full_name: 'Demo User',
      email: 'user@yegnabiz.com',
      password_hash: hashedPassword2,
      role: 'user',
      status: 'active',
      phone: '+251922222222',
      location: 'Addis Ababa, Ethiopia',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    await writeJsonFile(USERS_FILE, [adminUser, regularUser])
    console.log('✅ Users seeded successfully')
  } catch (error) {
    console.error('❌ Error seeding users:', error)
  }
}

async function seedCompanies() {
  console.log('🌱 Seeding companies...')

  try {
    // Check if companies already exist
    const existingCompanies = await readJsonFile(COMPANIES_FILE)
    if (existingCompanies.length > 0) {
      console.log('✅ Companies already exist, skipping...')
      return
    }

    // Create sample companies
    const companies = [
      {
        id: 1,
        name: 'Ethio Telecom',
        slug: 'ethio-telecom',
        description: 'Leading telecommunications company in Ethiopia providing mobile, internet, and digital services.',
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 3,
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
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ]

    await writeJsonFile(COMPANIES_FILE, companies)
    console.log('✅ Companies seeded successfully')
  } catch (error) {
    console.error('❌ Error seeding companies:', error)
  }
}

async function main() {
  console.log('🚀 Starting database seeding...')

  await seedUsers()
  await seedCompanies()

  console.log('✨ Seeding completed!')
  console.log('')
  console.log('📋 Test Credentials:')
  console.log('Admin: admin@yegnabiz.com / admin123')
  console.log('User:  user@yegnabiz.com / user123')
  console.log('')
  console.log('🔗 Access the application at http://localhost:3000')
}

main().catch(console.error)
