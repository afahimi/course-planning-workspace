"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "../context/app-context"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Check, X, Clock, BookOpen, AlertCircle, Users } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function ConflictResolution({
  isOpen,
  onClose,
  handleRegister,
}: {
  isOpen: boolean
  onClose: () => void
  handleRegister: () => void
}) {
  const { conflicts, courses, removeCourseFromWorklist, addCourseToWorklist } = useAppContext()

  const [resolvedConflicts, setResolvedConflicts] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")

  // Reset resolved conflicts when reopening
  useEffect(() => {
    if (isOpen) {
      setResolvedConflicts([])
    }
  }, [isOpen])

  // Group conflicts by type
  const timeConflicts = conflicts.filter((conflict) => conflict.type === "time")
  const prereqConflicts = conflicts.filter((conflict) => conflict.type === "prerequisite")
  const otherConflicts = conflicts.filter((conflict) => conflict.type !== "time" && conflict.type !== "prerequisite")

  const handleRemoveCourse = (courseId: string) => {
    removeCourseFromWorklist(courseId)

    // Mark conflicts involving this course as resolved
    const resolvedIds = conflicts
      .filter((conflict) => conflict.courseIds.includes(courseId))
      .map((conflict) => conflict.id)

    setResolvedConflicts((prev) => [...prev, ...resolvedIds])
  }

  const handleTryAlternative = (conflict: (typeof conflicts)[0], courseId: string) => {
    // Find the course
    const course = courses.find((c) => c.id === courseId)
    if (!course) return

    // Find a section that doesn't conflict
    const currentSectionId = conflict.sectionIds.find((id) => id.startsWith(courseId) || id.includes(courseId))
    if (!currentSectionId) return

    // Remove the current section
    removeCourseFromWorklist(courseId)

    // Find an alternative section
    const currentSection = course.sections.find((s) => s.id === currentSectionId)
    if (!currentSection) return

    const alternativeSections = course.sections.filter((section) => section.id !== currentSectionId)

    if (alternativeSections.length > 0) {
      // Add the alternative section (first available one)
      addCourseToWorklist(courseId, alternativeSections[0].id)

      // Mark this conflict as resolved
      setResolvedConflicts((prev) => [...prev, conflict.id])
    }
  }

  const handleAddPrerequisite = (conflict: (typeof conflicts)[0]) => {
    // Extract prerequisite course code from description
    const description = conflict.description
    const prereqCodeMatch = description.match(/prerequisite ([A-Z]+ \d+)/)

    if (prereqCodeMatch && prereqCodeMatch[1]) {
      const prereqCode = prereqCodeMatch[1]

      // Find the prerequisite course
      const prereqCourse = courses.find((c) => c.code === prereqCode)

      if (prereqCourse && prereqCourse.sections.length > 0) {
        // Add the first section of the prerequisite course
        addCourseToWorklist(prereqCourse.id, prereqCourse.sections[0].id)

        // Mark this conflict as resolved
        setResolvedConflicts((prev) => [...prev, conflict.id])
      }
    }
  }

  const handleAddCorequisite = (conflict: (typeof conflicts)[0]) => {
    // Extract corequisite info from description
    const description = conflict.description
    const labSectionMatch = description.match(/lab section ([A-Z0-9]+)/i)

    if (labSectionMatch && labSectionMatch[1]) {
      const labCode = labSectionMatch[1]
      const courseId = conflict.courseIds[0]
      const course = courses.find((c) => c.id === courseId)

      if (course) {
        // Find the lab section
        const labSection = course.sections.find((s) => s.number === labCode || s.id.includes(labCode))

        if (labSection) {
          // Add the lab section
          addCourseToWorklist(course.id, labSection.id)

          // Mark this conflict as resolved
          setResolvedConflicts((prev) => [...prev, conflict.id])
        }
      }
    }
  }

  const getConflictIcon = (type: string) => {
    switch (type) {
      case "time":
        return <Clock className="h-5 w-5 text-amber-600" />
      case "prerequisite":
        return <BookOpen className="h-5 w-5 text-blue-600" />
      case "corequisite":
        return <AlertCircle className="h-5 w-5 text-purple-600" />
      case "capacity":
        return <Users className="h-5 w-5 text-red-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-amber-600" />
    }
  }

  const getConflictColor = (type: string) => {
    switch (type) {
      case "time":
        return "bg-amber-50 border-amber-200 text-amber-800"
      case "prerequisite":
        return "bg-blue-50 border-blue-200 text-blue-800"
      case "corequisite":
        return "bg-purple-50 border-purple-200 text-purple-800"
      case "capacity":
        return "bg-red-50 border-red-200 text-red-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  const activeConflicts = conflicts.filter((conflict) => !resolvedConflicts.includes(conflict.id))

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Schedule Conflicts ({activeConflicts.length} remaining)
          </DialogTitle>
          <DialogDescription className="text-base">
            The following conflicts need to be resolved before you can complete your registration.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="all" className="relative">
              All Conflicts
              {activeConflicts.length > 0 && (
                <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200">{activeConflicts.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="time" className="relative">
              Time Conflicts
              {timeConflicts.filter((c) => !resolvedConflicts.includes(c.id)).length > 0 && (
                <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                  {timeConflicts.filter((c) => !resolvedConflicts.includes(c.id)).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="prereq" className="relative">
              Prerequisites
              {prereqConflicts.filter((c) => !resolvedConflicts.includes(c.id)).length > 0 && (
                <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                  {prereqConflicts.filter((c) => !resolvedConflicts.includes(c.id)).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="other" className="relative">
              Other Issues
              {otherConflicts.filter((c) => !resolvedConflicts.includes(c.id)).length > 0 && (
                <Badge className="ml-2 bg-purple-100 text-purple-800 border-purple-200">
                  {otherConflicts.filter((c) => !resolvedConflicts.includes(c.id)).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto p-4">
            {activeConflicts.length === 0 ? (
              <div className="text-center py-8 text-green-600 flex flex-col items-center">
                <Check className="h-12 w-12 mb-3" />
                <p className="text-lg font-medium">All conflicts have been resolved!</p>
                <p className="text-sm text-gray-600 mt-2">Your schedule is now conflict-free and ready to go.</p>
              </div>
            ) : (
              <TabsContent value="all" className="mt-0 space-y-4">
                {activeConflicts.map((conflict) => renderConflict(conflict))}
              </TabsContent>
            )}

            <TabsContent value="time" className="mt-0 space-y-4">
              {timeConflicts
                .filter((c) => !resolvedConflicts.includes(c.id))
                .map((conflict) => renderConflict(conflict))}

              {timeConflicts.filter((c) => !resolvedConflicts.includes(c.id)).length === 0 && (
                <div className="text-center py-6 text-green-600">
                  <Check className="h-8 w-8 mx-auto mb-2" />
                  <p>No time conflicts remaining</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="prereq" className="mt-0 space-y-4">
              {prereqConflicts
                .filter((c) => !resolvedConflicts.includes(c.id))
                .map((conflict) => renderConflict(conflict))}

              {prereqConflicts.filter((c) => !resolvedConflicts.includes(c.id)).length === 0 && (
                <div className="text-center py-6 text-green-600">
                  <Check className="h-8 w-8 mx-auto mb-2" />
                  <p>No prerequisite issues remaining</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="other" className="mt-0 space-y-4">
              {otherConflicts
                .filter((c) => !resolvedConflicts.includes(c.id))
                .map((conflict) => renderConflict(conflict))}

              {otherConflicts.filter((c) => !resolvedConflicts.includes(c.id)).length === 0 && (
                <div className="text-center py-6 text-green-600">
                  <Check className="h-8 w-8 mx-auto mb-2" />
                  <p>No other issues remaining</p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            {activeConflicts.length === 0 ? "Close" : "Continue Editing"}
          </Button>
          {activeConflicts.length === 0 && (
            <Button
              onClick={() => {
                onClose()
                handleRegister()
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Registration
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  function renderConflict(conflict: (typeof conflicts)[0]) {
    // For time conflicts
    if (conflict.type === "time") {
      const course1 = courses.find((c) => c.id === conflict.courseIds[0])
      const course2 = courses.find((c) => c.id === conflict.courseIds[1])

      if (!course1 || !course2) return null

      return (
        <div key={conflict.id} className={`border rounded-lg p-4 ${getConflictColor(conflict.type)}`}>
          <div className="flex items-start gap-3">
            {getConflictIcon(conflict.type)}
            <div className="flex-1">
              <div className="font-medium mb-2">{conflict.description}</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="border rounded-lg p-3 bg-white relative overflow-hidden">
                  <div className="absolute inset-0 w-1 bg-amber-500"></div>
                  <div className="pl-2">
                    <div className="font-semibold">
                      {course1.code}: {course1.title}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {course1.sections
                        .find((s) => s.id === conflict.sectionIds[0])
                        ?.schedule.map((time, i) => (
                          <div key={i}>
                            {time.day} {time.startTime}-{time.endTime}
                          </div>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-amber-600 border-amber-200 justify-start"
                        onClick={() => handleRemoveCourse(course1.id)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove Course
                      </Button>
                      {course1.sections.length > 1 && (
                        <Button
                          size="sm"
                          onClick={() => handleTryAlternative(conflict, course1.id)}
                          className="justify-start"
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Try Alternative Section
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-3 bg-white relative overflow-hidden">
                  <div className="absolute inset-0 w-1 bg-amber-500"></div>
                  <div className="pl-2">
                    <div className="font-semibold">
                      {course2.code}: {course2.title}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {course2.sections
                        .find((s) => s.id === conflict.sectionIds[1])
                        ?.schedule.map((time, i) => (
                          <div key={i}>
                            {time.day} {time.startTime}-{time.endTime}
                          </div>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-amber-600 border-amber-200 justify-start"
                        onClick={() => handleRemoveCourse(course2.id)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove Course
                      </Button>
                      {course2.sections.length > 1 && (
                        <Button
                          size="sm"
                          onClick={() => handleTryAlternative(conflict, course2.id)}
                          className="justify-start"
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Try Alternative Section
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // For prerequisite conflicts
    else if (conflict.type === "prerequisite") {
      const courseId = conflict.courseIds[0]
      const course = courses.find((c) => c.id === courseId)

      if (!course) return null

      return (
        <div key={conflict.id} className={`border rounded-lg p-4 ${getConflictColor(conflict.type)}`}>
          <div className="flex items-start gap-3">
            {getConflictIcon(conflict.type)}
            <div className="flex-1">
              <div className="font-medium mb-2">{conflict.description}</div>

              <div className="border rounded-lg p-3 bg-white mt-3">
                <div className="font-semibold">
                  {course.code}: {course.title}
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-200 justify-start"
                    onClick={() => handleRemoveCourse(course.id)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove Course
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAddPrerequisite(conflict)}
                    className="justify-start bg-blue-600 hover:bg-blue-700"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Add Missing Prerequisite
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // For corequisite conflicts
    else if (conflict.type === "corequisite") {
      const courseId = conflict.courseIds[0]
      const course = courses.find((c) => c.id === courseId)

      if (!course) return null

      return (
        <div key={conflict.id} className={`border rounded-lg p-4 ${getConflictColor(conflict.type)}`}>
          <div className="flex items-start gap-3">
            {getConflictIcon(conflict.type)}
            <div className="flex-1">
              <div className="font-medium mb-2">{conflict.description}</div>

              <div className="border rounded-lg p-3 bg-white mt-3">
                <div className="font-semibold">
                  {course.code}: {course.title}
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-200 justify-start"
                    onClick={() => handleRemoveCourse(course.id)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove Course
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAddCorequisite(conflict)}
                    className="justify-start bg-purple-600 hover:bg-purple-700"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Add Required Lab Section
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // For capacity and other conflicts
    else {
      const courseId = conflict.courseIds[0]
      const course = courses.find((c) => c.id === courseId)

      if (!course) return null

      return (
        <div key={conflict.id} className={`border rounded-lg p-4 ${getConflictColor(conflict.type)}`}>
          <div className="flex items-start gap-3">
            {getConflictIcon(conflict.type)}
            <div className="flex-1">
              <div className="font-medium mb-2">{conflict.description}</div>

              <div className="border rounded-lg p-3 bg-white mt-3">
                <div className="font-semibold">
                  {course.code}: {course.title}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-200"
                    onClick={() => handleRemoveCourse(course.id)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove Course
                  </Button>
                  {course.sections.length > 1 && (
                    <Button size="sm" onClick={() => handleTryAlternative(conflict, course.id)}>
                      Try Alternative Section
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

