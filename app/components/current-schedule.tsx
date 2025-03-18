"use client"

import type React from "react"

import { useAppContext } from "../context/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Clock, MapPin, User } from "lucide-react"

export function CurrentSchedule() {
  const { courses, currentWorklist, removeCourseFromWorklist, setSelectedCourse, setIsDetailOpen } = useAppContext()

  // Get courses in the current worklist
  const scheduledCourses = courses.filter((course) => currentWorklist.courses.includes(course.id))

  const handleViewDetails = (course: (typeof courses)[0]) => {
    setSelectedCourse(course)
    setIsDetailOpen(true)
  }

  const handleRemoveCourse = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    removeCourseFromWorklist(courseId)
  }

  if (scheduledCourses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">
            <p>No courses added to your schedule yet.</p>
            <p className="text-sm mt-2">Use the Course Search tab to find and add courses.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {scheduledCourses.map((course) => {
            // Find the section for this course
            const sectionId = currentWorklist.sections[currentWorklist.courses.indexOf(course.id)]
            const section = course.sections.find((s) => s.id === sectionId)

            if (!section) return null

            return (
              <div
                key={course.id}
                className="border rounded-lg p-3 cursor-pointer hover:border-gray-300 transition-colors relative"
                onClick={() => handleViewDetails(course)}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 h-7 w-7 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50"
                  onClick={(e) => handleRemoveCourse(course.id, e)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>

                <div className="pr-8">
                  <div className="font-semibold">
                    {course.code}: {course.title}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="px-2 py-0.5 text-xs">
                      {course.credits} Credits
                    </Badge>
                    <Badge variant="outline" className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {section.type} {section.number}
                    </Badge>
                  </div>

                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-start gap-2">
                      <User className="h-3.5 w-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>{section.instructor}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="h-3.5 w-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        {section.schedule.map((time, index) => (
                          <div key={index}>
                            {time.day} {time.startTime}-{time.endTime}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>{section.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

