import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Mail, Globe, FileText, Scale } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"

export default function LegalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-balance">Mentions légales</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Informations légales concernant GlucAI</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Éditeur du site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="space-y-2">
                <p>
                  <strong>Raison sociale :</strong> GlucAI SAS
                </p>
                <p>
                  <strong>Forme juridique :</strong> Société par Actions Simplifiée
                </p>
                <p>
                  <strong>Capital social :</strong> 10 000 €
                </p>
                <p>
                  <strong>Siège social :</strong> 123 Avenue de la Santé, 75013 Paris, France
                </p>
                <p>
                  <strong>SIRET :</strong> 123 456 789 00012
                </p>
                <p>
                  <strong>RCS :</strong> Paris B 123 456 789
                </p>
                <p>
                  <strong>TVA intracommunautaire :</strong> FR12 123456789
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="space-y-2">
                <p>
                  <strong>Email général :</strong>{" "}
                  <a href="mailto:contact@glucai.app" className="text-primary hover:underline">
                    contact@glucai.app
                  </a>
                </p>
                <p>
                  <strong>Support technique :</strong>{" "}
                  <a href="mailto:support@glucai.app" className="text-primary hover:underline">
                    support@glucai.app
                  </a>
                </p>
                <p>
                  <strong>Questions légales :</strong>{" "}
                  <a href="mailto:legal@glucai.app" className="text-primary hover:underline">
                    legal@glucai.app
                  </a>
                </p>
                <p>
                  <strong>Téléphone :</strong> +33 1 23 45 67 89
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Directeur de la publication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong>Nom :</strong> Jean Dupont
              </p>
              <p>
                <strong>Fonction :</strong> Président de GlucAI SAS
              </p>
              <p>
                <strong>Email :</strong>{" "}
                <a href="mailto:direction@glucai.app" className="text-primary hover:underline">
                  direction@glucai.app
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Hébergement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="space-y-2">
                <p>
                  <strong>Hébergeur :</strong> Vercel Inc.
                </p>
                <p>
                  <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
                </p>
                <p>
                  <strong>Site web :</strong>{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    vercel.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Propriété intellectuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                L'ensemble du contenu de ce site (textes, images, logos, icônes, sons, logiciels) est la propriété
                exclusive de GlucAI SAS ou de ses partenaires.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments
                du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable
                de GlucAI SAS.
              </p>
              <p>
                <strong>Marques déposées :</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>GlucAI® - Marque déposée auprès de l'INPI</li>
                <li>Logo GlucAI - Marque déposée auprès de l'INPI</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Protection des données personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et
                Libertés, vous disposez de droits sur vos données personnelles.
              </p>
              <p>
                <strong>Délégué à la Protection des Données (DPO) :</strong>
              </p>
              <p>
                Email :{" "}
                <a href="mailto:dpo@glucai.app" className="text-primary hover:underline">
                  dpo@glucai.app
                </a>
              </p>
              <p>
                Pour plus d'informations, consultez notre{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Politique de confidentialité
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Ce site utilise des cookies pour améliorer votre expérience utilisateur et analyser le trafic. En
                continuant à utiliser ce site, vous acceptez l'utilisation de cookies.
              </p>
              <p>Types de cookies utilisés :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site
                </li>
                <li>
                  <strong>Cookies de performance :</strong> pour analyser l'utilisation du site
                </li>
                <li>
                  <strong>Cookies de préférence :</strong> pour mémoriser vos choix
                </li>
              </ul>
              <p>Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.</p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Litiges</h3>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut d'accord
                amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en
                vigueur.
              </p>
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
