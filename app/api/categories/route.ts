import { NextResponse } from "next/server"
import { getCategoryCounts } from "@/lib/data/companies"

export async function GET() {
  try {
    const categories = await getCategoryCounts()
    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error("Error loading categories:", error)
    return NextResponse.json({ success: false, error: "Failed to load categories" }, { status: 500 })
  }
}
