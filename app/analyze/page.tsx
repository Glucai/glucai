"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Upload, Loader2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { AnalysisResult } from "@/components/analysis-result"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"

export default function AnalyzePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [useCamera, setUseCamera] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const FREE_LIMIT = 10

  useEffect(() => {
    if (user && !user.isPremium) {
      const count = Number.parseInt(localStorage.getItem("glucai_analysis_count") || "0")
      if (count >= FREE_LIMIT) {
        alert("Vous avez atteint votre limite mensuelle. Passez à Premium pour continuer.")
        router.push("/premium")
      }
    }
  }, [user, router])

  // Démarrer la caméra
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setUseCamera(true)
      }
    } catch (err) {
      console.error("Erreur d'accès à la caméra:", err)
      alert("Impossible d'accéder à la caméra. Veuillez vérifier les permissions.")
    }
  }, [])

  // Arrêter la caméra
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setUseCamera(false)
  }, [])

  // Capturer une photo
  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg", 0.9)
        setCapturedImage(imageData)
        stopCamera()
      }
    }
  }, [stopCamera])

  // Gérer l'upload de fichier
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  // Analyser l'image
  const analyzeImage = async () => {
    if (!capturedImage) return

    setAnalyzing(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: capturedImage }),
      })

      const result = await response.json()
      setAnalysisResult(result)

      if (user && !user.isPremium) {
        const count = Number.parseInt(localStorage.getItem("glucai_analysis_count") || "0")
        localStorage.setItem("glucai_analysis_count", (count + 1).toString())
      }
    } catch (err) {
      console.error("Erreur d'analyse:", err)
      alert("Erreur lors de l'analyse. Veuillez réessayer.")
    } finally {
      setAnalyzing(false)
    }
  }

  // Réinitialiser
  const reset = () => {
    setCapturedImage(null)
    setAnalysisResult(null)
    stopCamera()
  }

  if (!user) {
    router.push("/")
    return null
  }

  if (analysisResult) {
    return <AnalysisResult result={analysisResult} onReset={reset} />
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {!capturedImage ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Prendre une photo</CardTitle>
                  <CardDescription>
                    Incluez un objet de référence (main ou cuillère) pour une meilleure estimation des portions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {useCamera ? (
                    <div className="space-y-4">
                      <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={capturePhoto} className="flex-1" size="lg">
                          <Camera className="mr-2 h-5 w-5" />
                          Capturer
                        </Button>
                        <Button onClick={stopCamera} variant="outline" size="lg">
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button onClick={startCamera} className="w-full" size="lg">
                        <Camera className="mr-2 h-5 w-5" />
                        Ouvrir la caméra
                      </Button>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">ou</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="w-full"
                        size="lg"
                      >
                        <Upload className="mr-2 h-5 w-5" />
                        Choisir une photo
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-base">Conseils pour une meilleure analyse</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Prenez la photo en vue de dessus</p>
                  <p>• Assurez-vous que tous les aliments sont visibles</p>
                  <p>• Incluez votre main ou une cuillère pour l'échelle</p>
                  <p>• Évitez les ombres importantes</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Photo capturée</CardTitle>
                <CardDescription>Vérifiez que tous les aliments sont bien visibles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Repas capturé"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={analyzeImage} disabled={analyzing} className="flex-1" size="lg">
                    {analyzing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyse en cours...
                      </>
                    ) : (
                      "Analyser"
                    )}
                  </Button>
                  <Button onClick={reset} variant="outline" size="lg">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <canvas ref={canvasRef} className="hidden" />

      <AppFooter />
    </div>
  )
}
