import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, UserX } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-balance">Conditions d'utilisation</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En utilisant GlucAI, vous acceptez les présentes conditions d'utilisation. Veuillez les lire
              attentivement.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Acceptation des conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                En accédant et en utilisant GlucAI, vous acceptez d'être lié par ces conditions d'utilisation et toutes
                les lois et réglementations applicables.
              </p>
              <p>
                Si vous n'acceptez pas l'une de ces conditions, vous n'êtes pas autorisé à utiliser ou accéder à ce
                service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Avertissement médical
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground">
                GlucAI est un outil d'assistance et ne remplace pas un avis médical professionnel.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Les estimations de glucides sont approximatives et peuvent contenir des erreurs</li>
                <li>Ne vous fiez pas uniquement à GlucAI pour gérer votre diabète</li>
                <li>Consultez toujours votre médecin ou diététicien pour des conseils personnalisés</li>
                <li>En cas de doute, vérifiez les valeurs nutritionnelles sur les emballages</li>
                <li>GlucAI n'est pas un dispositif médical certifié</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Utilisation autorisée
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Vous êtes autorisé à :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Utiliser GlucAI pour votre usage personnel</li>
                <li>Télécharger des photos de vos repas pour analyse</li>
                <li>Consulter et exporter votre historique nutritionnel</li>
                <li>Partager vos résultats avec vos professionnels de santé</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-primary" />
                Utilisation interdite
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Il est strictement interdit de :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Utiliser GlucAI à des fins commerciales sans autorisation</li>
                <li>Tenter de contourner les limitations du service</li>
                <li>Partager votre compte avec d'autres personnes</li>
                <li>Télécharger du contenu inapproprié ou illégal</li>
                <li>Utiliser des robots ou scripts automatisés</li>
                <li>Tenter d'accéder aux systèmes ou données d'autres utilisateurs</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Limitation de responsabilité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                GlucAI est fourni "tel quel" sans garantie d'aucune sorte. Nous ne garantissons pas que le service sera
                :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Toujours disponible ou sans interruption</li>
                <li>Exempt d'erreurs ou de bugs</li>
                <li>100% précis dans ses estimations nutritionnelles</li>
                <li>Compatible avec tous les appareils</li>
              </ul>
              <p className="pt-4">
                Nous ne sommes pas responsables des dommages directs ou indirects résultant de l'utilisation de GlucAI,
                y compris les problèmes de santé liés à des estimations incorrectes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserX className="h-5 w-5 text-primary" />
                Résiliation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Nous nous réservons le droit de :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Suspendre ou résilier votre compte en cas de violation des conditions</li>
                <li>Modifier ou interrompre le service à tout moment</li>
                <li>Refuser le service à quiconque pour quelque raison que ce soit</li>
              </ul>
              <p className="pt-4">
                Vous pouvez supprimer votre compte à tout moment depuis les paramètres de votre profil.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Modifications des conditions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en
                vigueur dès leur publication. Votre utilisation continue du service après les modifications constitue
                votre acceptation des nouvelles conditions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Contact</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pour toute question concernant ces conditions d'utilisation :
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email :</strong>{" "}
                  <a href="mailto:legal@glucai.app" className="text-primary hover:underline">
                    legal@glucai.app
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
