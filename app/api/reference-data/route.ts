import { NextResponse } from "next/server"
import { getAllCompanies } from "@/lib/data/companies"

export async function GET() {
  try {
    const companies = await getAllCompanies()
    const categories = Array.from(new Set(companies.map((company) => company.category))).sort()
    const cities = Array.from(
      new Set(companies.map((company) => company.city).filter((city): city is string => Boolean(city))),
    ).sort()

    return NextResponse.json({ success: true, data: { categories, cities } })
  } catch (error) {
    console.error("Error loading reference data:", error)
    return NextResponse.json({ success: false, error: "Failed to load reference data" }, { status: 500 })
  }
}
