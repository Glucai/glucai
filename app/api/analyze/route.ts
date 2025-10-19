import { NextResponse } from "next/server"
import { analyzeFoodImage } from "@/lib/ai-detection"

export async function POST(request: Request) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "Image manquante" }, { status: 400 })
    }

    // Analyser l'image avec le système de détection IA
    const result = await analyzeFoodImage(image)

    return NextResponse.json({
      ...result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Erreur d'analyse:", error)
    return NextResponse.json({ error: "Erreur lors de l'analyse de l'image" }, { status: 500 })
  }
}
