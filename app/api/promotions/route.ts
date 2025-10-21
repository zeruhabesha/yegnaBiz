import { NextResponse } from 'next/server'
import { listPublicPromotions } from '@/lib/data/promotions'

let prisma: any = null
if (process.env.DATABASE_URL) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path')
    const prismaPath = path.join(process.cwd(), 'lib', 'prisma.cjs')
    prisma = require(prismaPath).prisma
  } catch (e) {
    prisma = null
  }
}

export async function GET() {
  try {
    let promotions
    if (prisma) {
      promotions = await prisma.promotion.findMany({ orderBy: { createdAt: 'desc' } })
    } else {
      promotions = await listPublicPromotions()
    }
    return NextResponse.json({ success: true, data: promotions })
  } catch (error) {
    console.error('Error fetching promotions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch promotions' },
      { status: 500 },
    )
  }
}
