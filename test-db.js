#!/usr/bin/env node

/**
 * Database Connection Test
 * Tests the Prisma database connection and basic operations
 */

const { PrismaClient } = require('@prisma/client/edge')

async function testDatabase() {
  console.log('🧪 Testing database connection...')

  let prisma
  try {
    // Test with standard client first
    const { PrismaClient: StandardPrisma } = require('@prisma/client')
    prisma = new StandardPrisma()

    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')

    // Test user operations
    const userCount = await prisma.user.count()
    console.log(`📊 Current user count: ${userCount}`)

    // Test creating a test user (only if no users exist)
    if (userCount === 0) {
      console.log('👤 Creating test user...')
      const testUser = await prisma.user.create({
        data: {
          fullName: 'Test User',
          email: 'test@example.com',
          password: 'hashedpassword123',
          role: 'user',
          status: 'active'
        }
      })
      console.log(`✅ Test user created with ID: ${testUser.id}`)

      // Clean up test user
      await prisma.user.delete({
        where: { id: testUser.id }
      })
      console.log('🧹 Test user cleaned up')
    }

    console.log('✅ All database tests passed!')

  } catch (error) {
    console.error('❌ Database test failed:', error.message)

    if (error.message.includes('P1001')) {
      console.log('💡 This might be a connection issue. Check your DATABASE_URL')
    }

    if (error.message.includes('P2002')) {
      console.log('💡 Unique constraint violation - this is expected if tables already exist')
    }

  } finally {
    if (prisma) {
      await prisma.$disconnect()
      console.log('🔌 Database disconnected')
    }
  }
}

testDatabase()
