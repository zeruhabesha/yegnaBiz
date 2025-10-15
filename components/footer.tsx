import Link from "next/link"
import { Building2 } from "@/components/icons"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">YegnaBiz</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Ethiopia's premier business directory connecting customers with quality businesses.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Businesses</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/add-business" className="hover:text-foreground transition-colors">
                  Add Your Business
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} YegnaBiz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
