import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { LanguageProvider } from "@/lib/language-context"
import { PromoWrapper } from "@/components/promo-wrapper"
import { GlobalBackground } from "@/components/global-background"

export const metadata: Metadata = {
  title: "YegnaBiz - Ethiopia Business Directory",
  description: "Discover and connect with trusted Ethiopian businesses across all industries",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="font-sans bg-background text-foreground">
        <GlobalBackground />
        <LanguageProvider>
          <AuthProvider>
            <PromoWrapper />
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
