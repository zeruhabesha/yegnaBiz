import { NextResponse } from "next/server"
import { getOwnerDashboardData } from "@/lib/data/dashboard"

export async function GET() {
  try {
    const data = await getOwnerDashboardData()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error loading dashboard overview:", error)
    return NextResponse.json({ success: false, error: "Failed to load dashboard overview" }, { status: 500 })
  }
}
