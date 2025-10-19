// Base de données nutritionnelles CIQUAL (France) - Échantillon
// Dans une vraie app, ceci serait une vraie base de données ou API

export interface FoodData {
  id: string
  name: string
  category: string
  carbsPer100g: number
  proteinPer100g: number
  fatPer100g: number
  caloriesPer100g: number
  commonServingSize?: number
  aliases?: string[]
}

export const FOOD_DATABASE: FoodData[] = [
  // Féculents
  {
    id: "riz-blanc",
    name: "Riz blanc cuit",
    category: "Féculents",
    carbsPer100g: 28.0,
    proteinPer100g: 2.7,
    fatPer100g: 0.3,
    caloriesPer100g: 130,
    commonServingSize: 150,
    aliases: ["riz", "riz basmati", "riz long"],
  },
  {
    id: "pates",
    name: "Pâtes cuites",
    category: "Féculents",
    carbsPer100g: 25.0,
    proteinPer100g: 5.0,
    fatPer100g: 0.9,
    caloriesPer100g: 131,
    commonServingSize: 200,
    aliases: ["pâtes", "spaghetti", "macaroni", "penne"],
  },
  {
    id: "pain-blanc",
    name: "Pain blanc",
    category: "Féculents",
    carbsPer100g: 49.0,
    proteinPer100g: 8.0,
    fatPer100g: 3.3,
    caloriesPer100g: 265,
    commonServingSize: 50,
    aliases: ["pain", "baguette", "pain de mie"],
  },
  {
    id: "pomme-terre",
    name: "Pomme de terre cuite",
    category: "Féculents",
    carbsPer100g: 20.0,
    proteinPer100g: 2.0,
    fatPer100g: 0.1,
    caloriesPer100g: 86,
    commonServingSize: 150,
    aliases: ["pommes de terre", "patate", "purée"],
  },
  {
    id: "quinoa",
    name: "Quinoa cuit",
    category: "Féculents",
    carbsPer100g: 21.3,
    proteinPer100g: 4.4,
    fatPer100g: 1.9,
    caloriesPer100g: 120,
    commonServingSize: 150,
  },

  // Protéines
  {
    id: "poulet",
    name: "Poulet grillé",
    category: "Protéines",
    carbsPer100g: 0.0,
    proteinPer100g: 31.0,
    fatPer100g: 3.6,
    caloriesPer100g: 165,
    commonServingSize: 120,
    aliases: ["poulet", "blanc de poulet", "escalope de poulet"],
  },
  {
    id: "saumon",
    name: "Saumon",
    category: "Protéines",
    carbsPer100g: 0.0,
    proteinPer100g: 20.0,
    fatPer100g: 13.0,
    caloriesPer100g: 208,
    commonServingSize: 150,
  },
  {
    id: "oeuf",
    name: "Œuf",
    category: "Protéines",
    carbsPer100g: 1.1,
    proteinPer100g: 13.0,
    fatPer100g: 11.0,
    caloriesPer100g: 155,
    commonServingSize: 50,
    aliases: ["oeufs", "œufs"],
  },
  {
    id: "boeuf",
    name: "Bœuf",
    category: "Protéines",
    carbsPer100g: 0.0,
    proteinPer100g: 26.0,
    fatPer100g: 15.0,
    caloriesPer100g: 250,
    commonServingSize: 120,
    aliases: ["viande", "steak", "boeuf"],
  },

  // Légumes
  {
    id: "brocoli",
    name: "Brocoli",
    category: "Légumes",
    carbsPer100g: 7.0,
    proteinPer100g: 2.8,
    fatPer100g: 0.4,
    caloriesPer100g: 34,
    commonServingSize: 80,
  },
  {
    id: "carotte",
    name: "Carotte",
    category: "Légumes",
    carbsPer100g: 10.0,
    proteinPer100g: 0.9,
    fatPer100g: 0.2,
    caloriesPer100g: 41,
    commonServingSize: 80,
    aliases: ["carottes"],
  },
  {
    id: "tomate",
    name: "Tomate",
    category: "Légumes",
    carbsPer100g: 3.9,
    proteinPer100g: 0.9,
    fatPer100g: 0.2,
    caloriesPer100g: 18,
    commonServingSize: 100,
    aliases: ["tomates"],
  },
  {
    id: "salade",
    name: "Salade verte",
    category: "Légumes",
    carbsPer100g: 2.9,
    proteinPer100g: 1.4,
    fatPer100g: 0.2,
    caloriesPer100g: 15,
    commonServingSize: 50,
    aliases: ["laitue", "salade"],
  },
  {
    id: "haricots-verts",
    name: "Haricots verts",
    category: "Légumes",
    carbsPer100g: 7.0,
    proteinPer100g: 1.8,
    fatPer100g: 0.1,
    caloriesPer100g: 31,
    commonServingSize: 100,
  },

  // Fruits
  {
    id: "pomme",
    name: "Pomme",
    category: "Fruits",
    carbsPer100g: 14.0,
    proteinPer100g: 0.3,
    fatPer100g: 0.2,
    caloriesPer100g: 52,
    commonServingSize: 150,
    aliases: ["pommes"],
  },
  {
    id: "banane",
    name: "Banane",
    category: "Fruits",
    carbsPer100g: 23.0,
    proteinPer100g: 1.1,
    fatPer100g: 0.3,
    caloriesPer100g: 89,
    commonServingSize: 120,
    aliases: ["bananes"],
  },
  {
    id: "orange",
    name: "Orange",
    category: "Fruits",
    carbsPer100g: 12.0,
    proteinPer100g: 0.9,
    fatPer100g: 0.1,
    caloriesPer100g: 47,
    commonServingSize: 150,
    aliases: ["oranges"],
  },

  // Produits laitiers
  {
    id: "yaourt-nature",
    name: "Yaourt nature",
    category: "Produits laitiers",
    carbsPer100g: 4.7,
    proteinPer100g: 3.5,
    fatPer100g: 1.0,
    caloriesPer100g: 61,
    commonServingSize: 125,
    aliases: ["yaourt", "yogourt"],
  },
  {
    id: "fromage",
    name: "Fromage",
    category: "Produits laitiers",
    carbsPer100g: 1.3,
    proteinPer100g: 25.0,
    fatPer100g: 33.0,
    caloriesPer100g: 402,
    commonServingSize: 30,
  },
  {
    id: "lait",
    name: "Lait demi-écrémé",
    category: "Produits laitiers",
    carbsPer100g: 4.8,
    proteinPer100g: 3.2,
    fatPer100g: 1.6,
    caloriesPer100g: 46,
    commonServingSize: 200,
  },

  // Sauces et condiments
  {
    id: "sauce-tomate",
    name: "Sauce tomate",
    category: "Sauces",
    carbsPer100g: 7.0,
    proteinPer100g: 1.6,
    fatPer100g: 0.2,
    caloriesPer100g: 32,
    commonServingSize: 50,
  },
  {
    id: "ketchup",
    name: "Ketchup",
    category: "Sauces",
    carbsPer100g: 27.0,
    proteinPer100g: 1.0,
    fatPer100g: 0.1,
    caloriesPer100g: 112,
    commonServingSize: 20,
  },
  {
    id: "mayonnaise",
    name: "Mayonnaise",
    category: "Sauces",
    carbsPer100g: 0.6,
    proteinPer100g: 1.1,
    fatPer100g: 79.0,
    caloriesPer100g: 721,
    commonServingSize: 15,
  },
]

