import { NextResponse } from "next/server"
import { getOwnerReviews } from "@/lib/data/dashboard"

export async function GET() {
  try {
    const reviews = await getOwnerReviews()
    return NextResponse.json({ success: true, data: reviews })
  } catch (error) {
    console.error("Error loading owner reviews:", error)
    return NextResponse.json({ success: false, error: "Failed to load reviews" }, { status: 500 })
  }
}
