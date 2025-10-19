import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText, UserCheck, Database } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-balance">Politique de confidentialité</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Chez GlucAI, nous prenons la protection de vos données personnelles très au sérieux. Cette politique
              explique comment nous collectons, utilisons et protégeons vos informations.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Données collectées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Nous collectons les types de données suivants :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Informations de compte :</strong> nom, adresse e-mail, mot de passe (chiffré)
                </li>
                <li>
                  <strong>Photos de repas :</strong> images que vous téléchargez pour analyse
                </li>
                <li>
                  <strong>Données nutritionnelles :</strong> résultats d'analyse, historique des repas, statistiques
                </li>
                <li>
                  <strong>Données d'utilisation :</strong> fréquence d'utilisation, fonctionnalités utilisées
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Traitement des images par IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Les photos de vos repas sont traitées par notre système d'intelligence artificielle pour détecter les
                aliments et estimer les portions.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Les images sont analysées de manière sécurisée sur nos serveurs</li>
                <li>Elles ne sont jamais partagées avec des tiers</li>
                <li>Vous pouvez supprimer vos images à tout moment depuis l'historique</li>
                <li>Les images sont automatiquement supprimées après 90 jours</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Conservation des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Nous conservons vos données selon les durées suivantes :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Compte actif :</strong> tant que votre compte est actif
                </li>
                <li>
                  <strong>Photos de repas :</strong> 90 jours maximum
                </li>
                <li>
                  <strong>Historique nutritionnel :</strong> conservé tant que vous ne le supprimez pas
                </li>
                <li>
                  <strong>Après suppression du compte :</strong> toutes les données sont supprimées sous 30 jours
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Sécurité des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Nous mettons en œuvre des mesures de sécurité strictes :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Chiffrement SSL/TLS pour toutes les communications</li>
                <li>Mots de passe chiffrés avec algorithmes modernes</li>
                <li>Serveurs sécurisés dans l'Union Européenne</li>
                <li>Accès restreint aux données par notre équipe</li>
                <li>Audits de sécurité réguliers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Vos droits (RGPD)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Droit d'accès :</strong> consulter toutes vos données personnelles
                </li>
                <li>
                  <strong>Droit de rectification :</strong> corriger vos informations
                </li>
                <li>
                  <strong>Droit à l'effacement :</strong> supprimer votre compte et toutes vos données
                </li>
                <li>
                  <strong>Droit à la portabilité :</strong> exporter vos données dans un format standard
                </li>
                <li>
                  <strong>Droit d'opposition :</strong> refuser certains traitements de données
                </li>
              </ul>
              <p className="pt-4">
                Pour exercer ces droits, contactez-nous à{" "}
                <a href="mailto:privacy@glucai.app" className="text-primary hover:underline">
                  privacy@glucai.app
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Partage des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong>Nous ne vendons jamais vos données personnelles.</strong>
              </p>
              <p>Vos données peuvent être partagées uniquement dans les cas suivants :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Avec votre consentement explicite</li>
                <li>Pour se conformer à des obligations légales</li>
                <li>Avec des prestataires de services (hébergement, paiement) sous contrat strict</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Contact</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pour toute question concernant cette politique de confidentialité ou vos données personnelles,
                contactez-nous :
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email :</strong>{" "}
                  <a href="mailto:privacy@glucai.app" className="text-primary hover:underline">
                    privacy@glucai.app
                  </a>
                </p>
                <p>
                  <strong>Délégué à la protection des données :</strong>{" "}
                  <a href="mailto:dpo@glucai.app" className="text-primary hover:underline">
                    dpo@glucai.app
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
