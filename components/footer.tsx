import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-gradient-to-br from-muted/20 via-background to-muted/10">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
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
                    <span className="text-xs text-muted-foreground/60">ንግድዎን ያክሉ</span>
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Pricing</span>
                    <span className="text-xs text-muted-foreground/60">ዋጋ አሰጣጥ</span>
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Features</span>
                    <span className="text-xs text-muted-foreground/60">ባህሪያት</span>
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
                    <span className="text-xs text-muted-foreground/60">ስለ እኛ</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Contact</span>
                    <span className="text-xs text-muted-foreground/60">ተገናኝ</span>
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Help Center</span>
                    <span className="text-xs text-muted-foreground/60">እርዳታ</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Blog</span>
                    <span className="text-xs text-muted-foreground/60">ብሎግ</span>
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
                    <span className="text-xs text-muted-foreground/60">የግላዊነት ፖሊሲ</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Terms of Service</span>
                    <span className="text-xs text-muted-foreground/60">የአገልግሎት ውሎች</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="flex flex-col hover:text-primary transition-colors duration-200 hover:translate-x-1">
                    <span>Cookie Policy</span>
                    <span className="text-xs text-muted-foreground/60">የኩኪ ፖሊሲ</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            2024 YegnaBiz. All rights reserved.
            <span className="block text-xs text-muted-foreground/60">ሁሉም መብቶች የተጠበቁ ናቸው። በኢትዮጵያ የተሰራ።</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
