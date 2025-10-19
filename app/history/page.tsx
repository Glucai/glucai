"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  Trash2,
  Download,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FoodItem {
  name: string
  quantity: number
  unit: string
  carbs: number
  protein?: number
  fat?: number
  calories?: number
}

interface Meal {
  id: string
  foods: FoodItem[]
  totalCarbs: number
  totalCalories?: number
  date: string
}

export default function HistoryPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [stats, setStats] = useState({
    totalMeals: 0,
    avgCarbs: 0,
    totalCarbs: 0,
    last7Days: 0,
  })

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }
    loadMeals()
  }, [user, router])

  const loadMeals = async () => {
    try {
      const response = await fetch("/api/meals")
      const data = await response.json()
      setMeals(data.meals || [])
      calculateStats(data.meals || [])
    } catch (err) {
      console.error("[v0] Erreur de chargement:", err)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (mealsData: Meal[]) => {
    const totalMeals = mealsData.length
    const totalCarbs = mealsData.reduce((sum, meal) => sum + meal.totalCarbs, 0)
    const avgCarbs = totalMeals > 0 ? totalCarbs / totalMeals : 0

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const last7Days = mealsData.filter((meal) => new Date(meal.date) >= sevenDaysAgo).length

    setStats({
      totalMeals,
      avgCarbs: Math.round(avgCarbs * 10) / 10,
      totalCarbs: Math.round(totalCarbs * 10) / 10,
      last7Days,
    })
  }

  const deleteMeal = async (mealId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce repas ?")) return

    try {
      await fetch(`/api/meals/${mealId}`, { method: "DELETE" })
      loadMeals()
    } catch (err) {
      console.error("[v0] Erreur de suppression:", err)
      alert("Erreur lors de la suppression. Veuillez réessayer.")
    }
  }

  const exportToPDF = () => {
    if (!user?.isPremium) {
      alert("Cette fonctionnalité est réservée aux membres Premium")
      router.push("/premium")
      return
    }
    alert("Export PDF en cours de développement...")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return `Aujourd'hui à ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Hier à ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
    } else {
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
        hour: "2-digit",
        minute: "2-digit",
      })
    }
  }

  const groupMealsByDate = (mealsData: Meal[]) => {
    const groups: Record<string, Meal[]> = {}

    mealsData.forEach((meal) => {
      const date = new Date(meal.date)
      const dateKey = date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(meal)
    })

    return groups
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const getMealsForDate = (date: Date) => {
    return meals.filter((meal) => {
      const mealDate = new Date(meal.date)
      return (
        mealDate.getDate() === date.getDate() &&
        mealDate.getMonth() === date.getMonth() &&
        mealDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const getTotalCarbsForDate = (date: Date) => {
    const dateMeals = getMealsForDate(date)
    return dateMeals.reduce((sum, meal) => sum + meal.totalCarbs, 0)
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  if (!user) return null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  const groupedMeals = groupMealsByDate(meals)
  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)
  const selectedDateMeals = getMealsForDate(selectedDate)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Historique</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              Liste
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("calendar")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendrier
            </Button>
            <Button variant="outline" size="sm" onClick={exportToPDF}>
              <Download className="h-4 w-4" />
            </Button>
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {viewMode === "list" ? (
            meals.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Aucun repas enregistré</h3>
                  <p className="text-muted-foreground mb-4">Commencez par analyser votre premier repas</p>
                  <Link href="/analyze">
                    <Button>Analyser un repas</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedMeals).map(([dateKey, dateMeals]) => (
                  <div key={dateKey} className="space-y-3">
                    <h2 className="text-sm font-semibold text-muted-foreground capitalize sticky top-16 bg-background py-2">
                      {dateKey}
                    </h2>

                    {dateMeals.map((meal) => (
                      <Card key={meal.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{formatDate(meal.date)}</CardTitle>
                              <CardDescription className="mt-1">
                                {meal.foods.length} aliment{meal.foods.length > 1 ? "s" : ""}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary">{meal.totalCarbs.toFixed(1)}g</p>
                              <p className="text-xs text-muted-foreground">glucides</p>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedMeal(expandedMeal === meal.id ? null : meal.id)}
                            className="w-full justify-between"
                          >
                            <span>Voir les détails</span>
                            {expandedMeal === meal.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>

                          {expandedMeal === meal.id && (
                            <div className="space-y-2 pt-2 border-t">
                              {meal.foods.map((food, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <div className="flex-1">
                                    <p className="font-medium">{food.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {food.quantity}
                                      {food.unit}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-primary">{food.carbs.toFixed(1)}g</p>
                                    {food.calories && (
                                      <p className="text-xs text-muted-foreground">{food.calories} cal</p>
                                    )}
                                  </div>
                                </div>
                              ))}

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteMeal(meal.id)}
                                className="w-full text-destructive hover:text-destructive mt-2"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer ce repas
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="icon" onClick={previousMonth}>
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <CardTitle className="text-lg">
                      {currentMonth.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
                      <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}

                    {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                      <div key={`empty-${index}`} className="aspect-square" />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, index) => {
                      const day = index + 1
                      const date = new Date(year, month, day)
                      const totalCarbs = getTotalCarbsForDate(date)
                      const hasMeals = totalCarbs > 0
                      const isSelected = isSameDay(date, selectedDate)
                      const isTodayDate = isToday(date)

                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(date)}
                          className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-sm transition-colors ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : isTodayDate
                                ? "border-primary bg-primary/10"
                                : hasMeals
                                  ? "border-primary/30 bg-primary/5 hover:bg-primary/10"
                                  : "border-transparent hover:bg-muted"
                          }`}
                        >
                          <span className="font-semibold">{day}</span>
                          {hasMeals && (
                            <span className={`text-xs ${isSelected ? "text-primary-foreground" : "text-primary"}`}>
                              {totalCarbs.toFixed(0)}g
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedDate.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardTitle>
                  <CardDescription>
                    {selectedDateMeals.length} repas - {getTotalCarbsForDate(selectedDate).toFixed(1)}g de glucides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDateMeals.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Aucun repas enregistré ce jour</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedDateMeals.map((meal) => (
                        <div key={meal.id} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">
                                {new Date(meal.date).toLocaleTimeString("fr-FR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {meal.foods.length} aliment{meal.foods.length > 1 ? "s" : ""}
                              </p>
                            </div>
                            <p className="text-xl font-bold text-primary">{meal.totalCarbs.toFixed(1)}g</p>
                          </div>

                          <div className="space-y-1 pt-2 border-t">
                            {meal.foods.map((food, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {food.name} ({food.quantity}
                                  {food.unit})
                                </span>
                                <span className="font-medium">{food.carbs.toFixed(1)}g</span>
                              </div>
                            ))}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteMeal(meal.id)}
                            className="w-full text-destructive hover:text-destructive mt-2"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {meals.length > 0 && (
            <Card className="bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Conseil</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {stats.avgCarbs > 60 ? (
                  <p>
                    Votre moyenne de glucides par repas est de {stats.avgCarbs}g. Consultez votre médecin pour ajuster
                    vos portions si nécessaire.
                  </p>
                ) : (
                  <p>
                    Votre moyenne de glucides par repas est de {stats.avgCarbs}g. Continuez à suivre vos repas pour
                    maintenir un bon équilibre.
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
