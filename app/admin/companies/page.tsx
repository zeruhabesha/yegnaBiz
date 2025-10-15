"use client"

import { useState } from "react"
import { Search, Filter, MoreVertical, CheckCircle, XCircle, Edit, Plus, Eye, TrendingUp } from "@/components/icons"
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
import { mockCompanies } from "@/lib/mock-data"

export default function AdminCompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [editingCompany, setEditingCompany] = useState<typeof mockCompanies[0] | null>(null)
  const [actionCompany, setActionCompany] = useState<typeof mockCompanies[0] | null>(null)
  const [actionType, setActionType] = useState<"verify" | "unverify" | "suspend" | "activate" | "delete" | null>(null)

  const [companies, setCompanies] = useState(mockCompanies)

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || company.status === statusFilter
    const matchesCategory = categoryFilter === "all" || company.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleEditCompany = (company: typeof mockCompanies[0]) => {
    setEditingCompany(company)
  }

  const handleSaveCompany = () => {
    if (editingCompany) {
      setCompanies(prev => prev.map(c => c.id === editingCompany.id ? editingCompany : c))
      setEditingCompany(null)
    }
  }

  const handleCompanyAction = (action: "verify" | "unverify" | "suspend" | "activate" | "delete", company: typeof mockCompanies[0]) => {
    setActionCompany(company)
    setActionType(action)
  }

  const confirmCompanyAction = () => {
    if (actionCompany && actionType) {
      if (actionType === "delete") {
        setCompanies(prev => prev.filter(c => c.id !== actionCompany.id))
      } else {
        setCompanies(prev => prev.map(c => {
          if (c.id === actionCompany.id) {
            switch (actionType) {
              case "verify":
                return { ...c, isVerified: true }
              case "unverify":
                return { ...c, isVerified: false }
              case "suspend":
                return { ...c, status: "suspended" }
              case "activate":
                return { ...c, status: "active" }
              default:
                return c
            }
          }
          return c
        }))
      }
      setActionCompany(null)
      setActionType(null)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "suspended":
        return "destructive"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getCategoryBadgeColor = (category: string) => {
    // Simple color mapping for categories
    const colors: { [key: string]: string } = {
      "Restaurants & Cafes": "bg-orange-100 text-orange-800",
      "Hotels & Lodging": "bg-blue-100 text-blue-800",
      "Technology": "bg-green-100 text-green-800",
      "Healthcare": "bg-red-100 text-red-800",
      "Education": "bg-purple-100 text-purple-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Manage Companies</h2>
          <p className="text-muted-foreground">View and moderate all business listings</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{companies.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {companies.filter(c => c.isVerified).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {companies.filter(c => c.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Suspended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {companies.filter(c => c.status === "suspended").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <CardTitle>All Companies</CardTitle>
              <CardDescription>{filteredCompanies.length} total listings</CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="Restaurants & Cafes">Restaurants</option>
                <option value="Hotels & Lodging">Hotels</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-sm text-muted-foreground">{company.city}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryBadgeColor(company.category)}>
                        {company.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadgeVariant(company.status)}>
                          {company.status}
                        </Badge>
                        {company.isVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{company.rating.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground">({company.reviewCount})</span>
                      </div>
                    </TableCell>
                    <TableCell>{company.viewCount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditCompany(company)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Company
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {company.isVerified ? (
                            <DropdownMenuItem onClick={() => handleCompanyAction("unverify", company)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Unverify
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleCompanyAction("verify", company)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Verify
                            </DropdownMenuItem>
                          )}
                          {company.status === "active" ? (
                            <DropdownMenuItem onClick={() => handleCompanyAction("suspend", company)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Suspend
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleCompanyAction("activate", company)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleCompanyAction("delete", company)}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Company Dialog */}
      <Dialog open={!!editingCompany} onOpenChange={(open) => !open && setEditingCompany(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
            <DialogDescription>
              Update company information and verification status.
            </DialogDescription>
          </DialogHeader>

          {editingCompany && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Company Name</Label>
                  <Input
                    id="edit-name"
                    value={editingCompany.name}
                    onChange={(e) => setEditingCompany({...editingCompany, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    value={editingCompany.category}
                    onChange={(e) => setEditingCompany({...editingCompany, category: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingCompany.description}
                  onChange={(e) => setEditingCompany({...editingCompany, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-city">City</Label>
                  <Input
                    id="edit-city"
                    value={editingCompany.city || ""}
                    onChange={(e) => setEditingCompany({...editingCompany, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={editingCompany.phone || ""}
                    onChange={(e) => setEditingCompany({...editingCompany, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    value={editingCompany.email || ""}
                    onChange={(e) => setEditingCompany({...editingCompany, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-website">Website</Label>
                  <Input
                    id="edit-website"
                    value={editingCompany.website || ""}
                    onChange={(e) => setEditingCompany({...editingCompany, website: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCompany(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCompany}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <Dialog open={!!actionCompany && !!actionType} onOpenChange={(open) => !open && setActionCompany(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "delete" && "Delete Company"}
              {actionType === "verify" && "Verify Company"}
              {actionType === "unverify" && "Unverify Company"}
              {actionType === "suspend" && "Suspend Company"}
              {actionType === "activate" && "Activate Company"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "delete" &&
                `Are you sure you want to delete ${actionCompany?.name}? This action cannot be undone.`
              }
              {actionType === "verify" &&
                `Verify ${actionCompany?.name} as a legitimate business?`
              }
              {actionType === "unverify" &&
                `Remove verification status from ${actionCompany?.name}?`
              }
              {actionType === "suspend" &&
                `Suspend ${actionCompany?.name} from the platform?`
              }
              {actionType === "activate" &&
                `Reactivate ${actionCompany?.name} on the platform?`
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => {setActionCompany(null); setActionType(null)}}>
              Cancel
            </Button>
            <Button
              variant={actionType === "delete" ? "destructive" : "default"}
              onClick={confirmCompanyAction}
            >
              {actionType === "delete" && "Delete"}
              {actionType === "verify" && "Verify"}
              {actionType === "unverify" && "Unverify"}
              {actionType === "suspend" && "Suspend"}
              {actionType === "activate" && "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
