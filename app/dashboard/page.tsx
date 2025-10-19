"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Camera, History, TrendingUp, Calendar, Crown, ArrowRight, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalMeals: 0,
    avgCarbs: 0,
    thisMonth: 0,
    analysisCount: 0,
  })

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }
    loadStats()
  }, [user, router])

  const loadStats = async () => {
    try {
      const response = await fetch("/api/meals")
      const data = await response.json()
      const meals = data.meals || []

      const totalMeals = meals.length
      const totalCarbs = meals.reduce((sum: number, meal: any) => sum + meal.totalCarbs, 0)
      const avgCarbs = totalMeals > 0 ? totalCarbs / totalMeals : 0

      const now = new Date()
      const thisMonth = meals.filter((meal: any) => {
        const mealDate = new Date(meal.date)
        return mealDate.getMonth() === now.getMonth() && mealDate.getFullYear() === now.getFullYear()
      }).length

      const analysisCount = Number.parseInt(localStorage.getItem("glucai_analysis_count") || "0")

      setStats({
        totalMeals,
        avgCarbs: Math.round(avgCarbs * 10) / 10,
        thisMonth,
        analysisCount,
      })
    } catch (err) {
      console.error("Erreur de chargement des stats:", err)
    }
  }

  if (!user) return null

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email[0].toUpperCase()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl bg-primary text-primary-foreground">{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{user.name || "Utilisateur"}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/profile">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Profil
                    </Button>
                  </Link>
                  <Link href="/premium">
                    <Button variant="outline" size="sm">
                      {user.isPremium ? "Gérer" : "Premium"}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Ce mois-ci
                </CardDescription>
                <CardTitle className="text-3xl">{stats.thisMonth}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Repas analysés</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardDescription className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Moyenne
                </CardDescription>
                <CardTitle className="text-3xl">{stats.avgCarbs}g</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Glucides par repas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardDescription className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Total
                </CardDescription>
                <CardTitle className="text-3xl">{stats.totalMeals}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Repas enregistrés</p>
              </CardContent>
            </Card>
          </div>

          {/* Usage Limit for Free Users */}
          {!user.isPremium && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Utilisation mensuelle</CardTitle>
                <CardDescription>{stats.analysisCount} / 10 analyses utilisées ce mois-ci</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(stats.analysisCount / 10) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {stats.analysisCount >= 10
                    ? "Vous avez atteint votre limite mensuelle"
                    : `Il vous reste ${10 - stats.analysisCount} analyses gratuites`}
                </p>
                <Link href="/premium">
                  <Button className="w-full">
                    <Crown className="mr-2 h-4 w-4" />
                    Passer à Premium pour analyses illimitées
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Actions rapides</h3>

            <Link href="/analyze">
              <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Camera className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Analyser un nouveau repas</h4>
                      <p className="text-sm text-muted-foreground">Prenez une photo pour commencer</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/history">
              <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <History className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Consulter l'historique</h4>
                      <p className="text-sm text-muted-foreground">Voir tous vos repas passés</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Health Tip */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Conseil santé
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              {stats.avgCarbs > 60 ? (
                <p>
                  Votre moyenne de glucides par repas est de {stats.avgCarbs}g. Pensez à consulter votre médecin ou
                  diététicien pour ajuster vos portions si nécessaire.
                </p>
              ) : stats.avgCarbs > 0 ? (
                <p>
                  Excellente gestion ! Votre moyenne de {stats.avgCarbs}g de glucides par repas est bien équilibrée.
                  Continuez ainsi.
                </p>
              ) : (
                <p>
                  Commencez à analyser vos repas pour obtenir des statistiques personnalisées et des conseils adaptés à
                  votre situation.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
