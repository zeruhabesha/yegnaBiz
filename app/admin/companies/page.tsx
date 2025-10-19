"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MoreVertical, Plus, Edit, Trash2, Shield, CheckCircle, XCircle, Building2, X } from "@/components/icons"
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
import { getCompanies, updateCompany, deleteCompany, type Company } from "@/lib/api"

export default function AdminCompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [actionCompany, setActionCompany] = useState<Company | null>(null)
  const [actionType, setActionType] = useState<"verify" | "unverify" | "suspend" | "activate" | "delete" | null>(null)
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load companies on component mount and when filters change
  useEffect(() => {
    loadCompanies()
  }, [searchQuery, statusFilter, categoryFilter])

  const loadCompanies = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getCompanies(searchQuery, statusFilter, categoryFilter)
      setCompanies(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load companies')
      console.error('Error loading companies:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredCompanies = companies

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company)
  }

  const handleSaveCompany = async () => {
    if (!editingCompany) return

    try {
      await updateCompany(editingCompany.id, editingCompany)
      setEditingCompany(null)
      loadCompanies() // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update company')
      console.error('Error updating company:', err)
    }
  }

  const handleCompanyAction = (action: "verify" | "unverify" | "suspend" | "activate" | "delete", company: Company) => {
    setActionCompany(company)
    setActionType(action)
  }

  const confirmCompanyAction = async () => {
    if (!actionCompany || !actionType) return

    try {
      if (actionType === "delete") {
        await deleteCompany(actionCompany.id)
      } else {
        let updateData: Partial<Company> = {}

        switch (actionType) {
          case "verify":
            updateData.is_verified = true
            break
          case "unverify":
            updateData.is_verified = false
            break
          case "suspend":
            updateData.status = "suspended"
            break
          case "activate":
            updateData.status = "active"
            break
        }

        await updateCompany(actionCompany.id, updateData)
      }

      setActionCompany(null)
      setActionType(null)
      loadCompanies() // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to perform action')
      console.error('Error performing company action:', err)
    }
  }

  const handleStatusChange = async (companyId: number, newStatus: string) => {
    try {
      await updateCompany(companyId, { status: newStatus })
      loadCompanies() // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
      console.error('Error updating status:', err)
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
        return "outline"
      default:
        return "secondary"
    }
  }

  if (loading && companies.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading companies...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Manage Companies</h2>
        <p className="text-muted-foreground">Review and moderate business listings</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md">
          {error}
        </div>
      )}

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
              {companies.filter(c => c.is_verified).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Featured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {companies.filter(c => c.is_featured).length}
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
              <CardDescription>{filteredCompanies.length} registered businesses</CardDescription>
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
                className="px-3 py-2 border border-input bg-background rounded-md text-sm w-32"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm w-40"
              >
                <option value="all">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Transportation">Transportation</option>
                <option value="Finance">Finance</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Construction">Construction</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Hospitality">Hospitality</option>
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
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{company.description || ""}</p>
                        <p className="text-xs text-muted-foreground">{company.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {company.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{company.city}</div>
                        <div className="text-muted-foreground">{company.region}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(company.status)}>
                        {company.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{company.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({company.review_count} reviews)
                        </span>
                      </div>
                    </TableCell>
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
                            <Building2 className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {company.is_verified ? (
                            <DropdownMenuItem onClick={() => handleCompanyAction("unverify", company)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Unverify Company
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleCompanyAction("verify", company)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Verify Company
                            </DropdownMenuItem>
                          )}
                          {company.status === "active" ? (
                            <DropdownMenuItem onClick={() => handleCompanyAction("suspend", company)}>
                              <Shield className="mr-2 h-4 w-4" />
                              Suspend Company
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleCompanyAction("activate", company)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Activate Company
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleCompanyAction("delete", company)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Company
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
                  <select
                    value={editingCompany.category}
                    onChange={(e) => setEditingCompany({...editingCompany, category: e.target.value})}
                    className="px-3 py-2 border border-input bg-background rounded-md text-sm w-full"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Finance">Finance</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Construction">Construction</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Hospitality">Hospitality</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <textarea
                  id="edit-description"
                  value={editingCompany.description || ""}
                  onChange={(e) => setEditingCompany({...editingCompany, description: e.target.value})}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm w-full min-h-20"
                  placeholder="Company description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingCompany.email || ""}
                    onChange={(e) => setEditingCompany({...editingCompany, email: e.target.value})}
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
                  <Label htmlFor="edit-city">City</Label>
                  <Input
                    id="edit-city"
                    value={editingCompany.city}
                    onChange={(e) => setEditingCompany({...editingCompany, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-region">Region</Label>
                  <Input
                    id="edit-region"
                    value={editingCompany.region}
                    onChange={(e) => setEditingCompany({...editingCompany, region: e.target.value})}
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
                `Are you sure you want to verify ${actionCompany?.name}? This will mark them as a trusted business.`
              }
              {actionType === "unverify" &&
                `Are you sure you want to unverify ${actionCompany?.name}? They will lose their verified status.`
              }
              {actionType === "suspend" &&
                `Are you sure you want to suspend ${actionCompany?.name}? They will be hidden from public view.`
              }
              {actionType === "activate" &&
                `Are you sure you want to activate ${actionCompany?.name}? They will become visible again.`
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
