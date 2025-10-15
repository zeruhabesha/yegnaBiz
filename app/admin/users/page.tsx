"use client"

import { useState } from "react"
import { Search, Filter, MoreVertical, Shield, Ban, Edit, CheckCircle, XCircle, Users, X } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

interface User {
  id: number
  fullName: string
  email: string
  role: string
  status: string
  joinedAt: string
  companies: number
  lastLogin?: string
  phone?: string
  location?: string
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [actionUser, setActionUser] = useState<User | null>(null)
  const [actionType, setActionType] = useState<"suspend" | "activate" | "delete" | null>(null)

  // Enhanced mock user data with more details
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      fullName: "Admin User",
      email: "admin@yegnabiz.com",
      role: "admin",
      status: "active",
      joinedAt: "2024-01-15",
      companies: 0,
      lastLogin: "2024-12-20T10:30:00Z",
      phone: "+251911000000",
      location: "Addis Ababa",
    },
    {
      id: 2,
      fullName: "Abebe Kebede",
      email: "owner1@example.com",
      role: "business_owner",
      status: "active",
      joinedAt: "2024-03-20",
      companies: 1,
      lastLogin: "2024-12-19T15:45:00Z",
      phone: "+251922111111",
      location: "Addis Ababa",
    },
    {
      id: 3,
      fullName: "Tigist Alemu",
      email: "owner2@example.com",
      role: "business_owner",
      status: "active",
      joinedAt: "2024-05-10",
      companies: 1,
      lastLogin: "2024-12-18T09:20:00Z",
      phone: "+251933222222",
      location: "Hawassa",
    },
    {
      id: 4,
      fullName: "Dawit Tesfaye",
      email: "user1@example.com",
      role: "user",
      status: "active",
      joinedAt: "2024-08-05",
      companies: 0,
      lastLogin: "2024-12-17T14:10:00Z",
      phone: "+251944333333",
      location: "Dire Dawa",
    },
    {
      id: 5,
      fullName: "Meron Tadesse",
      email: "meron@example.com",
      role: "user",
      status: "suspended",
      joinedAt: "2024-07-12",
      companies: 0,
      lastLogin: "2024-12-10T11:00:00Z",
      phone: "+251955444444",
      location: "Mekelle",
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  const handleEditUser = (user: User) => {
    setEditingUser(user)
  }

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u))
      setEditingUser(null)
    }
  }

  const handleUserAction = (action: "suspend" | "activate" | "delete", user: User) => {
    setActionUser(user)
    setActionType(action)
  }

  const confirmUserAction = () => {
    if (actionUser && actionType) {
      if (actionType === "delete") {
        setUsers(prev => prev.filter(u => u.id !== actionUser.id))
      } else {
        setUsers(prev => prev.map(u =>
          u.id === actionUser.id
            ? { ...u, status: actionType === "suspend" ? "suspended" : "active" }
            : u
        ))
      }
      setActionUser(null)
      setActionType(null)
    }
  }

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, role: newRole } : u
    ))
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "suspended":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Manage Users</h2>
        <p className="text-muted-foreground">View and moderate platform users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {users.filter(u => u.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Business Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {users.filter(u => u.role === "business_owner").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Suspended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {users.filter(u => u.status === "suspended").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>{filteredUsers.length} registered users</CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
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
              </select>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm w-32"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="business_owner">Business Owner</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Companies</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const initials = user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()

                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.fullName}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            {user.location && (
                              <p className="text-xs text-muted-foreground">{user.location}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="px-2 py-1 border border-input bg-background rounded text-sm w-32"
                        >
                          <option value="user">User</option>
                          <option value="business_owner">Business Owner</option>
                          <option value="admin">Admin</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.companies}</TableCell>
                      <TableCell>
                        {user.lastLogin ? (
                          new Date(user.lastLogin).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        ) : (
                          <span className="text-muted-foreground">Never</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "active" ? (
                              <DropdownMenuItem onClick={() => handleUserAction("suspend", user)}>
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleUserAction("activate", user)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Activate User
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleUserAction("delete", user)}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>

          {editingUser && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-fullName">Full Name</Label>
                <Input
                  id="edit-fullName"
                  value={editingUser.fullName}
                  onChange={(e) => setEditingUser({...editingUser, fullName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editingUser.phone || ""}
                  onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={editingUser.location || ""}
                  onChange={(e) => setEditingUser({...editingUser, location: e.target.value})}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveUser}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <Dialog open={!!actionUser && !!actionType} onOpenChange={(open) => !open && setActionUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "delete" && "Delete User"}
              {actionType === "suspend" && "Suspend User"}
              {actionType === "activate" && "Activate User"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "delete" &&
                `Are you sure you want to delete ${actionUser?.fullName}? This action cannot be undone.`
              }
              {actionType === "suspend" &&
                `Are you sure you want to suspend ${actionUser?.fullName}? They will lose access to their account.`
              }
              {actionType === "activate" &&
                `Are you sure you want to activate ${actionUser?.fullName}? They will regain access to their account.`
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => {setActionUser(null); setActionType(null)}}>
              Cancel
            </Button>
            <Button
              variant={actionType === "delete" ? "destructive" : "default"}
              onClick={confirmUserAction}
            >
              {actionType === "delete" && "Delete"}
              {actionType === "suspend" && "Suspend"}
              {actionType === "activate" && "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
