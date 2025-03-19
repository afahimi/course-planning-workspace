"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Course, Term, Worklist, Message, AIPersona, CalendarEvent, Conflict, GlossaryTerm } from "../types"
import {
  SAMPLE_COURSES,
  SAMPLE_TERMS,
  SAMPLE_WORKLISTS,
  SAMPLE_MESSAGES,
  SAMPLE_CALENDAR_EVENTS,
  SAMPLE_GLOSSARY_TERMS,
} from "../data/sample-data"

interface AppContextType {
  // Current state
  currentTerm: Term
  currentWorklist: Worklist
  activePersona: AIPersona

  // Data
  terms: Term[]
  courses: Course[]
  worklists: Worklist[]
  messages: Message[]
  calendarEvents: CalendarEvent[]
  conflicts: Conflict[]
  glossaryTerms: GlossaryTerm[]

  // UI state
  selectedCourse: Course | null
  isDetailOpen: boolean
  searchTerm: string

  // Actions
  setCurrentTerm: (term: Term) => void
  setCurrentWorklist: (worklist: Worklist) => void
  setActivePersona: (persona: AIPersona) => void
  addMessage: (content: string, role: "user" | "ai", persona?: AIPersona) => void
  addCourseToWorklist: (courseId: string, sectionId: string) => void
  removeCourseFromWorklist: (courseId: string) => void
  setSelectedCourse: (course: Course | null) => void
  setIsDetailOpen: (isOpen: boolean) => void
  setSearchTerm: (term: string) => void
  markConceptAsExplained: (conceptId: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Current state
  const [currentTerm, setCurrentTerm] = useState<Term>(SAMPLE_TERMS[0])
  const [currentWorklist, setCurrentWorklist] = useState<Worklist>(SAMPLE_WORKLISTS[0])
  const [activePersona, setActivePersona] = useState<AIPersona>("advisor")

  // Data
  const [terms] = useState<Term[]>(SAMPLE_TERMS)
  const [courses] = useState<Course[]>(SAMPLE_COURSES)
  const [worklists, setWorklists] = useState<Worklist[]>(SAMPLE_WORKLISTS)
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES)
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(SAMPLE_CALENDAR_EVENTS)
  const [conflicts, setConflicts] = useState<Conflict[]>([])
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>(SAMPLE_GLOSSARY_TERMS)

