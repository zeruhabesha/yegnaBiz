"use client"

import { useEffect, useState } from "react"
import { Building2, Users, Star, TrendingUp, Eye, AlertCircle } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalUsers: 0,
    totalReviews: 0,
    totalViews: 0,
    verifiedCompanies: 0,
    premiumCompanies: 0,
    averageRating: 0,
  })
  const [pendingCounts, setPendingCounts] = useState({
    pendingVerification: 0,
    flaggedReviews: 0,
    recentRegistrations: 0,
  })
  const [recentActivity, setRecentActivity] = useState<Array<{ action: string; entity: string; timeAgo: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchOverview() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/admin/overview", { signal: controller.signal })
        if (!response.ok) {
          throw new Error("Failed to load admin overview")
        }
        const json = await response.json()
        if (!json.success) {
          throw new Error(json.error || "Failed to load admin overview")
        }

        setStats(json.data.stats)
        setPendingCounts(json.data.pendingActions)
        setRecentActivity(json.data.recentActivity)
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          console.error(err)
          setError(err instanceof Error ? err.message : "Failed to load admin overview")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchOverview()

    return () => controller.abort()
  }, [])

  const statCards = [
    {
      title: "Total Companies",
      value: stats.totalCompanies.toLocaleString(),
      change: `${stats.verifiedCompanies.toLocaleString()} verified`,
      icon: Building2,
    },
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: `${pendingCounts.recentRegistrations.toLocaleString()} joined this week`,
      icon: Users,
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews.toLocaleString(),
      change: `${pendingCounts.flaggedReviews.toLocaleString()} flagged`,
      icon: Star,
    },
    {
      title: "Monthly Views",
      value: stats.totalViews.toLocaleString(),
      change: `${stats.premiumCompanies.toLocaleString()} premium listings`,
      icon: Eye,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Monitor platform activity and performance</p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive bg-destructive/10 px-4 py-3 text-destructive">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">
                  {loading ? <span className="h-8 w-20 rounded bg-muted animate-pulse block" /> : stat.value}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Company Verification</p>
                    <p className="text-sm text-muted-foreground">Companies awaiting verification</p>
                  </div>
                </div>
                <Badge variant="secondary">{pendingCounts.pendingVerification}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Flagged Reviews</p>
                    <p className="text-sm text-muted-foreground">Reviews flagged for moderation</p>
                  </div>
                </div>
                <Badge variant="secondary">{pendingCounts.flaggedReviews}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Recent Registrations</p>
                    <p className="text-sm text-muted-foreground">Users registered this week</p>
                  </div>
                </div>
                <Badge variant="secondary">{pendingCounts.recentRegistrations}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div className="h-2 w-2 rounded-full bg-muted mt-2 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                        <div className="h-3 w-40 bg-muted animate-pulse rounded" />
                        <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                      </div>
                    </div>
                  ))
                : recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground truncate">{activity.entity}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.timeAgo}</p>
                      </div>
                    </div>
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Statistics</CardTitle>
          <CardDescription>Key metrics and performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Companies</p>
              <p className="text-2xl font-bold">
                {loading ? <span className="h-6 w-12 rounded bg-muted animate-pulse block" /> : stats.totalCompanies}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Verified Companies</p>
              <p className="text-2xl font-bold">
                {loading ? <span className="h-6 w-12 rounded bg-muted animate-pulse block" /> : stats.verifiedCompanies}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Premium Members</p>
              <p className="text-2xl font-bold">
                {loading ? <span className="h-6 w-12 rounded bg-muted animate-pulse block" /> : stats.premiumCompanies}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Rating</p>
              <p className="text-2xl font-bold">
                {loading ? <span className="h-6 w-16 rounded bg-muted animate-pulse block" /> : stats.averageRating.toFixed(1)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
