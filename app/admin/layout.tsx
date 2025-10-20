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
import { PageHero } from "@/components/page-hero"
import { PageSection } from "@/components/page-section"

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

      <PageHero
        align="start"
        eyebrow="Internal"
        title="YegnaBiz Administration"
        description="Manage listings, oversee reviews, and keep the marketplace thriving."
        actions={<Badge variant="secondary" className="bg-white/10 text-white">Admin Panel</Badge>}
      />

      <main className="flex-1">
        <PageSection tone="default" className="py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <Card className="rounded-3xl border-white/10 bg-background/70 p-5 shadow-lg shadow-black/5 backdrop-blur">
                <AdminNav />
              </Card>
            </aside>

            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-white/10 bg-background/70 p-6 shadow-lg shadow-black/5 backdrop-blur">
                {children}
              </div>
            </div>
          </div>
        </PageSection>
      </main>

      <Footer />
    </div>
  )
}
