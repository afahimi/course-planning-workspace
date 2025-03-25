"use client"

import React from "react"

import { useState } from "react"
import { useAppContext } from "../context/app-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const HOURS = Array.from({ length: 13 }, (_, i) => i + 8) // 8 AM to 8 PM

export function CalendarGrid() {
  const { courses, calendarEvents, conflicts, setSelectedCourse, setIsDetailOpen, removeCourseFromWorklist } =
    useAppContext()

  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)

  // Add a new function to identify conflicts for a specific event
  const isEventInConflict = (event: (typeof calendarEvents)[0]) => {
    return conflicts.some(
      (conflict) =>
        conflict.type === "time" &&
        conflict.courseIds.includes(event.courseId) &&
        conflict.sectionIds.includes(event.sectionId),
    )
  }

  // Modify the getEventsForTimeSlot function to return all events for a time slot
  const getEventsForTimeSlot = (day: string, hour: number) => {
    return calendarEvents.filter((event) => event.day === day && hour >= event.startHour && hour < event.endHour)
  }

  // Helper function to determine if an event starts at a specific hour
  const eventStartsAtHour = (event: (typeof calendarEvents)[0], hour: number) => {
    return Math.abs(event.startHour - hour) < 0.01 // Use a small epsilon for floating point comparison
  }

  const handleEventClick = (event: (typeof calendarEvents)[0]) => {
    const course = courses.find((c) => c.id === event.courseId)
    if (course) {
      setSelectedCourse(course)
      setIsDetailOpen(true)
    }
  }

  const handleRemoveCourse = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    removeCourseFromWorklist(courseId)
  }

  return (
    <Card className="w-full h-full">
      <CardContent className="p-4 overflow-auto">
        <div className="grid grid-cols-6 gap-1">
          {/* Header row with days */}
          <div className="h-10"></div>
          {DAYS.map((day) => (
            <div key={day} className="h-10 flex items-center justify-center font-semibold">
              {day}
            </div>
          ))}

          {/* Time slots */}
          {HOURS.map((hour) => (
            <React.Fragment key={`hour-${hour}`}>
              <div className="h-16 flex items-center justify-end pr-2 text-sm text-gray-500">{hour}:00</div>
              {DAYS.map((day) => {
                const events = getEventsForTimeSlot(day, hour)

                return (
                  <div key={`slot-${day}-${hour}`} className="h-16 border border-gray-200 relative">
                    {events.map((event) => {
                      if (eventStartsAtHour(event, hour)) {
                        const hasConflict = isEventInConflict(event)
                        const eventHeight = `${(event.endHour - event.startHour) * 100}%`

                        // Calculate position for multiple events in the same slot
                        // Use fixed pixel widths instead of percentages
                        const eventWidth = events.length > 1 ? `calc(100% / ${events.length})` : "100%"
                        const index = events.indexOf(event)
                        const leftPosition = events.length > 1 ? `calc(${index} * (100% / ${events.length}))` : "0"

                        return (
                          <div
                            key={event.id}
                            className={`absolute rounded p-1 flex flex-col cursor-pointer hover:opacity-90 transition-opacity ${
                              hasConflict ? "border-2 border-red-500 shadow-md" : "border"
                            }`}
                            style={{
                              backgroundColor:
                                event.color === "blue"
                                  ? "#dbeafe"
                                  : event.color === "green"
                                    ? "#dcfce7"
                                    : event.color === "purple"
                                      ? "#f3e8ff"
                                      : event.color === "orange"
                                        ? "#ffedd5"
                                        : event.color === "pink"
                                          ? "#fce7f3"
                                          : event.color === "teal"
                                            ? "#ccfbf1"
                                            : event.color === "indigo"
                                              ? "#e0e7ff"
                                              : event.color === "amber"
                                                ? "#fef3c7"
                                                : event.color === "cyan"
                                                  ? "#cffafe"
                                                  : event.color === "lime"
                                                    ? "#ecfccb"
                                                    : "#f3f4f6",
                              borderColor: hasConflict
                                ? "rgb(239, 68, 68)"
                                : event.color === "blue"
                                  ? "#93c5fd"
                                  : event.color === "green"
                                    ? "#86efac"
                                    : event.color === "purple"
                                      ? "#d8b4fe"
                                      : event.color === "orange"
                                        ? "#fdba74"
                                        : event.color === "pink"
                                          ? "#f9a8d4"
                                          : event.color === "teal"
                                            ? "#5eead4"
                                            : event.color === "indigo"
                                              ? "#a5b4fc"
                                              : event.color === "amber"
                                                ? "#fcd34d"
                                                : event.color === "cyan"
                                                  ? "#67e8f9"
                                                  : event.color === "lime"
                                                    ? "#bef264"
                                                    : "#e5e7eb",
                              height: eventHeight,
                              width: eventWidth,
                              left: leftPosition,
                              top: "0",
                              bottom: "0",
                              zIndex: hasConflict ? 20 : 10,
                              overflow: "hidden",
                              margin: "1px",
                            }}
                            onClick={() => handleEventClick(event)}
                            onMouseEnter={() => setHoveredEvent(event.id)}
                            onMouseLeave={() => setHoveredEvent(null)}
                          >
                            {hoveredEvent === event.id && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute top-0 right-0 h-6 w-6 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50 z-30"
                                onClick={(e) => handleRemoveCourse(event.courseId, e)}
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            )}

                            {hasConflict && (
                              <div className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center -mt-1 -mr-1 z-20">
                                <span className="text-white text-[10px] font-bold">!</span>
                              </div>
                            )}

                            <span
                              className={`font-semibold text-xs truncate ${
                                event.color === "blue"
                                  ? "text-blue-800"
                                  : event.color === "green"
                                    ? "text-green-800"
                                    : event.color === "purple"
                                      ? "text-purple-800"
                                      : event.color === "orange"
                                        ? "text-orange-800"
                                        : event.color === "pink"
                                          ? "text-pink-800"
                                          : event.color === "teal"
                                            ? "text-teal-800"
                                            : event.color === "indigo"
                                              ? "text-indigo-800"
                                              : event.color === "amber"
                                                ? "text-amber-800"
                                                : event.color === "cyan"
                                                  ? "text-cyan-800"
                                                  : event.color === "lime"
                                                    ? "text-lime-800"
                                                    : "text-gray-800"
                              }`}
                            >
                              {event.title.split(":")[0]}
                            </span>
                            <span
                              className={`text-[10px] ${
                                event.color === "blue"
                                  ? "text-blue-600"
                                  : event.color === "green"
                                    ? "text-green-600"
                                    : event.color === "purple"
                                      ? "text-purple-600"
                                      : event.color === "orange"
                                        ? "text-orange-600"
                                        : event.color === "pink"
                                          ? "text-pink-600"
                                          : event.color === "teal"
                                            ? "text-teal-600"
                                            : event.color === "indigo"
                                              ? "text-indigo-600"
                                              : event.color === "amber"
                                                ? "text-amber-600"
                                                : event.color === "cyan"
                                                  ? "text-cyan-600"
                                                  : event.color === "lime"
                                                    ? "text-lime-600"
                                                    : "text-gray-600"
                              }`}
                            >
                              {Math.floor(event.startHour)}:{event.startHour % 1 ? "30" : "00"} -
                              {Math.floor(event.endHour)}:{event.endHour % 1 ? "30" : "00"}
                            </span>
                            <span className="text-[10px] mt-1 truncate">{event.location}</span>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

