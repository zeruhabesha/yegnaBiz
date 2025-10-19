"use client"

import { useEffect, useState } from "react"
import { Building2, Star, Eye, TrendingUp } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalViews: 0,
    totalReviews: 0,
    averageRating: 0,
  })
  const [activity, setActivity] = useState<Array<{ title: string; description: string; timestamp: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchOverview() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/dashboard/overview", { signal: controller.signal })
        if (!response.ok) {
          throw new Error("Failed to load dashboard data")
        }
        const json = await response.json()
        if (!json.success) {
          throw new Error(json.error || "Failed to load dashboard data")
        }

        setStats(json.data.stats)
        setActivity(json.data.activity)
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          console.error(err)
          setError(err instanceof Error ? err.message : "Failed to load dashboard data")
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
      title: "My Companies",
      value: stats.totalCompanies.toLocaleString(),
      description: "Active listings",
      icon: Building2,
      href: "/dashboard/companies",
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      description: "Across your listings",
      icon: Eye,
      href: "/dashboard/companies",
    },
    {
      title: "Reviews Received",
      value: stats.totalReviews.toLocaleString(),
      description: "Latest feedback",
      icon: Star,
      href: "/dashboard/reviews",
    },
    {
      title: "Average Rating",
      value: stats.averageRating ? stats.averageRating.toFixed(1) : "0.0",
      description: "Across your listings",
      icon: TrendingUp,
      href: "/dashboard/reviews",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.fullName}!</h1>
        <p className="text-muted-foreground">Here's an overview of your business listings</p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive bg-destructive/10 px-4 py-3 text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">
                    {loading ? <span className="h-8 w-24 rounded bg-muted animate-pulse block" /> : stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your business presence on YegnaBiz</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/add-business">Add New Business</Link>
          </Button>
          <Button variant="outline" asChild className="bg-transparent">
            <Link href="/dashboard/companies">View My Companies</Link>
          </Button>
          <Button variant="outline" asChild className="bg-transparent">
            <Link href="/dashboard/settings">Account Settings</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest business updates and interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-48 rounded bg-muted animate-pulse" />
                      <div className="h-3 w-64 rounded bg-muted animate-pulse" />
                      <div className="h-3 w-32 rounded bg-muted animate-pulse" />
                    </div>
                  </div>
                ))
              : activity.map((item) => (
                  <div key={item.title + item.timestamp} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                    </div>
                  </div>
                ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
