import { writeFileSync } from 'fs'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'data')

// Clear all data files
const filesToClear = [
  'admin-companies.json',
  'reviews.json',
  'promotions.json',
  'business-hours.json',
  'social-links.json'
]

filesToClear.forEach(file => {
  const filePath = join(DATA_DIR, file)
  writeFileSync(filePath, '[]', 'utf8')
  console.log(`✅ Cleared ${file}`)
})

console.log('✨ All static data cleared!')
console.log('Only admin user remains in the database.')
