"use client"

import Link from "next/link"
import { Plus, Eye, Star, Edit, Trash2, Building2 } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function MyCompaniesPage() {
  // Mock data - in production, this would come from an API
  const myCompanies = [
    {
      id: 7,
      name: "Yoha Construction",
      slug: "yoha-construction",
      category: "Construction",
      status: "active",
      views: 4320,
      rating: 4.2,
      reviewCount: 156,
      isPremium: false,
    },
    {
      id: 8,
      name: "Sheba Leather",
      slug: "sheba-leather",
      category: "Manufacturing",
      status: "active",
      views: 6540,
      rating: 4.3,
      reviewCount: 287,
      isPremium: false,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Companies</h1>
          <p className="text-muted-foreground">Manage your business listings</p>
        </div>
        <Button asChild>
          <Link href="/add-business">
            <Plus className="mr-2 h-4 w-4" />
            Add Business
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {myCompanies.map((company) => (
          <Card key={company.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{company.name}</CardTitle>
                    <Badge variant={company.status === "active" ? "default" : "secondary"}>{company.status}</Badge>
                    {company.isPremium && <Badge variant="secondary">Premium</Badge>}
                  </div>
                  <CardDescription>{company.category}</CardDescription>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/edit-business/${company.slug}`}>Edit Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/company/${company.slug}`}>View Public Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Views</p>
                    <p className="font-semibold">{company.views.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="font-semibold">{company.rating.toFixed(1)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                    <p className="font-semibold">{company.reviewCount}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t">
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href={`/edit-business/${company.slug}`}>Edit Listing</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href={`/company/${company.slug}`}>View Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {myCompanies.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No companies yet</h3>
            <p className="text-muted-foreground mb-6">Start by adding your first business listing</p>
            <Button asChild>
              <Link href="/add-business">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Business
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
