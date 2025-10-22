#!/usr/bin/env node

/**
 * Database Setup Script for YegnaBiz
 *
 * This script helps set up the database for deployment on Vercel with Prisma
 *
 * Usage:
 *   npm run setup:db          # Generate client and create migration
 *   npm run setup:db:prod     # For production deployment
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const isProduction = process.argv.includes('--prod') || process.argv.includes('--production')

console.log('🚀 Setting up YegnaBiz database...')

try {
  // Check if .env exists
  const envPath = path.join(process.cwd(), '.env')
  if (!fs.existsSync(envPath)) {
    console.log('⚠️  .env file not found. Please copy from .env.example and configure your DATABASE_URL')
    process.exit(1)
  }

  // Check DATABASE_URL
  const envContent = fs.readFileSync(envPath, 'utf8')
  if (!envContent.includes('DATABASE_URL')) {
    console.log('⚠️  DATABASE_URL not found in .env file. Please add your database connection string.')
    console.log('📝 For Prisma Accelerate: DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=your_api_key"')
    console.log('📝 For standard PostgreSQL: DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"')
    process.exit(1)
  }

  console.log('✅ Environment configuration found')

  // Generate Prisma client
  console.log('📦 Generating Prisma client...')
  execSync('npx prisma generate', { stdio: 'inherit' })

  // Create migration
  console.log('🗄️  Creating database migration...')
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' })

  if (isProduction) {
    console.log('🔄 Deploying to production...')
    execSync('npx prisma migrate deploy', { stdio: 'inherit' })
  }

  console.log('✅ Database setup completed successfully!')
  console.log('')
  console.log('🎉 Your YegnaBiz application is ready for deployment!')
  console.log('')
  console.log('Next steps:')
  console.log('1. Push your code to Vercel')
  console.log('2. Set environment variables in Vercel dashboard')
  console.log('3. The database will be automatically created on first deployment')

} catch (error) {
  console.error('❌ Setup failed:', error.message)
  console.log('')
  console.log('Troubleshooting:')
  console.log('- Make sure your DATABASE_URL is correct')
  console.log('- Check your internet connection for Prisma Accelerate')
  console.log('- Run: npm run setup:db --force to reset')
  process.exit(1)
}
