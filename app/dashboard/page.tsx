"use client"

import { Building2, Star, Eye, TrendingUp } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()

  const stats = [
    {
      title: "My Companies",
      value: "2",
      description: "Active listings",
      icon: Building2,
      href: "/dashboard/companies",
    },
    {
      title: "Total Views",
      value: "1,234",
      description: "Last 30 days",
      icon: Eye,
      href: "/dashboard/companies",
    },
    {
      title: "Reviews Received",
      value: "45",
      description: "Average 4.5 stars",
      icon: Star,
      href: "/dashboard/reviews",
    },
    {
      title: "Growth",
      value: "+12%",
      description: "vs last month",
      icon: TrendingUp,
      href: "/dashboard/companies",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.fullName}!</h1>
        <p className="text-muted-foreground">Here's an overview of your business listings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
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
            <div className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">New review received</p>
                <p className="text-sm text-muted-foreground">Someone left a 5-star review on Yoha Construction</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">Profile views increased</p>
                <p className="text-sm text-muted-foreground">Your listings received 156 views this week</p>
                <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">Listing updated</p>
                <p className="text-sm text-muted-foreground">You updated Sheba Leather's business hours</p>
                <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
