import { formatDistanceToNow } from "date-fns"
import { getAllCompanies, getAllReviews, getCompanyStats, listAdminCompanies } from "@/lib/data/companies"
import { listAdminUsers } from "@/lib/data/users"
import type { Company } from "@/lib/types/company"
import type { AdminCompany } from "@/lib/types/admin"

function selectOwnedCompanies(companies: Company[]): Company[] {
  const premiumCompanies = companies.filter((company) => company.isPremium)
  if (premiumCompanies.length > 0) {
    return premiumCompanies
  }
  return companies.slice(0, Math.min(5, companies.length))
}

function createActivityFromCompanies(companies: Company[]): Array<{ title: string; description: string; timestamp: string }> {
  return companies
    .slice()
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 4)
    .map((company) => ({
      title: `${company.name} performance`,
      description: `${company.viewCount.toLocaleString()} views • ${company.reviewCount.toLocaleString()} reviews`,
      timestamp: "Recently updated",
    }))
}

export async function getOwnerDashboardData() {
  const companies = await getAllCompanies()
  const reviews = await getAllReviews()
  const ownedCompanies = selectOwnedCompanies(companies)
  const ownedCompanyIds = new Set(ownedCompanies.map((company) => company.id))

  const totalViews = ownedCompanies.reduce((sum, company) => sum + company.viewCount, 0)
  const totalReviews = ownedCompanies.reduce((sum, company) => sum + company.reviewCount, 0)
  const averageRating = ownedCompanies.length
    ? ownedCompanies.reduce((sum, company) => sum + company.rating, 0) / ownedCompanies.length
    : 0

  const recentReviews = reviews
    .filter((review) => ownedCompanyIds.has(review.companyId))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map((review) => ({
      id: review.id,
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
      companyId: review.companyId,
      createdAt: review.createdAt,
      isVerified: review.isVerified,
    }))

  return {
    stats: {
      totalCompanies: ownedCompanies.length,
      totalViews,
      totalReviews,
      averageRating,
    },
    activity: createActivityFromCompanies(ownedCompanies),
    recentReviews,
  }
}

export async function getOwnerCompanies() {
  const companies = await getAllCompanies()
  return selectOwnedCompanies(companies)
}

export async function getOwnerReviews() {
  const companies = await getAllCompanies()
  const reviews = await getAllReviews()
  const ownedCompanies = selectOwnedCompanies(companies)
  const companyMap = new Map(ownedCompanies.map((company) => [company.id, company.name]))

  return reviews
    .filter((review) => companyMap.has(review.companyId))
    .map((review) => ({
      ...review,
      companyName: companyMap.get(review.companyId) ?? "",
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

function toRecentActivityEntry(company: AdminCompany) {
  const timeAgo = formatDistanceToNow(new Date(company.updated_at), { addSuffix: true })
  const action = company.status === "pending" ? "Awaiting moderation" : "Listing updated"
  return {
    action,
    entity: company.name,
    timeAgo,
  }
}

export async function getAdminDashboardData() {
  const adminCompanies = await listAdminCompanies({})
  const users = await listAdminUsers({})
  const reviews = await getAllReviews()
  const companyStats = await getCompanyStats()

  const totalViews = adminCompanies.reduce((sum, company) => sum + company.view_count, 0)
  const pendingVerification = adminCompanies.filter((company) => company.status === "pending").length
  const flaggedReviews = reviews.filter((review) => !review.isVerified).length
  const recentRegistrations = users.filter((user) => {
    const createdAt = new Date(user.created_at)
    const daysDifference = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
    return daysDifference <= 7
  }).length

  const averageRating = adminCompanies.length
    ? adminCompanies.reduce((sum, company) => sum + company.rating, 0) / adminCompanies.length
    : 0

  const recentActivity = adminCompanies
    .slice()
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 6)
    .map(toRecentActivityEntry)

  return {
    stats: {
      totalCompanies: adminCompanies.length,
      totalUsers: users.length,
      totalReviews: reviews.length,
      totalViews,
      verifiedCompanies: companyStats.verified,
      premiumCompanies: companyStats.premium,
      averageRating,
    },
    pendingActions: {
      pendingVerification,
      flaggedReviews,
      recentRegistrations,
    },
    recentActivity,
  }
}
