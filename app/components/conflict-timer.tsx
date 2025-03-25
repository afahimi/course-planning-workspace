"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface ConflictTimerProps {
  isRunning: boolean
  conflicts: number
  initialConflicts: number
}

export function ConflictTimer({ isRunning, conflicts, initialConflicts }: ConflictTimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [timerStarted, setTimerStarted] = useState(false)
  const [timerStopped, setTimerStopped] = useState(false)

  // Start the timer when isRunning becomes true
  useEffect(() => {
    if (isRunning && !timerStarted && initialConflicts > 0) {
      setTimerStarted(true)
    }
  }, [isRunning, timerStarted, initialConflicts])

  // Stop the timer when conflicts reach 0
  useEffect(() => {
    if (timerStarted && conflicts === 0 && !timerStopped) {
      setTimerStopped(true)
    }
  }, [conflicts, timerStarted, timerStopped])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (timerStarted && !timerStopped) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerStarted, timerStopped])

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Calculate completion percentage
  const completionPercentage =
    initialConflicts > 0 ? Math.round(((initialConflicts - conflicts) / initialConflicts) * 100) : 0

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Conflict Resolution Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-mono font-bold">{formatTime(elapsedTime)}</div>
          <div className="text-right">
            <div className="text-sm text-gray-500">
              {conflicts === 0 ? (
                <span className="text-green-600 font-medium">All conflicts resolved!</span>
              ) : (
                <>
                  <span className="font-medium">{initialConflicts - conflicts}</span> of{" "}
                  <span className="font-medium">{initialConflicts}</span> conflicts resolved
                </>
              )}
            </div>
            <div className="text-sm text-gray-500">{completionPercentage}% complete</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
        </div>
      </CardContent>
    </Card>
  )
}

