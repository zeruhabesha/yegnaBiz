"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DashboardNav } from "@/components/dashboard-nav"
import { useAuth } from "@/lib/auth-context"
import { Card } from "@/components/ui/card"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return null
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <Card className="p-4">
                <DashboardNav />
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
