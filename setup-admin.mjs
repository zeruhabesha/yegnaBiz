#!/usr/bin/env node

/**
 * Fresh Admin Setup Script
 * Creates a clean admin user in an empty database
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import bcrypt from 'bcryptjs'

const DATA_DIR = join(process.cwd(), 'data')
const USERS_FILE = join(DATA_DIR, 'admin-users.json')

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

async function createFreshAdmin() {
  console.log('🧹 Clearing existing data and setting up fresh admin...')

  try {
    // Create fresh admin user
    const hashedPassword = await bcrypt.hash('admin2024', 10)

    const adminUser = {
      id: 1,
      full_name: 'System Administrator',
      email: 'admin@yegnabiz.com',
      password_hash: hashedPassword,
      role: 'admin',
      status: 'active',
      phone: '+251911111111',
      location: 'Addis Ababa, Ethiopia',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Save fresh admin user
    await writeJsonFile(USERS_FILE, [adminUser])

    console.log('✅ Fresh admin credentials created successfully!')
    console.log('')
    console.log('📋 Fresh Admin Credentials:')
    console.log('Email: admin@yegnabiz.com')
    console.log('Password: admin2024')
    console.log('Role: admin')
    console.log('ID: 1')
    console.log('')
    console.log('🔗 You can now log in to the admin panel')
    console.log('📁 All previous data has been cleared')

  } catch (error) {
    console.error('❌ Error creating fresh admin credentials:', error)
    process.exit(1)
  }
}

async function main() {
  console.log('🚀 YegnaBiz Fresh Admin Setup')
  console.log('============================')
  console.log('')

  await createFreshAdmin()

  console.log('')
  console.log('✨ Fresh setup completed!')
  console.log('Clean database with only admin user.')
  console.log('You can now start the development server with: npm run dev')
}

main().catch(console.error)
