import { NextResponse } from "next/server"

// Simuler une base de données en mémoire (partagée avec route.ts)
// Dans une vraie app, utiliser une vraie base de données
const mealsDB: any[] = []

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const index = mealsDB.findIndex((meal) => meal.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Repas non trouvé" }, { status: 404 })
    }

    mealsDB.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Erreur de suppression:", error)
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const meal = mealsDB.find((meal) => meal.id === id)

    if (!meal) {
      return NextResponse.json({ error: "Repas non trouvé" }, { status: 404 })
    }

    return NextResponse.json({ meal })
  } catch (error) {
    console.error("[v0] Erreur de récupération:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 })
  }
}
