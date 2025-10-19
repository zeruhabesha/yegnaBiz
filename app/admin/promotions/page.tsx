"use client"

import { useState, useEffect } from "react"
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
import { getPromotions, updatePromotion, deletePromotion, type Promotion } from "@/lib/api"

export default function AdminPromoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null)
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load promotions on component mount and when filters change
  useEffect(() => {
    loadPromotions()
  }, [searchQuery, statusFilter, typeFilter])

  const loadPromotions = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getPromotions(searchQuery, statusFilter, typeFilter)
      setPromotions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load promotions')
      console.error('Error loading promotions:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredPromotions = promotions

  const handleCreatePromo = () => {
    setIsCreateDialogOpen(true)
  }

  const handleEditPromo = (promo: Promotion) => {
    setEditingPromo(promo)
  }

  const handleDeletePromo = async (promoId: number) => {
    if (confirm("Are you sure you want to delete this promotion?")) {
      try {
        await deletePromotion(promoId)
        loadPromotions() // Refresh the list
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete promotion')
        console.error('Error deleting promotion:', err)
      }
    }
  }

  const handleToggleVisibility = async (promoId: number) => {
    try {
      const promo = promotions.find(p => p.id === promoId)
      if (promo) {
        await updatePromotion(promoId, { is_active: !promo.is_active })
        loadPromotions() // Refresh the list
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle visibility')
      console.error('Error toggling visibility:', err)
    }
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

  if (loading && promotions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading promotions...</div>
      </div>
    )
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

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {promotions.filter((p) => p.status === "active" && p.is_active).length}
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
                        <p className="text-sm text-muted-foreground line-clamp-1">{promo.description || ""}</p>
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
                        <div>{new Date(promo.start_date).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">
                          to {new Date(promo.end_date).toLocaleDateString()}
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
                          title={promo.is_active ? "Hide campaign" : "Show campaign"}
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
                  defaultValue={editingPromo?.start_date || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  defaultValue={editingPromo?.end_date || ""}
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
                  defaultValue={editingPromo?.target_audience || ""}
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
