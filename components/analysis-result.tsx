"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Save, Trash2, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { searchFood, calculateNutrition } from "@/lib/food-database"
import type { FoodData } from "@/lib/food-database"

interface FoodItem {
  name: string
  quantity: number
  unit: string
  carbs: number
  protein?: number
  fat?: number
  calories?: number
}

interface AnalysisResultProps {
  result: {
    foods: FoodItem[]
    totalCarbs: number
    totalCalories?: number
    confidence?: number
    hasCalibration?: boolean
  }
  onReset: () => void
}

export function AnalysisResult({ result, onReset }: AnalysisResultProps) {
  const router = useRouter()
  const [foods, setFoods] = useState<FoodItem[]>(result.foods)
  const [newFood, setNewFood] = useState({ name: "", quantity: 0, unit: "g", carbs: 0 })
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<FoodData[]>([])

  const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0)
  const totalCalories = foods.reduce((sum, food) => sum + (food.calories || 0), 0)

  const updateFood = (index: number, field: keyof FoodItem, value: string | number) => {
    const updated = [...foods]
    updated[index] = { ...updated[index], [field]: value }

    // Recalculer les macros si la quantité change
    if (field === "quantity") {
      const foodData = searchFood(updated[index].name)[0]
      if (foodData) {
        const nutrition = calculateNutrition(foodData.id, value as number)
        updated[index].carbs = Math.round(nutrition.carbs * 10) / 10
        updated[index].protein = Math.round(nutrition.protein * 10) / 10
        updated[index].fat = Math.round(nutrition.fat * 10) / 10
        updated[index].calories = Math.round(nutrition.calories)
      }
    }

    setFoods(updated)
  }

  const removeFood = (index: number) => {
    setFoods(foods.filter((_, i) => i !== index))
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 1) {
      const results = searchFood(query)
      setSearchResults(results.slice(0, 5))
    } else {
      setSearchResults([])
    }
  }

  const selectFood = (foodData: FoodData) => {
    const quantity = foodData.commonServingSize || 100
    const nutrition = calculateNutrition(foodData.id, quantity)

    setFoods([
      ...foods,
      {
        name: foodData.name,
        quantity,
        unit: "g",
        carbs: Math.round(nutrition.carbs * 10) / 10,
        protein: Math.round(nutrition.protein * 10) / 10,
        fat: Math.round(nutrition.fat * 10) / 10,
        calories: Math.round(nutrition.calories),
      },
    ])

    setSearchQuery("")
    setSearchResults([])
    setShowAddForm(false)
  }

  const addManualFood = () => {
    if (newFood.name && newFood.quantity > 0) {
      setFoods([...foods, newFood])
      setNewFood({ name: "", quantity: 0, unit: "g", carbs: 0 })
      setShowAddForm(false)
    }
  }

  const saveMeal = async () => {
    try {
      await fetch("/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foods,
          totalCarbs,
          totalCalories,
          date: new Date().toISOString(),
        }),
      })
      router.push("/history")
    } catch (err) {
      console.error("[v0] Erreur de sauvegarde:", err)
      alert("Erreur lors de la sauvegarde. Veuillez réessayer.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onReset}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Résultats de l'analyse</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-4xl font-bold text-center">{totalCarbs.toFixed(1)} g</CardTitle>
              <CardDescription className="text-center text-base">Total de glucides</CardDescription>
            </CardHeader>
            {totalCalories > 0 && (
              <CardContent className="pt-0">
                <p className="text-center text-sm text-muted-foreground">{totalCalories} calories</p>
              </CardContent>
            )}
          </Card>

          {result.hasCalibration && (
            <div className="text-center text-sm text-muted-foreground bg-accent/10 p-3 rounded-lg">
              ✓ Objet de référence détecté - Estimation des portions améliorée
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Aliments détectés</CardTitle>
              <CardDescription>Modifiez les quantités ou ajoutez des aliments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {foods.map((food, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{food.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {food.quantity} {food.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{food.carbs.toFixed(1)} g</p>
                      <p className="text-xs text-muted-foreground">glucides</p>
                    </div>
                  </div>

                  {(food.protein !== undefined || food.calories !== undefined) && (
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      {food.protein !== undefined && (
                        <div>
                          <span className="font-medium">Protéines:</span> {food.protein.toFixed(1)}g
                        </div>
                      )}
                      {food.fat !== undefined && (
                        <div>
                          <span className="font-medium">Lipides:</span> {food.fat.toFixed(1)}g
                        </div>
                      )}
                      {food.calories !== undefined && (
                        <div>
                          <span className="font-medium">Calories:</span> {food.calories}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`quantity-${index}`} className="text-xs">
                        Quantité (g)
                      </Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        value={food.quantity}
                        onChange={(e) => updateFood(index, "quantity", Number.parseFloat(e.target.value))}
                        className="h-8"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`carbs-${index}`} className="text-xs">
                        Glucides (g)
                      </Label>
                      <Input
                        id={`carbs-${index}`}
                        type="number"
                        step="0.1"
                        value={food.carbs}
                        onChange={(e) => updateFood(index, "carbs", Number.parseFloat(e.target.value))}
                        className="h-8"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFood(index)}
                    className="w-full text-destructive hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </Button>
                </div>
              ))}

              {showAddForm ? (
                <div className="p-4 border-2 border-dashed rounded-lg space-y-3">
                  <div className="relative">
                    <Label htmlFor="search-food">Rechercher un aliment</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search-food"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Ex: riz, poulet, tomate..."
                        className="pl-9"
                      />
                    </div>
                    {searchResults.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-popover border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {searchResults.map((food) => (
                          <button
                            key={food.id}
                            onClick={() => selectFood(food)}
                            className="w-full px-4 py-2 text-left hover:bg-accent transition-colors"
                          >
                            <div className="font-medium">{food.name}</div>
                            <div className="text-xs text-muted-foreground">{food.carbsPer100g}g glucides / 100g</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">ou saisie manuelle</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="new-food-name">Nom de l'aliment</Label>
                    <Input
                      id="new-food-name"
                      value={newFood.name}
                      onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                      placeholder="Ex: Sauce curry"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="new-food-quantity">Quantité (g)</Label>
                      <Input
                        id="new-food-quantity"
                        type="number"
                        value={newFood.quantity || ""}
                        onChange={(e) => setNewFood({ ...newFood, quantity: Number.parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-food-carbs">Glucides (g)</Label>
                      <Input
                        id="new-food-carbs"
                        type="number"
                        step="0.1"
                        value={newFood.carbs || ""}
                        onChange={(e) => setNewFood({ ...newFood, carbs: Number.parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addManualFood} className="flex-1">
                      Ajouter
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <Button variant="outline" onClick={() => setShowAddForm(true)} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un aliment
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4">
        <div className="container mx-auto max-w-2xl flex gap-2">
          <Button onClick={saveMeal} className="flex-1" size="lg">
            <Save className="mr-2 h-5 w-5" />
            Enregistrer le repas
          </Button>
          <Button onClick={onReset} variant="outline" size="lg">
            Nouvelle analyse
          </Button>
        </div>
      </div>
    </div>
  )
}
