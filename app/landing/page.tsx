import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Sparkles, History, TrendingUp, Shield, Zap, Heart, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">GlucAI</h1>
          </div>
          <Link href="/">
            <Button variant="outline">Se connecter</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Propulsé par l'intelligence artificielle
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Votre assistant IA pour compter vos glucides
          </h1>

          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            Prenez une photo de votre repas et obtenez instantanément le nombre de glucides. Simple, rapide et précis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8">
                <Camera className="mr-2 h-5 w-5" />
                Analyser un repas
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-transparent">
                <History className="mr-2 h-5 w-5" />
                Voir l'historique
              </Button>
            </Link>
          </div>

          {/* Demo Image Placeholder */}
          <div className="pt-8">
            <div className="relative rounded-2xl overflow-hidden border shadow-2xl bg-card">
              <img src="/modern-mobile-app-interface-showing-meal-analysis-.jpg" alt="Interface GlucAI" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Comment ça marche ?</h2>
            <p className="text-lg text-muted-foreground text-balance">Trois étapes simples pour gérer vos glucides</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Prenez une photo</CardTitle>
                <CardDescription className="leading-relaxed">
                  Photographiez votre repas avec un objet de référence (main ou cuillère) pour une meilleure précision
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>2. IA analyse</CardTitle>
                <CardDescription className="leading-relaxed">
                  Notre intelligence artificielle détecte automatiquement les aliments et estime les portions avec
                  précision
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>3. Résultats instantanés</CardTitle>
                <CardDescription className="leading-relaxed">
                  Obtenez le détail des glucides par aliment et le total du repas en quelques secondes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Pourquoi choisir GlucAI ?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Rapide et simple</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Plus besoin de chercher dans des tables nutritionnelles. Une photo suffit.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Données sécurisées</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Vos données de santé sont chiffrées et protégées selon les normes RGPD.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <History className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Historique complet</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Suivez vos repas et analysez vos habitudes alimentaires sur le long terme.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Base CIQUAL</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Données nutritionnelles officielles de l'ANSES pour une précision maximale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">
                Prêt à simplifier votre gestion du diabète ?
              </h2>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
                Rejoignez des milliers d'utilisateurs qui font confiance à GlucAI pour gérer leurs glucides au
                quotidien.
              </p>
              <Link href="/">
                <Button size="lg" className="text-lg h-14 px-8">
                  Commencer gratuitement
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">10 analyses gratuites par mois • Sans engagement</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">GlucAI</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="/about" className="hover:text-foreground transition-colors">
                À propos
              </Link>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>© 2025 GlucAI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
