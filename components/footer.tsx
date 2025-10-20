import Link from "next/link"
import { Building2 } from "@/components/icons"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-gradient-to-br from-muted/20 via-background to-muted/10">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Building2 className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-200" />
                <div className="absolute inset-0 h-7 w-7 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-200"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  YegnaBiz
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground/60 -mt-1">
                  Ethiopia's Business Guide
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect with the best businesses in Ethiopia. Your gateway to quality services and trusted companies across all industries.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">For Businesses</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/add-business" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Add Your Business</span>
                    <span className="text-xs text-muted-foreground/50">Showcase your services</span>
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Pricing</span>
                    <span className="text-xs text-muted-foreground/50">Plans for every stage</span>
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Features</span>
                    <span className="text-xs text-muted-foreground/50">Tools to help you grow</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Information</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>About Us</span>
                    <span className="text-xs text-muted-foreground/50">Learn our mission</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Contact</span>
                    <span className="text-xs text-muted-foreground/50">We're here to help</span>
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Help Center</span>
                    <span className="text-xs text-muted-foreground/50">Guides & tutorials</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Blog</span>
                    <span className="text-xs text-muted-foreground/50">Insights & trends</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Legal</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Privacy Policy</span>
                    <span className="text-xs text-muted-foreground/50">How we protect data</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Terms of Service</span>
                    <span className="text-xs text-muted-foreground/50">Your rights & ours</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Cookie Policy</span>
                    <span className="text-xs text-muted-foreground/50">Manage preferences</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            2024 YegnaBiz. All rights reserved.
            <span className="block text-xs text-muted-foreground/50">Proudly crafted in Ethiopia for the world.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