// Fonction de recherche d'aliment
export function searchFood(query: string): FoodData[] {
  const lowerQuery = query.toLowerCase().trim()
  return FOOD_DATABASE.filter(
    (food) =>
      food.name.toLowerCase().includes(lowerQuery) ||
      food.aliases?.some((alias) => alias.toLowerCase().includes(lowerQuery)),
  )
}

// Fonction pour obtenir un aliment par ID
export function getFoodById(id: string): FoodData | undefined {
  return FOOD_DATABASE.find((food) => food.id === id)
}

// Calculer les glucides pour une quantité donnée
export function calculateCarbs(foodId: string, quantity: number): number {
  const food = getFoodById(foodId)
  if (!food) return 0
  return (food.carbsPer100g * quantity) / 100
}

// Calculer les macros complètes
export interface NutritionInfo {
  carbs: number
  protein: number
  fat: number
  calories: number
}

export function calculateNutrition(foodId: string, quantity: number): NutritionInfo {
  const food = getFoodById(foodId)
  if (!food) {
    return { carbs: 0, protein: 0, fat: 0, calories: 0 }
  }

  const factor = quantity / 100
  return {
    carbs: food.carbsPer100g * factor,
    protein: food.proteinPer100g * factor,
    fat: food.fatPer100g * factor,
    calories: food.caloriesPer100g * factor,
  }
}
