"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminNav } from "@/components/admin-nav"
import { useAuth } from "@/lib/auth-context"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return null
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-2">
              Admin Panel
            </Badge>
            <h1 className="text-2xl font-bold">YegnaBiz Administration</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <Card className="p-4">
                <AdminNav />
              </Card>
            </aside>

            <div className="lg:col-span-3">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
