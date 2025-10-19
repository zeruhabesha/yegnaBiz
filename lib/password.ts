import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'

const SALT_BYTES = 16

export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_BYTES).toString('hex')
  const digest = createHash('sha256').update(salt + password).digest('hex')
  return `${salt}:${digest}`
}

export function verifyPassword(password: string, hashedValue: string): boolean {
  const [salt, storedDigest] = hashedValue.split(':')
  if (!salt || !storedDigest) {
    return false
  }

  const computed = createHash('sha256').update(salt + password).digest('hex')
  try {
    return timingSafeEqual(Buffer.from(storedDigest, 'hex'), Buffer.from(computed, 'hex'))
  } catch {
    return storedDigest === computed
  }
}
