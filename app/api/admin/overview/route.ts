import { NextResponse } from "next/server"
import { getAdminDashboardData } from "@/lib/data/dashboard"

export async function GET() {
  try {
    const data = await getAdminDashboardData()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error loading admin overview:", error)
    return NextResponse.json({ success: false, error: "Failed to load admin overview" }, { status: 500 })
  }
}
