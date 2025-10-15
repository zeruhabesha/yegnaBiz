"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication - in production, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser: User = {
      id: 1,
      email,
      fullName: "Demo User",
      role: email.includes("admin") ? "admin" : "user",
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const register = async (email: string, password: string, fullName: string) => {
    // Mock registration - in production, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: Date.now(),
      email,
      fullName,
      role: "user",
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
