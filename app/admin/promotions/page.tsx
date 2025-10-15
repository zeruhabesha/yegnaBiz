"use client"

import { useState } from "react"
import { Search, Filter, MoreVertical, Plus, Edit, Trash2, Eye, Calendar, TrendingUp } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock promotional campaigns data
const promotions = [
  {
    id: 1,
    title: "New Year Special Offers",
    description: "Special discounts for the new year celebration across all categories",
    type: "banner",
    status: "active",
    startDate: "2024-12-25",
    endDate: "2025-01-15",
    targetAudience: "all_users",
    clicks: 15420,
    conversions: 2340,
    budget: 50000,
    spent: 35000,
    createdAt: "2024-12-20",
    isVisible: true,
  },
  {
    id: 2,
    title: "Restaurant Week Promotion",
    description: "Highlighting top restaurants with exclusive deals",
    type: "popup",
    status: "active",
    startDate: "2024-12-15",
    endDate: "2024-12-22",
    targetAudience: "food_lovers",
    clicks: 8750,
    conversions: 1200,
    budget: 25000,
    spent: 22000,
    createdAt: "2024-12-10",
    isVisible: true,
  },
  {
    id: 3,
    title: "Holiday Shopping Guide",
    description: "Featured shopping destinations for holiday season",
    type: "banner",
    status: "scheduled",
    startDate: "2024-12-20",
    endDate: "2025-01-05",
    targetAudience: "shoppers",
    clicks: 0,
    conversions: 0,
    budget: 30000,
    spent: 0,
    createdAt: "2024-12-18",
    isVisible: false,
  },
  {
    id: 4,
    title: "Business Excellence Awards",
    description: "Promoting award-winning businesses",
    type: "featured",
    status: "completed",
    startDate: "2024-11-01",
    endDate: "2024-11-30",
    targetAudience: "premium_users",
    clicks: 25600,
    conversions: 4100,
    budget: 75000,
    spent: 75000,
    createdAt: "2024-10-25",
    isVisible: false,
  },
]

export default function AdminPromoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingPromo, setEditingPromo] = useState<typeof promotions[0] | null>(null)

  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch =
      promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || promo.status === statusFilter
    const matchesType = typeFilter === "all" || promo.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleCreatePromo = () => {
    setIsCreateDialogOpen(true)
  }

  const handleEditPromo = (promo: typeof promotions[0]) => {
    setEditingPromo(promo)
  }

  const handleDeletePromo = (promoId: number) => {
    console.log("Delete promotion:", promoId)
  }

  const handleToggleVisibility = (promoId: number) => {
    console.log("Toggle visibility for promotion:", promoId)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "scheduled":
        return "secondary"
      case "completed":
        return "outline"
      case "paused":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "banner":
        return "bg-blue-100 text-blue-800"
      case "popup":
        return "bg-green-100 text-green-800"
      case "featured":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Promotional Campaigns</h2>
          <p className="text-muted-foreground">Manage marketing campaigns and promotional content</p>
        </div>
        <Button onClick={handleCreatePromo}>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {promotions.filter((p) => p.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {promotions.reduce((sum, p) => sum + p.clicks, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {promotions.reduce((sum, p) => sum + p.conversions, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₿{promotions.reduce((sum, p) => sum + p.spent, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <CardTitle>All Campaigns</CardTitle>
              <CardDescription>{filteredPromotions.length} promotional campaigns</CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm w-32"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm w-32"
              >
                <option value="all">All Types</option>
                <option value="banner">Banner</option>
                <option value="popup">Popup</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{promo.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{promo.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeBadgeColor(promo.type)}>
                        {promo.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(promo.status)}>
                        {promo.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-3 w-3" />
                          <span>{promo.clicks.toLocaleString()} clicks</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{promo.conversions.toLocaleString()} conversions</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(promo.startDate).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">
                          to {new Date(promo.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>₿{promo.spent.toLocaleString()}</div>
                        <div className="text-muted-foreground">
                          of ₿{promo.budget.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleVisibility(promo.id)}
                          title={promo.isVisible ? "Hide campaign" : "Show campaign"}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditPromo(promo)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Campaign
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeletePromo(promo.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Campaign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isCreateDialogOpen || !!editingPromo} onOpenChange={(open) => {
        if (!open) {
          setIsCreateDialogOpen(false)
          setEditingPromo(null)
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingPromo ? "Edit Campaign" : "Create New Campaign"}
            </DialogTitle>
            <DialogDescription>
              {editingPromo
                ? "Update the campaign details and settings."
                : "Create a new promotional campaign to reach your audience."
              }
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title</Label>
                <Input
                  id="title"
                  placeholder="Enter campaign title"
                  defaultValue={editingPromo?.title || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Campaign Type</Label>
                <select
                  defaultValue={editingPromo?.type || ""}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm w-full"
                >
                  <option value="">Select type</option>
                  <option value="banner">Banner</option>
                  <option value="popup">Popup</option>
                  <option value="featured">Featured</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the campaign goals and content"
                defaultValue={editingPromo?.description || ""}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  defaultValue={editingPromo?.startDate || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  defaultValue={editingPromo?.endDate || ""}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (₿)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="0"
                  defaultValue={editingPromo?.budget || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <select
                  defaultValue={editingPromo?.targetAudience || ""}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm w-full"
                >
                  <option value="">Select audience</option>
                  <option value="all_users">All Users</option>
                  <option value="premium_users">Premium Users</option>
                  <option value="food_lovers">Food Lovers</option>
                  <option value="shoppers">Shoppers</option>
                </select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsCreateDialogOpen(false)
              setEditingPromo(null)
            }}>
              {editingPromo ? "Update Campaign" : "Create Campaign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
