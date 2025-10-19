// Simulation de détection IA - À remplacer par YOLOv8 ou FoodSeg103

export interface DetectedFood {
  name: string
  confidence: number
  boundingBox?: {
    x: number
    y: number
    width: number
    height: number
  }
  estimatedWeight?: number
}

export interface CalibrationObject {
  type: "hand" | "spoon"
  size: number // en pixels
}

// Détection d'objets de référence pour calibration
export function detectCalibrationObject(imageData: string): CalibrationObject | null {
  // Simulation - Dans la vraie app, utiliser un modèle de détection
  // Pour détecter une main ou une cuillère
  const random = Math.random()

  if (random > 0.3) {
    return {
      type: "hand",
      size: 180, // pixels
    }
  }

  return null
}

// Estimation de l'échelle basée sur l'objet de référence
export function calculateScale(calibrationObject: CalibrationObject | null): number {
  if (!calibrationObject) {
    return 1.0 // Échelle par défaut
  }

  // Taille réelle moyenne d'une main : 18cm
  // Taille réelle moyenne d'une cuillère : 15cm
  const realSize = calibrationObject.type === "hand" ? 18 : 15
  const pixelSize = calibrationObject.size

  // Retourner le ratio cm/pixel
  return realSize / pixelSize
}

// Estimation du poids basée sur la taille visuelle et l'échelle
export function estimateWeight(foodArea: number, scale: number, foodType: string): number {
  // Densité approximative par type d'aliment (g/cm³)
  const densities: Record<string, number> = {
    riz: 0.8,
    pates: 0.7,
    pain: 0.3,
    viande: 1.0,
    legumes: 0.6,
    fruits: 0.9,
    sauce: 1.0,
    default: 0.8,
  }

  // Trouver la densité appropriée
  let density = densities.default
  for (const [key, value] of Object.entries(densities)) {
    if (foodType.toLowerCase().includes(key)) {
      density = value
      break
    }
  }

  // Calculer le volume approximatif (en supposant une hauteur moyenne de 2cm)
  const areaInCm2 = foodArea * scale * scale
  const volumeInCm3 = areaInCm2 * 2 // hauteur moyenne

  // Calculer le poids
  return volumeInCm3 * density
}

// Fonction principale de détection
export async function detectFoods(imageData: string): Promise<DetectedFood[]> {
  // Simulation - Dans la vraie app, appeler l'API YOLOv8/FoodSeg103
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Détecter l'objet de calibration
  const calibrationObject = detectCalibrationObject(imageData)
  const scale = calculateScale(calibrationObject)

  // Résultats simulés avec estimation de poids
  const mockDetections: DetectedFood[] = [
    {
      name: "Riz blanc",
      confidence: 0.92,
      boundingBox: { x: 100, y: 150, width: 200, height: 180 },
      estimatedWeight: estimateWeight(200 * 180, scale, "riz"),
    },
    {
      name: "Poulet grillé",
      confidence: 0.88,
      boundingBox: { x: 350, y: 200, width: 150, height: 120 },
      estimatedWeight: estimateWeight(150 * 120, scale, "viande"),
    },
    {
      name: "Brocoli",
      confidence: 0.85,
      boundingBox: { x: 150, y: 350, width: 120, height: 100 },
      estimatedWeight: estimateWeight(120 * 100, scale, "legumes"),
    },
  ]

  return mockDetections
}

// Mapper les détections aux données nutritionnelles
export interface FoodWithNutrition {
  name: string
  quantity: number
  unit: string
  carbs: number
  protein: number
  fat: number
  calories: number
  confidence: number
}

export async function analyzeFoodImage(imageData: string): Promise<{
  foods: FoodWithNutrition[]
  totalCarbs: number
  totalCalories: number
  hasCalibration: boolean
}> {
  const { searchFood, calculateNutrition } = await import("./food-database")

  // Détecter les aliments
  const detections = await detectFoods(imageData)

  // Mapper aux données nutritionnelles
  const foods: FoodWithNutrition[] = detections.map((detection) => {
    const foodResults = searchFood(detection.name)
    const foodData = foodResults[0] // Prendre le premier résultat

    if (!foodData) {
      return {
        name: detection.name,
        quantity: detection.estimatedWeight || 100,
        unit: "g",
        carbs: 0,
        protein: 0,
        fat: 0,
        calories: 0,
        confidence: detection.confidence,
      }
    }

    const quantity = detection.estimatedWeight || foodData.commonServingSize || 100
    const nutrition = calculateNutrition(foodData.id, quantity)

    return {
      name: foodData.name,
      quantity: Math.round(quantity),
      unit: "g",
      carbs: Math.round(nutrition.carbs * 10) / 10,
      protein: Math.round(nutrition.protein * 10) / 10,
      fat: Math.round(nutrition.fat * 10) / 10,
      calories: Math.round(nutrition.calories),
      confidence: detection.confidence,
    }
  })

  const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0)
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0)

  return {
    foods,
    totalCarbs: Math.round(totalCarbs * 10) / 10,
    totalCalories: Math.round(totalCalories),
    hasCalibration: detectCalibrationObject(imageData) !== null,
  }
}
