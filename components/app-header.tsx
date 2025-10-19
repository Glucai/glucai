"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function AppHeader() {
  const { user, signOut } = useAuth()

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold">GlucAI</h1>
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user.name || user.email}</span>
            {user.isPremium && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full flex items-center gap-1">
                <Crown className="h-3 w-3" />
                Premium
              </span>
            )}
            <Link href="/profile">
              <Button variant="outline" size="sm">
                Profil
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Déconnexion
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
