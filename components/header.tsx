"use client"

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-18 items-center justify-between">
        <Link href="/" className="flex flex-col items-start group">
          <div className="flex items-center gap-3">
            <div className="relative h-7 w-7">
              <Image src="/logo.svg" alt="YegnaBiz" width={28} height={28} className="group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute inset-0 h-7 w-7 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-200"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                YegnaBiz
              </span>
              <span className="text-xs text-muted-foreground/60 -mt-1">የኛ ቢዝነስ</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "/", label: "Home" },
            { href: "/companies", label: "Companies" },
            { href: "/categories", label: "Categories" },
            { href: "/promote", label: "Promote" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group flex flex-col items-center"
            >
              <span>{label}</span>
              {label === 'Home' && <span className="text-xs text-muted-foreground/60">ዋና ገጽ</span>}
              {label === 'Companies' && <span className="text-xs text-muted-foreground/60">ኩባንያዎች</span>}
              {label === 'Categories' && <span className="text-xs text-muted-foreground/60">ምድቦች</span>}
              {label === 'Promote' && <span className="text-xs text-muted-foreground/60">ያስተዋውቁ</span>}
              {label === 'About' && <span className="text-xs text-muted-foreground/60">ስለኛ</span>}
              {label === 'Contact' && <span className="text-xs text-muted-foreground/60">አግኙን</span>}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-4 ml-4">
              {user.role === "admin" && (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="glass-effect hover:bg-primary/10">
                    Admin
                  </Button>
                </Link>
              )}
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="glass-effect hover:bg-primary/10">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground hover:bg-destructive/10"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-4">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="glass-effect hover:bg-primary/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="btn-gradient hover:scale-105 transition-all duration-200">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl">
          <nav className="container py-6 flex flex-col gap-4">
            {[
              { href: "/", label: "Home" },
              { href: "/companies", label: "Companies" },
              { href: "/categories", label: "Categories" },
              { href: "/promote", label: "Promote" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            {user ? (
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="justify-start text-muted-foreground hover:text-destructive"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full btn-gradient">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
