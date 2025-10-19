"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: number
  email: string
  fullName: string
  role: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => void
}

const STORAGE_KEY = "yegnabiz.auth.user"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function mapUser(payload: Record<string, unknown>): User {
  return {
    id: Number(payload.id ?? 0),
    email: String(payload.email ?? ""),
    fullName: String(payload.full_name ?? payload.fullName ?? ""),
    role: String(payload.role ?? "user"),
    avatar: typeof payload.avatar === "string" ? payload.avatar : undefined,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    let storedUser = localStorage.getItem(STORAGE_KEY)

    if (!storedUser) {
      const legacyUser = localStorage.getItem("user")
      if (legacyUser) {
        storedUser = legacyUser
        localStorage.setItem(STORAGE_KEY, legacyUser)
        localStorage.removeItem("user")
      }
    }

    if (!storedUser) {
      setIsLoading(false)
      return
    }

    try {
      const parsed = mapUser(JSON.parse(storedUser))
      setUser(parsed)

      const controller = new AbortController()

      async function validateSession() {
        try {
          const response = await fetch(`/api/admin/users/${parsed.id}`, {
            signal: controller.signal,
            cache: "no-store",
          })

          if (!response.ok) {
            throw new Error("Session validation failed")
          }

          const json = await response.json()
          if (!json.success) {
            throw new Error(json.error ?? "Session validation failed")
          }

          const refreshedUser = mapUser(json.data)
          setUser(refreshedUser)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(refreshedUser))
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            return
          }
          console.error("Error validating session:", error)
          logout()
        } finally {
          setIsLoading(false)
        }
      }

      validateSession()

      return () => controller.abort()
    } catch (error) {
      console.error("Failed to restore session:", error)
      logout()
      setIsLoading(false)
    }
  }, [logout])

  const login = useCallback(async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const json = await response.json()

    if (!response.ok || !json.success) {
      throw new Error(json.error ?? "Failed to sign in")
    }

    const authenticatedUser = mapUser(json.data)
    setUser(authenticatedUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser))
  }, [])

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, full_name: fullName }),
    })

    const json = await response.json()

    if (!response.ok || !json.success) {
      throw new Error(json.error ?? "Failed to create account")
    }

    const newUser = mapUser(json.data)
    setUser(newUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
  }, [])

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
