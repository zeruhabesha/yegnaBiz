#!/usr/bin/env node

/**
 * Database Seeding Script
 * Seeds initial data for development and testing
 */

import { createAdminUser } from '../lib/data/users.ts'
import { createAdminCompany } from '../lib/data/companies.ts'
import { readJsonFile, writeJsonFile } from '../lib/data/json-store.ts'

const USERS_FILE = 'admin-users.json'
const COMPANIES_FILE = 'admin-companies.json'

async function seedUsers() {
  console.log('🌱 Seeding users...')

  try {
    // Check if users already exist
    const existingUsers = await readJsonFile(USERS_FILE).catch(() => [])
    if (existingUsers.length > 0) {
      console.log('✅ Users already exist, skipping...')
      return
    }

    // Create ONLY admin user
    await createAdminUser({
      full_name: 'Admin User',
      email: 'admin@yegnabiz.com',
      password: 'admin123',
      role: 'admin',
      phone: '+251911111111',
      location: 'Addis Ababa, Ethiopia'
    })

    console.log('✅ Admin user seeded successfully')
  } catch (error) {
    console.error('❌ Error seeding users:', error)
  }
}

async function seedCompanies() {
  console.log('🌱 Seeding companies...')

  try {
    // Check if companies already exist
    const existingCompanies = await readJsonFile(COMPANIES_FILE).catch(() => [])
    if (existingCompanies.length > 0) {
      console.log('✅ Companies already exist, skipping...')
      return
    }

    // Create sample companies
    await createAdminCompany({
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
      view_count: 50000
    })

    await createAdminCompany({
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
      view_count: 25000
    })

    await createAdminCompany({
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
      view_count: 100000
    })

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
  console.log('📋 Admin Credentials:')
  console.log('Admin: admin@yegnabiz.com / admin123')
  console.log('')
  console.log('🔗 Access the application at http://localhost:3000')
}

main().catch(console.error)
