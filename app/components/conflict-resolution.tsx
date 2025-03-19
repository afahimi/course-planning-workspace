"use client"

import { useState } from "react"
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
import { AlertTriangle, Check, X } from "lucide-react"

export function ConflictResolution({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { conflicts, courses, removeCourseFromWorklist, addCourseToWorklist } = useAppContext()

  const [resolvedConflicts, setResolvedConflicts] = useState<string[]>([])

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
    const currentSectionId = conflict.sectionIds.find((id) => id.startsWith(courseId))
    if (!currentSectionId) return

    // Remove the current section
    removeCourseFromWorklist(courseId)

    // Find an alternative section
    const alternativeSection = course.sections.find(
      (section) =>
        section.id !== currentSectionId &&
        // Simple check - different time of day
        section.schedule.some(
          (time) =>
            time.startTime.split(":")[0] !==
            course.sections.find((s) => s.id === currentSectionId)?.schedule[0].startTime.split(":")[0],
        ),
    )

    if (alternativeSection) {
      // Add the alternative section
      addCourseToWorklist(courseId, alternativeSection.id)

      // Mark this conflict as resolved
      setResolvedConflicts((prev) => [...prev, conflict.id])
    }
  }

  const activeConflicts = conflicts.filter((conflict) => !resolvedConflicts.includes(conflict.id))

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            Schedule Conflicts
          </DialogTitle>
          <DialogDescription>
            The following conflicts were detected in your schedule. Please resolve them before proceeding.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-auto">
          {activeConflicts.length === 0 ? (
            <div className="text-center py-8 text-green-600 flex flex-col items-center">
              <Check className="h-8 w-8 mb-2" />
              <p>All conflicts have been resolved!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeConflicts.map((conflict, index) => {
                const course1 = courses.find((c) => c.id === conflict.courseIds[0])
                const course2 = courses.find((c) => c.id === conflict.courseIds[1])

                if (!course1 || !course2) return null

                return (
                  <div key={`${conflict.id}-${index}`} className="border rounded-lg p-4 bg-amber-50 border-amber-200">
                    <div className="font-medium text-amber-800 mb-2">{conflict.description}</div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="border rounded-lg p-3 bg-white">
                        <div className="font-semibold">
                          {course1.code}: {course1.title}
                        </div>
                        <div className="mt-4 flex justify-between">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-amber-600 border-amber-200"
                            onClick={() => handleRemoveCourse(course1.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                          <Button size="sm" onClick={() => handleTryAlternative(conflict, course1.id)}>
                            Try Alternative
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-3 bg-white">
                        <div className="font-semibold">
                          {course2.code}: {course2.title}
                        </div>
                        <div className="mt-4 flex justify-between">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-amber-600 border-amber-200"
                            onClick={() => handleRemoveCourse(course2.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                          <Button size="sm" onClick={() => handleTryAlternative(conflict, course2.id)}>
                            Try Alternative
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>{activeConflicts.length === 0 ? "Close" : "Continue Editing"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

