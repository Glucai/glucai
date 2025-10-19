"use client"

import { useAuth } from "@/lib/auth-context"
import { AuthForm } from "@/components/auth-form"
import { Button } from "@/components/ui/button"
import { Camera, History, Sparkles, TrendingUp, Crown } from "lucide-react"
import Link from "next/link"
import { UsageLimitBanner } from "@/components/usage-limit-banner"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"
import { useState, useEffect } from "react"

export default function HomePage() {
  const { user, signOut } = useAuth()
  const [analysisCount, setAnalysisCount] = useState(0)
  const FREE_LIMIT = 10

  useEffect(() => {
    if (user) {
      const count = Number.parseInt(localStorage.getItem("glucai_analysis_count") || "0")
      setAnalysisCount(count)
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-balance">GlucAI</h1>
              <p className="text-lg text-muted-foreground text-balance">Comptez vos glucides en un instant avec l'IA</p>
            </div>

            <AuthForm />

            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Prenez une photo</p>
              </div>
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <Sparkles className="h-8 w-8 text-secondary" />
                </div>
                <p className="text-sm text-muted-foreground">IA détecte les aliments</p>
              </div>
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">Calcul automatique</p>
              </div>
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <History className="h-8 w-8 text-chart-2" />
                </div>
                <p className="text-sm text-muted-foreground">Historique complet</p>
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    )
  }

  const canAnalyze = user.isPremium || analysisCount < FREE_LIMIT

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-balance">Bienvenue, {user.name || "utilisateur"}</h2>
            <p className="text-muted-foreground text-balance">Analysez vos repas et suivez vos glucides facilement</p>
          </div>

          {!user.isPremium && <UsageLimitBanner currentUsage={analysisCount} limit={FREE_LIMIT} />}

          <div className="grid gap-4">
            {canAnalyze ? (
              <Link href="/analyze">
                <Button size="lg" className="w-full h-24 text-lg">
                  <Camera className="mr-2 h-6 w-6" />
                  Analyser un repas
                </Button>
              </Link>
            ) : (
              <div className="space-y-3">
                <Button size="lg" className="w-full h-24 text-lg" disabled>
                  <Camera className="mr-2 h-6 w-6" />
                  Limite atteinte ({analysisCount}/{FREE_LIMIT})
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Vous avez atteint votre limite mensuelle. Passez à Premium pour continuer.
                </p>
              </div>
            )}

            <Link href="/history">
              <Button size="lg" variant="outline" className="w-full h-16 bg-transparent">
                <History className="mr-2 h-5 w-5" />
                Voir l'historique
              </Button>
            </Link>
          </div>

          {!user.isPremium && (
            <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3 mb-4">
                <Crown className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Passez à Premium</h3>
                  <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <li>✓ Analyses illimitées</li>
                    <li>✓ Export PDF de l'historique</li>
                    <li>✓ Sans publicité</li>
                    <li>✓ Support prioritaire</li>
                    <li>✓ Statistiques avancées</li>
                  </ul>
                </div>
              </div>
              <Link href="/premium">
                <Button className="w-full">Découvrir Premium - 9,99€/mois</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
