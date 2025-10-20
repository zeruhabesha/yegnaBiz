"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Language, defaultLanguage, getTranslation } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Initialize language preference only on client side
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("yegnabiz-language") as Language
      if (stored && (stored === 'en' || stored === 'am')) {
        setLanguage(stored)
      }
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      // Store language preference
      localStorage.setItem("yegnabiz-language", language)

      // Update document language attribute
      document.documentElement.lang = language === 'am' ? 'am' : 'en'
    }
  }, [language, mounted])

  const t = (key: string): string => {
    if (!mounted) return key // Return key during SSR/hydration
    return getTranslation(key, language)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
