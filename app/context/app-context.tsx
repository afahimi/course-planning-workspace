"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Course, Term, Worklist, Message, AIPersona, CalendarEvent, Conflict, GlossaryTerm } from "../types"
import { UNIVERSAL_COURSES, PRESET_TERMS, generatePresetData } from "../data/preset-data"

import { SAMPLE_GLOSSARY_TERMS } from "../data/sample-data"

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
  setWorklists: React.Dispatch<React.SetStateAction<Worklist[]>>
  setCalendarEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
  setConflicts: React.Dispatch<React.SetStateAction<Conflict[]>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Get the initial preset data
  const initialPresetData = generatePresetData(1)

  // Current state
  const [currentTerm, setCurrentTerm] = useState<Term>(PRESET_TERMS[0])
  const [currentWorklist, setCurrentWorklist] = useState<Worklist>(initialPresetData.worklist)
  const [activePersona, setActivePersona] = useState<AIPersona>("advisor")

  // Data
  const [terms] = useState<Term[]>(PRESET_TERMS)
  const [courses] = useState<Course[]>(UNIVERSAL_COURSES)
  const [worklists, setWorklists] = useState<Worklist[]>([initialPresetData.worklist])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content:
        "Welcome to the Course Registration Companion! I'm here to help you plan and fix your schedule. What kind of courses are you looking for?",
      persona: "advisor",
      timestamp: Date.now() - 60000,
    },
  ])
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(initialPresetData.events)
  const [conflicts, setConflicts] = useState<Conflict[]>(initialPresetData.conflicts)
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
        const aiResponse = generateAIResponse(content, activePersona, currentWorklist.courses)
        addMessage(aiResponse, "ai", activePersona)
      }, 1000)
    }
  }

  // Generate a contextual AI response based on user input
  const generateAIResponse = (userMessage: string, persona: AIPersona, currentCourses: string[]): string => {
    const lowerMessage = userMessage.toLowerCase()
    const currentCourseObjects = courses.filter((c) => currentCourses.includes(c.id))
    const conflictCount = conflicts.length

    // Check for course-related queries
    const courseKeywords = ["course", "class", "subject", "recommend", "suggest", "find"]
    const conflictKeywords = ["conflict", "overlap", "issue", "problem", "clash", "schedule", "fix", "solve"]
    const prereqKeywords = ["prerequisite", "prereq", "require", "before", "prior"]

    // Common responses across all personas
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return `Hello! How can I help you with your course schedule today?`
    }

    if (lowerMessage.includes("thank")) {
      return `You're welcome! Let me know if you need anything else with your schedule.`
    }

    // Course suggestion requests
    if (courseKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      // Extract potential subjects of interest
      const courseSubjects = []
      if (lowerMessage.includes("math") || lowerMessage.includes("quant")) courseSubjects.push("quantitative")
      if (lowerMessage.includes("comput") || lowerMessage.includes("tech") || lowerMessage.includes("program"))
        courseSubjects.push("computing")
      if (lowerMessage.includes("writ") || lowerMessage.includes("communicat")) courseSubjects.push("communication")
      if (lowerMessage.includes("ethic") || lowerMessage.includes("moral")) courseSubjects.push("ethics")
      if (lowerMessage.includes("global") || lowerMessage.includes("world") || lowerMessage.includes("international"))
        courseSubjects.push("global")

      if (courseSubjects.length > 0) {
        const matchingCourseNames = courses
          .filter((c) => {
            return (
              !currentCourses.includes(c.id) &&
              courseSubjects.some(
                (subject) => c.title.toLowerCase().includes(subject) || c.description.toLowerCase().includes(subject),
              )
            )
          })
          .map((c) => c.code + ": " + c.title)
          .slice(0, 3)

        if (matchingCourseNames.length > 0) {
          return `I've found some courses related to ${courseSubjects.join(" and ")} that might interest you:\n\n${matchingCourseNames.join("\n")}\n\nYou can also search for these in the recommendations below, or type more specific terms to refine your search.`
        }
      }

      return `I can help you find courses! Try typing keywords related to your interests in the search box below. You'll see recommended courses appear automatically, or you can ask me about specific subject areas.`
    }

    // Conflict resolution help
    if (conflictKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      if (conflictCount === 0) {
        return `Good news! Your schedule currently doesn't have any conflicts. You're free to add more courses if you'd like.`
      } else {
        const conflictTypes = [...new Set(conflicts.map((c) => c.type))]
        const timeConflicts = conflicts.filter((c) => c.type === "time").length
        const prereqConflicts = conflicts.filter((c) => c.type === "prerequisite").length
        const otherConflicts = conflicts.filter((c) => !["time", "prerequisite"].includes(c.type)).length

        return `I notice you have ${conflictCount} conflict${conflictCount > 1 ? "s" : ""} in your schedule:
${timeConflicts > 0 ? `\n- ${timeConflicts} time conflict${timeConflicts > 1 ? "s" : ""}` : ""}
${prereqConflicts > 0 ? `\n- ${prereqConflicts} prerequisite issue${prereqConflicts > 1 ? "s" : ""}` : ""}
${otherConflicts > 0 ? `\n- ${otherConflicts} other issue${otherConflicts > 1 ? "s" : ""}` : ""}

Click on the conflict notification at the top right to see details and fix them. For each conflict, you can either remove one of the courses or try alternative sections.`
      }
    }

    // Prerequisite information
    if (prereqKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      const coursesWithPrereqs = courses.filter((c) => c.prerequisites.length > 0)

      if (coursesWithPrereqs.length > 0) {
        const courseNames = coursesWithPrereqs
          .slice(0, 3)
          .map((c) => `${c.code} requires: ${c.prerequisites.join(", ")}`)

        return `Here's some prerequisite information that might help:\n\n${courseNames.join("\n")}\n\nYou can view all prerequisites in the course details.`
      }
    }

    // Persona-specific responses
    if (persona === "advisor") {
      if (currentCourses.length === 0) {
        return `I see you don't have any courses in your schedule yet. Consider starting with some core courses like CORE 101 or CORE 102. You can find these and other options in the recommendations below.`
      } else if (currentCourses.length < 3) {
        return `You currently have ${currentCourses.length} course${currentCourses.length > 1 ? "s" : ""} in your schedule. Most students take 4-5 courses per term. Would you like me to recommend some additional courses?`
      } else if (conflictCount > 0) {
        return `I notice you have some schedule conflicts to resolve. Click the conflict notification to see details, or I can help suggest alternatives if you tell me which subject areas interest you.`
      }
    }

    if (persona === "peer") {
      if (lowerMessage.includes("difficult") || lowerMessage.includes("hard") || lowerMessage.includes("challenging")) {
        return `From my experience, CORE 101 and CORE 201 can be challenging but very rewarding. Make sure to attend all lectures and start assignments early. Study groups really helped me!`
      }

      if (
        lowerMessage.includes("professor") ||
        lowerMessage.includes("instructor") ||
        lowerMessage.includes("teacher")
      ) {
        return `Dr. Taylor Roberts for CORE 101 is amazing! Very clear explanations and helpful office hours. Dr. Marcus Williams for CORE 102 is also great but assigns more homework.`
      }

      if (lowerMessage.includes("time") || lowerMessage.includes("schedule") || lowerMessage.includes("busy")) {
        return `I found that avoiding 8 AM classes helped me a lot! Also, try to schedule breaks between classes for review and lunch. Having all your classes back-to-back can be exhausting.`
      }
    }

    if (persona === "expert") {
      if (lowerMessage.includes("career") || lowerMessage.includes("job") || lowerMessage.includes("work")) {
        return `The courses in computing (CORE 101, 302) and data analysis (CORE 202) offer excellent career prospects. Leadership skills (CORE 301) are also highly valued in many industries. Consider taking a mix of technical and soft skill courses for a well-rounded profile.`
      }

      if (
        lowerMessage.includes("research") ||
        lowerMessage.includes("opportunity") ||
        lowerMessage.includes("project")
      ) {
        return `CORE 201: Research Methods is an excellent foundation for getting involved in research. After taking that course, you can approach professors about research assistant opportunities or independent study projects.`
      }

      if (lowerMessage.includes("graduate") || lowerMessage.includes("masters") || lowerMessage.includes("phd")) {
        return `For graduate school preparation, focus on maintaining a strong GPA and building relationships with professors. Research experience is also valuable - CORE 201 and CORE 202 will help develop the analytical skills graduate programs look for.`
      }
    }

    // Default response if no keywords match
    return `That's a good question. As your ${persona === "advisor" ? "academic advisor" : persona === "peer" ? "peer mentor" : "program expert"}, I'd suggest exploring the available courses and resolving any schedule conflicts. Is there a specific subject you're interested in learning more about?`
  }

  const addCourseToWorklist = (courseId: string, sectionId: string) => {
    // Check if course is already in worklist
    const existingIndex = currentWorklist.courses.indexOf(courseId);
    
    if (existingIndex !== -1) {
      // UPDATE existing course with the new section instead of returning
      console.log(`Updating existing course ${courseId} with section ${sectionId}`);
      
      // Create new arrays to avoid mutation issues
      const updatedCourses = [...currentWorklist.courses];
      const updatedSections = [...currentWorklist.sections];
      
      // Update the section for this course
      updatedSections[existingIndex] = sectionId;
      
      // Create updated worklist
      const updatedWorklist = {
        ...currentWorklist,
        courses: updatedCourses,
        sections: updatedSections,
      };
      
      // Update worklists array
      setWorklists((prev) => prev.map((wl) => (wl.id === currentWorklist.id ? updatedWorklist : wl)));
      
      // Update current worklist
      setCurrentWorklist(updatedWorklist);
      
      // Remove old calendar events for this course
      setCalendarEvents((prev) => prev.filter((event) => event.courseId !== courseId));
      
      // Add new calendar events for this section
      const course = courses.find((c) => c.id === courseId);
      const section = course?.sections.find((s) => s.id === sectionId);
      
      if (course && section) {
        const newEvents: CalendarEvent[] = section.schedule.map((time) => {
          const startHour = parseTimeToHour(time.startTime);
          const endHour = parseTimeToHour(time.endTime);
          
          return {
            id: `${sectionId}-${time.day}-${startHour}`,
            courseId,
            sectionId,
            title: `${course.code}: ${section.type} ${section.number}`,
            day: time.day,
            startHour,
            endHour,
            color: course.color || getRandomColor(course.code),
            location: section.location,
          };
        });
        
        setCalendarEvents((prev) => [...prev, ...newEvents]);
        
        // Check for conflicts
        detectConflicts(newEvents);
      }
      
      return;
    }
    
    // If the course is not in the worklist, add it as normal
    // Update the current worklist
    const updatedWorklist = {
      ...currentWorklist,
      courses: [...currentWorklist.courses, courseId],
      sections: [...currentWorklist.sections, sectionId],
    };
    
    // Update the worklists array
    setWorklists((prev) => prev.map((wl) => (wl.id === currentWorklist.id ? updatedWorklist : wl)));
    
    // Update the current worklist
    setCurrentWorklist(updatedWorklist);
    
    // Add calendar events for this course section
    const course = courses.find((c) => c.id === courseId);
    const section = course?.sections.find((s) => s.id === sectionId);
    
    if (course && section) {
      const newEvents: CalendarEvent[] = section.schedule.map((time) => {
        const startHour = parseTimeToHour(time.startTime);
        const endHour = parseTimeToHour(time.endTime);
        
        return {
          id: `${sectionId}-${time.day}-${startHour}`,
          courseId,
          sectionId,
          title: `${course.code}: ${section.type} ${section.number}`,
          day: time.day,
          startHour,
          endHour,
          color: course.color || getRandomColor(course.code),
          location: section.location,
        };
      });
      
      setCalendarEvents((prev) => [...prev, ...newEvents]);
      
      // Check for conflicts
      detectConflicts(newEvents);
      
      // Check for prerequisite conflicts
      checkPrerequisiteConflicts(course);
    }
  };

  // Check for prerequisite conflicts
  const checkPrerequisiteConflicts = (course: Course) => {
    if (!course.prerequisites || course.prerequisites.length === 0) return

    // For each prerequisite, check if it's in the current worklist
    course.prerequisites.forEach((prereqName) => {
      // Find the matching prerequisite course
      const prereqCourse = courses.find(
        (c) => prereqName.includes(c.code) || c.code.includes(prereqName) || c.title.includes(prereqName),
      )

      if (prereqCourse && !currentWorklist.courses.includes(prereqCourse.id)) {
        // Add a prerequisite conflict
        const conflictId = `conflict-prereq-${course.id}-${prereqCourse.id}`

        // Check if this conflict already exists
        if (!conflicts.some((c) => c.id === conflictId)) {
          const conflict: Conflict = {
            id: conflictId,
            type: "prerequisite",
            description: `${course.code} requires prerequisite ${prereqCourse.code}`,
            courseIds: [course.id],
            sectionIds: [],
            suggestions: [
              `Add ${prereqCourse.code} to your schedule`,
              `Remove ${course.code} from your schedule`,
              `Check if you've already completed this prerequisite`,
            ],
          }

          setConflicts((prev) => [...prev, conflict])
        }
      }
    })
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
    const colors = ["blue", "green", "purple", "orange", "pink", "teal", "indigo", "amber", "cyan", "lime"]
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
          const conflictId = `conflict-time-${newEvent.courseId}-${existingEvent.courseId}`

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
    setWorklists,
    setCalendarEvents,
    setConflicts,
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