  // UI state
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Add a message to the conversation
  const addMessage = (content: string, role: "user" | "ai", persona?: AIPersona) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      persona: persona || activePersona,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, newMessage])

    // If it's a user message, generate an AI response
    if (role === "user") {
      // Simulate AI thinking
      setTimeout(() => {
        const aiResponse = generateAIResponse(content, activePersona)
        addMessage(aiResponse, "ai", activePersona)
      }, 1000)
    }
  }

  // Generate a simple AI response based on keywords
  const generateAIResponse = (userMessage: string, persona: AIPersona): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Common responses across all personas
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return `Hello! How can I help you with your course planning today?`
    }

    if (lowerMessage.includes("thank")) {
      return `You're welcome! Let me know if you need anything else.`
    }

    // Persona-specific responses
    if (persona === "advisor") {
      if (lowerMessage.includes("prerequisite") || lowerMessage.includes("prereq")) {
        return `Prerequisites are courses you must complete before taking a specific course. They ensure you have the necessary background knowledge. You can find prerequisites in the course details.`
      }

      if (lowerMessage.includes("credit") || lowerMessage.includes("credits")) {
        return `Most courses are worth 3-4 credits. A full-time student typically takes 15 credits per term. I recommend not exceeding 18 credits to maintain a balanced workload.`
      }

      if (lowerMessage.includes("major") || lowerMessage.includes("program")) {
        return `As a first-year student, you don't need to declare your major right away. Focus on taking prerequisite courses for programs you're interested in to keep your options open.`
      }
    }

    if (persona === "peer") {
      if (lowerMessage.includes("difficult") || lowerMessage.includes("hard")) {
        return `From my experience, MATH 100 and CPSC 110 can be challenging but very rewarding. Make sure to attend all lectures and start assignments early. Study groups really helped me!`
      }

      if (lowerMessage.includes("professor") || lowerMessage.includes("instructor")) {
        return `Dr. Smith for MATH 100 is amazing! Very clear explanations and helpful office hours. Dr. Johnson for CHEM 121 is also great but assigns a lot of homework.`
      }

      if (lowerMessage.includes("time") || lowerMessage.includes("schedule")) {
        return `I found that avoiding 8 AM classes helped me a lot! Also, try to schedule breaks between classes for review and lunch. Having all your classes back-to-back can be exhausting.`
      }
    }

    if (persona === "expert") {
      if (lowerMessage.includes("career") || lowerMessage.includes("job")) {
        return `Computer Science, Engineering, and Health Sciences offer excellent career prospects. Consider taking introductory courses in these areas to explore your interests.`
      }

      if (lowerMessage.includes("research") || lowerMessage.includes("opportunity")) {
        return `Even as a first-year student, you can get involved in research. Look for Work Learn positions or speak with professors about volunteer opportunities in their labs.`
      }

      if (lowerMessage.includes("grad") || lowerMessage.includes("graduate")) {
        return `For graduate school preparation, focus on maintaining a strong GPA and building relationships with professors. Research experience is also valuable, especially in your third and fourth years.`
      }
    }

    // Default response if no keywords match
    return `That's a great question. As your ${persona === "advisor" ? "academic advisor" : persona === "peer" ? "peer mentor" : "program expert"}, I'd recommend exploring the course catalog and considering your interests and strengths when planning your schedule.`
  }

  // Add a course to the current worklist
  const addCourseToWorklist = (courseId: string, sectionId: string) => {
    // Check if course is already in worklist

    if (currentWorklist.courses.includes(courseId)) {
      return
    }

    // Update the current worklist
    const updatedWorklist = {
      ...currentWorklist,
      courses: [...currentWorklist.courses, courseId],
      sections: [...currentWorklist.sections, sectionId],
    }
    
    // Update the worklists array
    setWorklists((prev) => prev.map((wl) => (wl.id === currentWorklist.id ? updatedWorklist : wl)))

    // Update the current worklist
    setCurrentWorklist(updatedWorklist)

    // Add calendar events for this course section
    const course = courses.find((c) => c.id === courseId)
    const section = course?.sections.find((s) => s.id === sectionId)

    if (course && section) {
      const newEvents: CalendarEvent[] = section.schedule.map((time) => {
        const dayMap: Record<string, string> = {
          Monday: "Monday",
          Tuesday: "Tuesday",
          Wednesday: "Wednesday",
          Thursday: "Thursday",
          Friday: "Friday",
        }

        const day = dayMap[time.day]
        const startHour = parseTimeToHour(time.startTime)
        const endHour = parseTimeToHour(time.endTime)

        return {
          id: `${sectionId}-${day}-${startHour}`,
          courseId,
          sectionId,
          title: `${course.code}: ${section.type} ${section.number}`,
          day,
          startHour,
          endHour,
          color: course.color || getRandomColor(course.code),
          location: section.location,
        }
      })

      setCalendarEvents((prev) => [...prev, ...newEvents])

      // Check for conflicts
      detectConflicts(newEvents)
    }
  }

  // Remove a course from the current worklist
  const removeCourseFromWorklist = (courseId: string) => {
    // Get the sections to remove
    const sectionsToRemove = currentWorklist.sections.filter((_, index) => currentWorklist.courses[index] === courseId)

    // Update the current worklist
    const updatedWorklist = {
      ...currentWorklist,
      courses: currentWorklist.courses.filter((id) => id !== courseId),
      sections: currentWorklist.sections.filter((_, index) => currentWorklist.courses[index] !== courseId),
    }

    // Update the worklists array
    setWorklists((prev) => prev.map((wl) => (wl.id === currentWorklist.id ? updatedWorklist : wl)))

    // Update the current worklist
    setCurrentWorklist(updatedWorklist)

    // Remove calendar events for this course
    setCalendarEvents((prev) => prev.filter((event) => event.courseId !== courseId))

    // Remove any conflicts involving this course
    setConflicts((prev) => prev.filter((conflict) => !conflict.courseIds.includes(courseId)))
  }

  // Helper function to parse time string to hour number
  const parseTimeToHour = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(":").map(Number)
    return hours + minutes / 60
  }

  // Helper function to get a consistent color based on course code
  const getRandomColor = (code: string): string => {
    const colors = ["blue", "green", "purple", "orange", "pink", "teal"]
    const hash = code.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  // Detect time conflicts between calendar events
  const detectConflicts = (newEvents: CalendarEvent[]) => {
    const newConflicts: Conflict[] = []

    // Check each new event against existing events
    newEvents.forEach((newEvent) => {
      calendarEvents.forEach((existingEvent) => {
        // Skip if same course
        if (newEvent.courseId === existingEvent.courseId) return

        // Check if same day and overlapping time
        if (
          newEvent.day === existingEvent.day &&
          ((newEvent.startHour < existingEvent.endHour && newEvent.startHour >= existingEvent.startHour) ||
            (newEvent.endHour > existingEvent.startHour && newEvent.endHour <= existingEvent.endHour) ||
            (newEvent.startHour <= existingEvent.startHour && newEvent.endHour >= existingEvent.endHour))
        ) {
          // Create a conflict
          const conflictId = `conflict-${newEvent.courseId}-${existingEvent.courseId}`

          // Check if this conflict already exists
          if (!conflicts.some((c) => c.id === conflictId)) {
            const newCourse = courses.find((c) => c.id === newEvent.courseId)
            const existingCourse = courses.find((c) => c.id === existingEvent.courseId)

            if (newCourse && existingCourse) {
              const conflict: Conflict = {
                id: conflictId,
                type: "time",
                description: `Time conflict between ${newCourse.code} and ${existingCourse.code} on ${newEvent.day}`,
                courseIds: [newEvent.courseId, existingEvent.courseId],
                sectionIds: [newEvent.sectionId, existingEvent.sectionId],
                suggestions: [
                  `Try a different section of ${newCourse.code}`,
                  `Try a different section of ${existingCourse.code}`,
                  `Remove one of the conflicting courses`,
                ],
              }

              newConflicts.push(conflict)
            }
          }
        }
      })
    })

    if (newConflicts.length > 0) {
      setConflicts((prev) => [...prev, ...newConflicts])
    }
  }

  // Mark a concept as explained
  const markConceptAsExplained = (conceptId: string) => {
    setGlossaryTerms((prev) => prev.map((term) => (term.id === conceptId ? { ...term, hasBeenShown: true } : term)))
  }

  const value = {
    // Current state
    currentTerm,
    currentWorklist,
    activePersona,

    // Data
    terms,
    courses,
    worklists,
    messages,
    calendarEvents,
    conflicts,
    glossaryTerms,

    // UI state
    selectedCourse,
    isDetailOpen,
    searchTerm,

    // Actions
    setCurrentTerm,
    setCurrentWorklist,
    setActivePersona,
    addMessage,
    addCourseToWorklist,
    removeCourseFromWorklist,
    setSelectedCourse,
    setIsDetailOpen,
    setSearchTerm,
    markConceptAsExplained,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

