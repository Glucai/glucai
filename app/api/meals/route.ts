import { NextResponse } from "next/server"

let mealsDB: any[] = []

// Initialiser avec des données de démonstration
if (mealsDB.length === 0) {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const twoDaysAgo = new Date(now)
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

  mealsDB = [
    {
      id: "demo-1",
      foods: [
        { name: "Riz blanc", quantity: 150, unit: "g", carbs: 42.0, calories: 195 },
        { name: "Poulet grillé", quantity: 120, unit: "g", carbs: 0.0, calories: 198 },
        { name: "Brocoli", quantity: 80, unit: "g", carbs: 5.6, calories: 27 },
      ],
      totalCarbs: 47.6,
      totalCalories: 420,
      date: twoDaysAgo.toISOString(),
    },
    {
      id: "demo-2",
      foods: [
        { name: "Pâtes cuites", quantity: 200, unit: "g", carbs: 50.0, calories: 262 },
        { name: "Sauce tomate", quantity: 50, unit: "g", carbs: 3.5, calories: 16 },
      ],
      totalCarbs: 53.5,
      totalCalories: 278,
      date: yesterday.toISOString(),
    },
    {
      id: "demo-3",
      foods: [
        { name: "Pain blanc", quantity: 50, unit: "g", carbs: 24.5, calories: 133 },
        { name: "Œuf", quantity: 100, unit: "g", carbs: 1.1, calories: 155 },
      ],
      totalCarbs: 25.6,
      totalCalories: 288,
      date: now.toISOString(),
    },
  ]
}

export async function POST(request: Request) {
  try {
    const meal = await request.json()
    const mealWithId = {
      id: Date.now().toString(),
      ...meal,
    }
    mealsDB.push(mealWithId)

    return NextResponse.json({ success: true, meal: mealWithId })
  } catch (error) {
    console.error("[v0] Erreur de sauvegarde:", error)
    return NextResponse.json({ error: "Erreur lors de la sauvegarde" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const sortedMeals = [...mealsDB].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json({ meals: sortedMeals })
  } catch (error) {
    console.error("[v0] Erreur de récupération:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 })
  }
}
