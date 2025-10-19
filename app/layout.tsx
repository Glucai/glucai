import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "GlucAI - Compteur de Glucides Intelligent",
  description: "Application pour diabétiques permettant de compter les glucides via photo",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#7c3aed",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GlucAI",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
