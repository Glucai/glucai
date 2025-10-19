"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface UsageLimitBannerProps {
  currentUsage: number
  limit: number
}

export function UsageLimitBanner({ currentUsage, limit }: UsageLimitBannerProps) {
  const { user } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  if (user?.isPremium || dismissed) return null

  const percentage = (currentUsage / limit) * 100
  const isNearLimit = percentage >= 80

  if (!isNearLimit) return null

  return (
    <Card className="border-primary/50 bg-primary/5">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Crown className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium">
              Vous avez utilisé {currentUsage} analyses sur {limit} ce mois-ci
            </p>
            <p className="text-xs text-muted-foreground">
              Passez à Premium pour des analyses illimitées et plus de fonctionnalités
            </p>
            <Link href="/premium">
              <Button size="sm" className="mt-2">
                Découvrir Premium
              </Button>
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0" onClick={() => setDismissed(true)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
