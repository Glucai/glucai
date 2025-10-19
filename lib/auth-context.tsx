"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Types pour l'utilisateur
export interface User {
  id: string
  email: string
  name?: string
  isPremium: boolean
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const storedUser = localStorage.getItem("glucai_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // Simulation d'authentification - À remplacer par Firebase
    setLoading(true)
    try {
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        isPremium: false,
        createdAt: new Date(),
      }

      localStorage.setItem("glucai_user", JSON.stringify(mockUser))
      setUser(mockUser)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    // Simulation d'inscription - À remplacer par Firebase
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: name || email.split("@")[0],
        isPremium: false,
        createdAt: new Date(),
      }

      localStorage.setItem("glucai_user", JSON.stringify(mockUser))
      setUser(mockUser)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    localStorage.removeItem("glucai_user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
