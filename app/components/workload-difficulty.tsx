"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Course } from "../types"

export default function WorkloadDifficulty({ courses }: { courses: Course[] }) {
  const [difficulty, setDifficulty] = useState(0)

  useEffect(() => {
    // Calculate difficulty based on total credits
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)
    let calculatedDifficulty = (totalCredits / 18) * 100 // Assuming 18 credits is maximum
    calculatedDifficulty = Math.min(calculatedDifficulty, 100) // Cap at 100%
    setDifficulty(Math.round(calculatedDifficulty))
  }, [courses])

  const getDifficultyColor = (value: number) => {
    if (value < 33) return "bg-green-500"
    if (value < 66) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workload Difficulty</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Progress value={difficulty} className={`w-full ${getDifficultyColor(difficulty)}`} />
          <span className="font-bold">{difficulty}%</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {difficulty < 33 && "Light workload. Consider adding more courses."}
          {difficulty >= 33 && difficulty < 66 && "Balanced workload. Good job!"}
          {difficulty >= 66 && "Heavy workload. Consider reducing courses."}
        </p>
      </CardContent>
    </Card>
  )
}

