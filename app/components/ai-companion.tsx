"use client"

import { useState, useRef, useEffect } from "react"
import type React from "react"

import { useAppContext } from "../context/app-context"
import { Button } from "@/components/ui/button"
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { User, Users, GraduationCap, Plus, Info } from "lucide-react"
import { CourseDetailPopup } from "./course-detail-popup"

// Sample recommended courses
const RECOMMENDED_COURSES = [
  {
    id: "math100",
    code: "MATH 100",
    title: "Differential Calculus",
    credits: 3,
    description: "Limits, continuity, derivatives, mean value theorem, and applications.",
    selected: true,
    prerequisites: ["High school calculus or equivalent"],
    corequisites: [],
    sections: [
      {
        id: "math100-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Jane Smith",
        schedule: [
          { day: "Monday", startTime: "10:00", endTime: "11:30" },
          { day: "Wednesday", startTime: "10:00", endTime: "11:30" },
          { day: "Friday", startTime: "10:00", endTime: "11:30" },
        ],
        location: "Mathematics Building 100",
        seatsAvailable: 25,
        totalSeats: 120,
      },
      {
        id: "math100-002",
        type: "Lecture",
        number: "002",
        instructor: "Dr. Robert Johnson",
        schedule: [
          { day: "Tuesday", startTime: "13:00", endTime: "14:30" },
          { day: "Thursday", startTime: "13:00", endTime: "14:30" },
        ],
        location: "Science Center 200",
        seatsAvailable: 5,
        totalSeats: 100,
      },
      {
        id: "math100-t01",
        type: "Tutorial",
        number: "T01",
        instructor: "Teaching Assistant",
        schedule: [{ day: "Friday", startTime: "14:00", endTime: "15:00" }],
        location: "Mathematics Building 120",
        seatsAvailable: 0,
        totalSeats: 30,
      },
    ],
  },
  {
    id: "chem121",
    code: "CHEM 121",
    title: "Structural Chemistry",
    credits: 4,
    description: "Atomic structure, chemical bonding, and the structure of molecules.",
    selected: false,
    prerequisites: [],
    corequisites: ["CHEM 123 (Lab)"],
    sections: [
      {
        id: "chem121-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Michael Chen",
        schedule: [
          { day: "Tuesday", startTime: "13:00", endTime: "14:30" },
          { day: "Thursday", startTime: "13:00", endTime: "14:30" },
        ],
        location: "Chemistry Building 200",
        seatsAvailable: 15,
        totalSeats: 150,
      },
    ],
  },
  {
    id: "biol112",
    code: "BIOL 112",
    title: "Biology of the Cell",
    credits: 3,
    description: "Cell structure and function, molecular genetics, and biotechnology.",
    selected: false,
    prerequisites: [],
    corequisites: [],
    sections: [
      {
        id: "biol112-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Sarah Williams",
        schedule: [
          { day: "Monday", startTime: "9:00", endTime: "10:30" },
          { day: "Wednesday", startTime: "9:00", endTime: "10:30" },
        ],
        location: "Life Sciences Centre 100",
        seatsAvailable: 30,
        totalSeats: 200,
      },
    ],
  },
  {
    id: "phys101",
    code: "PHYS 101",
    title: "Energy and Waves",
    credits: 3,
    description: "Energy, conservation laws, and the physics of waves.",
    selected: false,
    prerequisites: ["High school physics recommended"],
    corequisites: [],
    sections: [
      {
        id: "phys101-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Alan Parker",
        schedule: [
          { day: "Monday", startTime: "13:00", endTime: "14:30" },
          { day: "Wednesday", startTime: "13:00", endTime: "14:30" },
        ],
        location: "Physics Building 100",
        seatsAvailable: 20,
        totalSeats: 120,
      },
    ],
  },
  {
    id: "cpsc110",
    code: "CPSC 110",
    title: "Computation, Programs, and Programming",
    credits: 4,
    description: "Fundamental program and computation structures.",
    selected: false,
    prerequisites: [],
    corequisites: [],
    sections: [
      {
        id: "cpsc110-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Emily Davis",
        schedule: [
          { day: "Tuesday", startTime: "9:30", endTime: "11:00" },
          { day: "Thursday", startTime: "9:30", endTime: "11:00" },
        ],
        location: "Computer Science Building 200",
        seatsAvailable: 10,
        totalSeats: 150,
      },
    ],
  },
]

