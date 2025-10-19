import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, HelpCircle, Book, Send } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-balance">Support & Contact</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nous sommes là pour vous aider. Contactez-nous pour toute question ou problème.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Pour toute question, contactez notre équipe support :
                </p>
                <a
                  href="mailto:support@glucai.app"
                  className="text-primary hover:underline font-medium inline-flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  support@glucai.app
                </a>
                <p className="text-sm text-muted-foreground">Réponse sous 24-48h</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  FAQ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Consultez notre foire aux questions pour des réponses rapides :
                </p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="#faq">
                    <Book className="h-4 w-4 mr-2" />
                    Voir la FAQ
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Formulaire de contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" placeholder="Jean Dupont" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="jean.dupont@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" placeholder="Problème avec l'analyse d'image" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Décrivez votre problème ou votre question en détail..."
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card id="faq">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Questions fréquentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Comment fonctionne l'analyse d'image ?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  GlucAI utilise l'intelligence artificielle pour détecter les aliments dans vos photos et estimer leurs
                  portions. Pour de meilleurs résultats, incluez un objet de référence (main, cuillère) dans la photo.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Les estimations sont-elles précises ?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Les estimations sont approximatives et peuvent varier de ±10-20%. Nous recommandons de toujours
                  vérifier les valeurs nutritionnelles sur les emballages et de consulter votre médecin pour des
                  conseils personnalisés.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Combien d'analyses puis-je faire gratuitement ?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le plan gratuit permet 10 analyses par mois. Pour des analyses illimitées et des fonctionnalités
                  avancées, passez à GlucAI Premium.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Mes données sont-elles sécurisées ?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Oui, toutes vos données sont chiffrées et stockées de manière sécurisée. Nous ne partageons jamais vos
                  informations avec des tiers. Consultez notre{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    politique de confidentialité
                  </Link>{" "}
                  pour plus de détails.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Comment annuler mon abonnement Premium ?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Vous pouvez annuler votre abonnement à tout moment depuis les paramètres de votre profil. Votre accès
                  Premium restera actif jusqu'à la fin de la période payée.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">L'application fonctionne-t-elle hors ligne ?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Non, GlucAI nécessite une connexion internet pour analyser les photos via notre IA. Cependant, vous
                  pouvez consulter votre historique hors ligne.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Puis-je exporter mes données ?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Oui, les utilisateurs Premium peuvent exporter leur historique complet au format PDF ou CSV depuis la
                  page d'historique.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Autres contacts</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Questions commerciales :</strong>{" "}
                  <a href="mailto:contact@glucai.app" className="text-primary hover:underline">
                    contact@glucai.app
                  </a>
                </p>
                <p>
                  <strong>Partenariats :</strong>{" "}
                  <a href="mailto:partnerships@glucai.app" className="text-primary hover:underline">
                    partnerships@glucai.app
                  </a>
                </p>
                <p>
                  <strong>Presse :</strong>{" "}
                  <a href="mailto:press@glucai.app" className="text-primary hover:underline">
                    press@glucai.app
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center pt-8">
            <Link href="/">
              <Button size="lg">Retour à l'accueil</Button>
            </Link>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
