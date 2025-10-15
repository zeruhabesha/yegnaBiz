"use client"

import { Building2, Users, Star, TrendingUp, Eye, AlertCircle } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Companies",
      value: "2,543",
      change: "+12%",
      icon: Building2,
      trend: "up",
    },
    {
      title: "Total Users",
      value: "8,921",
      change: "+8%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Total Reviews",
      value: "15,432",
      change: "+15%",
      icon: Star,
      trend: "up",
    },
    {
      title: "Monthly Views",
      value: "124.5K",
      change: "+23%",
      icon: Eye,
      trend: "up",
    },
  ]

  const pendingActions = [
    {
      type: "Company Verification",
      count: 12,
      description: "Companies awaiting verification",
      icon: Building2,
      color: "text-blue-500",
    },
    {
      type: "Reported Reviews",
      count: 5,
      description: "Reviews flagged for moderation",
      icon: AlertCircle,
      color: "text-yellow-500",
    },
    {
      type: "New Registrations",
      count: 28,
      description: "Users registered today",
      icon: Users,
      color: "text-green-500",
    },
  ]

  const recentActivity = [
    {
      action: "New company registered",
      company: "Tech Solutions Ethiopia",
      time: "5 minutes ago",
    },
    {
      action: "Company verified",
      company: "Addis Ababa Hotel",
      time: "1 hour ago",
    },
    {
      action: "Review reported",
      company: "ABC Construction",
      time: "2 hours ago",
    },
    {
      action: "User account created",
      company: "john.doe@example.com",
      time: "3 hours ago",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Monitor platform activity and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">{stat.change}</span>
                  <span className="text-muted-foreground">vs last month</span>
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
              {pendingActions.map((action) => {
                const Icon = action.icon
                return (
                  <div key={action.type} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${action.color}`} />
                      <div>
                        <p className="font-medium">{action.type}</p>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{action.count}</Badge>
                  </div>
                )
              })}
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
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
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
              <p className="text-2xl font-bold">2,431</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Verified Companies</p>
              <p className="text-2xl font-bold">1,892</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Premium Members</p>
              <p className="text-2xl font-bold">456</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Rating</p>
              <p className="text-2xl font-bold">4.2</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
