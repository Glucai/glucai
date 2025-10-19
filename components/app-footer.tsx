import Link from "next/link"

export function AppFooter() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">GlucAI</h3>
            <p className="text-sm text-muted-foreground">
              Votre assistant IA pour compter les glucides et gérer votre diabète au quotidien.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Informations légales</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Politique de confidentialité (RGPD)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:contact@glucai.fr"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  contact@glucai.fr
                </a>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support & Aide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GlucAI. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
