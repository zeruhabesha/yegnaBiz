#!/usr/bin/env node

/**
 * Fix JSON Files Script
 * Ensures all data files contain valid JSON arrays
 */

import { writeFileSync } from 'fs'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'data')

// List of all data files that need to be empty arrays
const dataFiles = [
  'admin-companies.json',
  'admin-promotions.json',
  'business-hours.json',
  'companies.json',
  'promotions.json',
  'reviews.json',
  'social-links.json'
]

// Fix each file
dataFiles.forEach(file => {
  const filePath = join(DATA_DIR, file)
  try {
    writeFileSync(filePath, '[]', 'utf8')
    console.log(`✅ Fixed ${file}`)
  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error)
  }
})

console.log('✨ All JSON files fixed!')
console.log('All files now contain valid empty JSON arrays.')