export function AICompanion() {
  const {
    activePersona,
    setActivePersona,
    messages,
    addMessage,
    courses,
    currentWorklist,
    addCourseToWorklist,
    setSelectedCourse,
    setIsDetailOpen,
  } = useAppContext()

  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addMessage(inputValue, "user")
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Get recommended courses (not in current worklist)
  const recommendedCourses = courses.filter((course) => !currentWorklist.courses.includes(course.id)).slice(0, 3)

  const handleViewDetails = (course: (typeof courses)[0], event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedCourse(course)
    setIsDetailOpen(true)
  }

  const handleAddCourse = (course: (typeof courses)[0], event: React.MouseEvent) => {
    event.stopPropagation()
    // Add the first section by default
    if (course.sections.length > 0) {
      addCourseToWorklist(course.id, course.sections[0].id)
    }
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <CardHeader className="border-b bg-white">
          <CardTitle>Registration Companion</CardTitle>
          <div className="flex justify-center gap-4 mt-2">
            <button
              className={`flex flex-col items-center ${activePersona === "advisor" ? "text-blue-600" : "text-gray-500"}`}
              onClick={() => setActivePersona("advisor")}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${activePersona === "advisor" ? "bg-blue-100" : "bg-gray-100"}`}
              >
                <GraduationCap
                  className={`w-6 h-6 ${activePersona === "advisor" ? "text-blue-600" : "text-gray-500"}`}
                />
              </div>
              <span className="text-xs mt-1">Academic Advisor</span>
            </button>

            <button
              className={`flex flex-col items-center ${activePersona === "peer" ? "text-blue-600" : "text-gray-500"}`}
              onClick={() => setActivePersona("peer")}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${activePersona === "peer" ? "bg-blue-100" : "bg-gray-100"}`}
              >
                <User className={`w-6 h-6 ${activePersona === "peer" ? "text-blue-600" : "text-gray-500"}`} />
              </div>
              <span className="text-xs mt-1">Peer Mentor</span>
            </button>

            <button
              className={`flex flex-col items-center ${activePersona === "expert" ? "text-blue-600" : "text-gray-500"}`}
              onClick={() => setActivePersona("expert")}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${activePersona === "expert" ? "bg-blue-100" : "bg-gray-100"}`}
              >
                <Users className={`w-6 h-6 ${activePersona === "expert" ? "text-blue-600" : "text-gray-500"}`} />
              </div>
              <span className="text-xs mt-1">Program Expert</span>
            </button>
          </div>
        </CardHeader>

        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          {messages.map((message, index) => (
            <div key={message.id} className={`mb-4 ${message.role === "ai" ? "flex" : "flex justify-end"}`}>
              {message.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                  {message.persona === "advisor" ? (
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                  ) : message.persona === "peer" ? (
                    <User className="w-4 h-4 text-blue-600" />
                  ) : message.persona === "peer" ? (
                    <User className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Users className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === "ai" ? "bg-white border border-gray-200 text-gray-800" : "bg-blue-600 text-white"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {/* Course recommendation cards */}
          {activePersona === "advisor" && recommendedCourses.length > 0 && (
            <div className="mt-6">
              <div className="text-sm font-medium text-gray-500 mb-2">Recommended Courses:</div>
              <div className="space-y-3">
                {recommendedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-lg p-3 border border-gray-200 bg-white cursor-pointer transition-colors hover:border-gray-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">
                          {course.code}: {course.title}
                        </div>
                        <div className="text-sm text-gray-600">{course.credits} credits</div>
                        <div className="text-sm mt-1">{course.description.substring(0, 100)}...</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="p-2 h-8 w-8"
                          onClick={(e) => handleViewDetails(course, e)}
                        >
                          <Info className="h-4 w-4" />
                          <span className="sr-only">View Details</span>
                        </Button>
                        <Button size="sm" variant="outline" onClick={(e) => handleAddCourse(course, e)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <CardFooter className="border-t p-4 bg-white">
          <div className="flex w-full gap-2">
            <Input
              placeholder="Ask me anything about registration..."
              className="flex-1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardFooter>
      </div>

      <CourseDetailPopup isOpen={false} onClose={() => setIsDetailOpen(false)} course={null} />
    </>
  )
}

