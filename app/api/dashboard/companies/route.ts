import { NextResponse } from "next/server"
import { getOwnerCompanies } from "@/lib/data/dashboard"

export async function GET() {
  try {
    const companies = await getOwnerCompanies()
    return NextResponse.json({ success: true, data: companies })
  } catch (error) {
    console.error("Error loading owner companies:", error)
    return NextResponse.json({ success: false, error: "Failed to load companies" }, { status: 500 })
  }
}
