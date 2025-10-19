"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Crown, Download, Zap, Shield, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"

export default function PremiumPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly")
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/")
    } else {
      setIsChecking(false)
    }
  }, [user, router])

  if (isChecking) {
    return null
  }

  const handleSubscribe = async (plan: "monthly" | "yearly") => {
    setLoading(true)
    try {
      // Simulation d'abonnement - À remplacer par Stripe
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mettre à jour le statut premium de l'utilisateur
      const updatedUser = { ...user, isPremium: true }
      localStorage.setItem("glucai_user", JSON.stringify(updatedUser))

      alert("Félicitations ! Vous êtes maintenant membre Premium")
      router.push("/")
    } catch (err) {
      console.error("Erreur d'abonnement:", err)
      alert("Erreur lors de l'abonnement. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  if (user.isPremium) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <AppHeader />

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Crown className="h-10 w-10 text-primary" />
            </div>

            <h2 className="text-3xl font-bold">Vous êtes Premium</h2>
            <p className="text-muted-foreground text-lg">Profitez de toutes les fonctionnalités avancées de GlucAI</p>

            <Card className="text-left">
              <CardHeader>
                <CardTitle>Vos avantages Premium</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Analyses illimitées</p>
                    <p className="text-sm text-muted-foreground">Analysez autant de repas que vous le souhaitez</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Export PDF</p>
                    <p className="text-sm text-muted-foreground">Exportez votre historique en PDF</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Sans publicité</p>
                    <p className="text-sm text-muted-foreground">Expérience sans interruption</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Support prioritaire</p>
                    <p className="text-sm text-muted-foreground">Assistance rapide et personnalisée</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" className="w-full max-w-sm" asChild>
              <a href="/">Retour à l'accueil</a>
            </Button>
          </div>
        </main>

        <AppFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
              <Crown className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Débloquez tout le potentiel de GlucAI</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Accédez à des fonctionnalités avancées pour un meilleur suivi de vos glucides
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Analyses illimitées</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Analysez autant de repas que vous le souhaitez, sans aucune limite
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Download className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Export PDF</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Exportez votre historique complet en PDF pour vos consultations médicales
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Sans publicité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Profitez d'une expérience sans interruption et sans publicité
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={selectedPlan === "monthly" ? "default" : "outline"}
              onClick={() => setSelectedPlan("monthly")}
              className="min-w-32"
            >
              Mensuel
            </Button>
            <Button
              variant={selectedPlan === "yearly" ? "default" : "outline"}
              onClick={() => setSelectedPlan("yearly")}
              className="min-w-32"
            >
              Annuel
              <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">-20%</span>
            </Button>
          </div>

          <Card className="max-w-md mx-auto border-primary/50 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {selectedPlan === "monthly" ? "9,99€" : "95,99€"}
                <span className="text-base font-normal text-muted-foreground">
                  /{selectedPlan === "monthly" ? "mois" : "an"}
                </span>
              </CardTitle>
              <CardDescription>
                {selectedPlan === "yearly" && "Économisez 23,89€ par an"}
                {selectedPlan === "monthly" && "Sans engagement"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm">Analyses illimitées</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm">Export PDF de l'historique</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm">Sans publicité</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm">Support prioritaire</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm">Statistiques avancées</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm">Nouvelles fonctionnalités en priorité</span>
                </li>
              </ul>

              <Button onClick={() => handleSubscribe(selectedPlan)} disabled={loading} size="lg" className="w-full">
                {loading ? "Traitement..." : "S'abonner maintenant"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Annulez à tout moment. Paiement sécurisé par Stripe.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Pourquoi passer à Premium ?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                GlucAI Premium vous permet de suivre vos glucides sans limite et d'exporter vos données pour vos
                consultations médicales.
              </p>
              <p>Rejoignez des milliers d'utilisateurs qui gèrent mieux leur diabète grâce à GlucAI Premium.</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
