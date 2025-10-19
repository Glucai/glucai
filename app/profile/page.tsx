"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, Crown, User, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }
    setFormData((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email,
    }))
  }, [user, router])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user in localStorage
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
      }
      localStorage.setItem("glucai_user", JSON.stringify(updatedUser))

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error("Profile update error:", error)
      alert("Erreur lors de la mise à jour du profil")
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return
    }

    if (formData.newPassword.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("Mot de passe modifié avec succès")
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (error) {
      console.error("Password change error:", error)
      alert("Erreur lors du changement de mot de passe")
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className={user.isPremium ? "border-primary bg-primary/5" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{user.name || "Utilisateur"}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </div>
                {user.isPremium && (
                  <div className="flex items-center gap-2 text-primary">
                    <Crown className="h-5 w-5" />
                    <span className="text-sm font-semibold">Premium</span>
                  </div>
                )}
              </div>
            </CardHeader>
            {!user.isPremium && (
              <CardContent>
                <Button className="w-full" asChild>
                  <a href="/premium">
                    <Crown className="mr-2 h-4 w-4" />
                    Passer à Premium
                  </a>
                </Button>
              </CardContent>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations personnelles
              </CardTitle>
              <CardDescription>Modifiez vos informations de profil</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.com"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>

                {success && <p className="text-sm text-green-600 text-center">Profil mis à jour avec succès !</p>}
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Changer le mot de passe
              </CardTitle>
              <CardDescription>Modifiez votre mot de passe de connexion</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>

                <Button type="submit" disabled={loading} variant="outline" className="w-full bg-transparent">
                  <Lock className="mr-2 h-4 w-4" />
                  {loading ? "Modification..." : "Changer le mot de passe"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistiques du compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Membre depuis</span>
                <span className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type de compte</span>
                <span className="font-medium">{user.isPremium ? "Premium" : "Gratuit"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
