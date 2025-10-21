import { Pool, type PoolConfig } from 'pg'

let cachedPool: Pool | null = null

function resolveSslConfig(connectionString: string | undefined) {
  const flag = process.env.DATABASE_SSL?.toLowerCase()
  if (!connectionString) {
    return undefined
  }

  const shouldUseSsl =
    flag === 'true' || (flag === undefined && connectionString.includes('sslmode=require'))

  if (!shouldUseSsl) {
    return undefined
  }

  const rejectUnauthorized = process.env.DATABASE_SSL_REJECT_UNAUTHORIZED?.toLowerCase() !== 'false'
  return { rejectUnauthorized }
}

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Configure it to enable database persistence.')
  }

  const config: PoolConfig = {
    connectionString,
    max: Number(process.env.DATABASE_POOL_MAX ?? 10),
  }

  const ssl = resolveSslConfig(connectionString)
  if (ssl) {
    config.ssl = ssl
  }

  const pool = new Pool(config)

  pool.on('error', (error) => {
    console.error('[database] unexpected error on idle client', error)
  })

  return pool
}

export function isDatabaseEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL)
}

export function getPool(): Pool {
  if (!cachedPool) {
    cachedPool = createPool()
  }

  return cachedPool
}

export async function dbQuery<T = any>(text: string, params: any[] = []) {
  const pool = getPool()
  return pool.query<T>(text, params)
}

export async function closePool() {
  if (cachedPool) {
    await cachedPool.end()
    cachedPool = null
  }
}
