const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

async function addUserStatusColumn() {
  // Try to load DATABASE_URL from .env file
  let databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    try {
      const envPath = path.join(process.cwd(), '.env')
      const envContent = fs.readFileSync(envPath, 'utf8')
      const match = envContent.match(/DATABASE_URL="([^"]+)"/) || envContent.match(/DATABASE_URL='([^']+)'/) || envContent.match(/DATABASE_URL=([^\s\n]+)/)
      if (match) {
        databaseUrl = match[1]
      }
    } catch (error) {
      console.error('Could not read .env file:', error.message)
    }
  }

  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable not found')
    console.log('Please set your DATABASE_URL in the .env file')
    process.exit(1)
  }

  const client = new Client({
    connectionString: databaseUrl,
  })

  try {
    await client.connect()
    console.log('Connected to database')

    // Check if status column already exists
    const checkResult = await client.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'users' AND column_name = 'status'
    `)

    if (checkResult.rows.length > 0) {
      console.log('Status column already exists')
      return
    }

    // Add status column
    await client.query(`
      ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active'
    `)
    console.log('Added status column to users table')

    // Update existing users to have active status
    await client.query(`
      UPDATE users SET status = 'active' WHERE status IS NULL
    `)
    console.log('Updated existing users with active status')

    console.log('Successfully added user status column!')

  } catch (error) {
    console.error('Error adding status column:', error)
  } finally {
    await client.end()
  }
}

addUserStatusColumn()
