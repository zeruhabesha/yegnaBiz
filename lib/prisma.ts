import * as PrismaPkg from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: any | undefined
}

const PrismaClient = (PrismaPkg as any).PrismaClient

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
