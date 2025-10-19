// Système de stockage local pour les repas
// Dans une vraie app, utiliser une vraie base de données (Supabase, etc.)

export interface StoredMeal {
  id: string
  userId: string
  foods: any[]
  totalCarbs: number
  totalCalories?: number
  date: string
}

const STORAGE_KEY = "glucai_meals"

export function saveMealToStorage(meal: Omit<StoredMeal, "id">): StoredMeal {
  const meals = getMealsFromStorage()
  const newMeal: StoredMeal = {
    ...meal,
    id: Date.now().toString(),
  }

  meals.push(newMeal)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(meals))

  return newMeal
}

export function getMealsFromStorage(userId?: string): StoredMeal[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  const meals: StoredMeal[] = JSON.parse(stored)

  if (userId) {
    return meals.filter((meal) => meal.userId === userId)
  }

  return meals
}

export function deleteMealFromStorage(mealId: string): boolean {
  const meals = getMealsFromStorage()
  const filtered = meals.filter((meal) => meal.id !== mealId)

  if (filtered.length === meals.length) {
    return false // Meal not found
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}

export function clearAllMeals(): void {
  localStorage.removeItem(STORAGE_KEY)
}
