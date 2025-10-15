"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Star, Settings } from "@/components/icons"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Building2,
  },
  {
    title: "My Companies",
    href: "/dashboard/companies",
    icon: Building2,
  },
  {
    title: "My Reviews",
    href: "/dashboard/reviews",
    icon: Star,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
