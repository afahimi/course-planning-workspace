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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, User, Users, BookOpen, Calendar, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react"
import type { Course } from "../types"

interface CourseDetailProps {
  isOpen: boolean
  onClose: () => void
  course: Course | null
}

export function CourseDetailPopup({ isOpen, onClose, course }: CourseDetailProps) {
  const { addCourseToWorklist, currentWorklist } = useAppContext()
  const [activeTab, setActiveTab] = useState("about")
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  if (!course) return null

  const isCourseInWorklist = currentWorklist.courses.includes(course.id)

  const handleAddToSchedule = () => {
    if (selectedSection && !isCourseInWorklist) {
      addCourseToWorklist(course.id, selectedSection)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-2 py-1 bg-blue-50 text-blue-700 border-blue-200">
              {course.credits} Credits
            </Badge>
            <Badge variant="outline" className="px-2 py-1 bg-green-50 text-green-700 border-green-200">
              First Year
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold mt-2">
            {course.code}: {course.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Department of Mathematics • Faculty of Science
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="w-full justify-start border-b rounded-none px-0 h-auto">
            <TabsTrigger
              value="about"
              className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="sections"
              className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
            >
              Sections
            </TabsTrigger>
            <TabsTrigger
              value="requirements"
              className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
            >
              Requirements
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto p-4">
            <TabsContent value="about" className="mt-0 h-full data-[state=active]:flex data-[state=active]:flex-col">
              <h3 className="font-semibold text-lg mb-2">Course Description</h3>
              <p className="mb-4">{course.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    Learning Outcomes
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Understand the concept of limits and continuity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Apply differentiation techniques to various functions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Solve optimization problems using calculus</span>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    Course Details
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Term</div>
                        <div>Winter 2025 (January - April)</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Class Size</div>
                        <div>Large (100-250 students)</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Delivery Method</div>
                        <div>In-person with online components</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sections" className="mt-0 h-full data-[state=active]:flex data-[state=active]:flex-col">
              <h3 className="font-semibold text-lg mb-2">Available Sections</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select a section to add to your schedule. Each section may have different instructors, times, and
                locations.
              </p>

              <div className="space-y-3 mt-4">
                {course.sections.map((section) => (
                  <div
                    key={section.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedSection === section.id ? "border-blue-400 bg-blue-50" : "hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {section.type} {section.number}
                          {selectedSection === section.id && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                        </div>

                        <div className="mt-2 space-y-2">
                          <div className="flex items-start gap-2 text-sm">
                            <User className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <span>{section.instructor}</span>
                          </div>

                          <div className="flex items-start gap-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <div>
                              {section.schedule.map((time, index) => (
                                <div key={index}>
                                  {time.day}: {time.startTime} - {time.endTime}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <span>{section.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-sm font-medium ${
                            section.seatsAvailable > 10
                              ? "text-green-600"
                              : section.seatsAvailable > 0
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {section.seatsAvailable > 0 ? `${section.seatsAvailable} seats available` : "Waitlist"}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {section.seatsAvailable}/{section.totalSeats} seats
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="requirements"
              className="mt-0 h-full data-[state=active]:flex data-[state=active]:flex-col"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Prerequisites</h3>
                  {course.prerequisites.length > 0 ? (
                    <ul className="space-y-2">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No prerequisites required.</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Corequisites</h3>
                  {course.corequisites.length > 0 ? (
                    <ul className="space-y-2">
                      {course.corequisites.map((coreq, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span>{coreq}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No corequisites required.</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Program Requirements</h3>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <p className="mb-2">This course fulfills the following program requirements:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>First-year Science requirement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Quantitative requirement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Required for Mathematics, Physics, and Engineering majors</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            disabled={(!selectedSection && activeTab === "sections") || isCourseInWorklist}
            onClick={handleAddToSchedule}
          >
            {isCourseInWorklist
              ? "Already in Schedule"
              : activeTab === "sections"
                ? "Add Section to Schedule"
                : "View Sections"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

