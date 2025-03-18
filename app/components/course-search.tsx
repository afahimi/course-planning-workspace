"use client"
import { useAppContext } from "../context/app-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Info, Plus, Check, X } from "lucide-react"

export function CourseSearch() {
  const {
    courses,
    currentWorklist,
    searchTerm,
    setSearchTerm,
    setSelectedCourse,
    setIsDetailOpen,
    addCourseToWorklist,
    removeCourseFromWorklist,
  } = useAppContext()

  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (course: (typeof courses)[0]) => {
    setSelectedCourse(course)
    setIsDetailOpen(true)
  }

  const handleAddCourse = (course: (typeof courses)[0], sectionId: string) => {
    addCourseToWorklist(course.id, sectionId)
  }

  const handleRemoveCourse = (courseId: string) => {
    removeCourseFromWorklist(courseId)
  }

  const isCourseInWorklist = (courseId: string) => {
    return currentWorklist.courses.includes(courseId)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Search courses by code or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No courses found. Try a different search term.</div>
        ) : (
          filteredCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>{course.code}</CardTitle>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {course.credits} Credits
                      </Badge>
                      {isCourseInWorklist(course.id) && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          In Schedule
                        </Badge>
                      )}
                    </div>
                    <div className="text-lg font-medium mt-1">{course.title}</div>
                  </div>
                  <div className="flex gap-2">
                    {isCourseInWorklist(course.id) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleRemoveCourse(course.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(course)}>
                      <Info className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{course.description}</p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="sections">
                    <AccordionTrigger>Available Sections</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 mt-2">
                        {course.sections.map((section) => (
                          <div key={section.id} className="border rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-semibold">
                                  {section.type} {section.number}
                                </div>

                                <div className="mt-2 space-y-1 text-sm">
                                  <div>Instructor: {section.instructor}</div>
                                  <div>
                                    Schedule:
                                    {section.schedule.map((time, index) => (
                                      <span key={index} className="ml-1">
                                        {time.day} {time.startTime}-{time.endTime}
                                        {index < section.schedule.length - 1 ? "," : ""}
                                      </span>
                                    ))}
                                  </div>
                                  <div>Location: {section.location}</div>
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                <div
                                  className={`text-sm font-medium ${
                                    section.seatsAvailable > 10
                                      ? "text-green-600"
                                      : section.seatsAvailable > 0
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                  }`}
                                >
                                  {section.seatsAvailable > 0
                                    ? `${section.seatsAvailable} seats available`
                                    : "Waitlist"}
                                </div>

                                {isCourseInWorklist(course.id) ? (
                                  <Button size="sm" variant="default" className="bg-green-600" disabled>
                                    <Check className="h-4 w-4 mr-1" />
                                    Added
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleAddCourse(course, section.id)}
                                  >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

