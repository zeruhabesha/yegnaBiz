import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "@/components/icons"

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Analytics</h2>
        <p className="text-muted-foreground">Platform insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">124.5K</div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span>+23%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">45.2K</div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span>+18%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">234</div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span>+12%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">892</div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span>+8%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Most popular business categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Retail", count: 421, percentage: 16.5 },
                { name: "Food & Beverage", count: 312, percentage: 12.3 },
                { name: "Healthcare", count: 267, percentage: 10.5 },
                { name: "Finance", count: 234, percentage: 9.2 },
                { name: "Hospitality", count: 203, percentage: 8.0 },
              ].map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-muted-foreground">
                      {category.count} ({category.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${category.percentage * 6}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Cities</CardTitle>
            <CardDescription>Business distribution by location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Addis Ababa", count: 1842, percentage: 72.4 },
                { name: "Dire Dawa", count: 234, percentage: 9.2 },
                { name: "Mekelle", count: 156, percentage: 6.1 },
                { name: "Bahir Dar", count: 134, percentage: 5.3 },
                { name: "Hawassa", count: 89, percentage: 3.5 },
              ].map((city) => (
                <div key={city.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{city.name}</span>
                    <span className="text-muted-foreground">
                      {city.count} ({city.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${city.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
