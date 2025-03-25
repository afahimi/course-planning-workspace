// Course and schedule related types
export interface Course {
  id: string
  code: string
  title: string
  description: string
  credits: number
  prerequisites: string[]
  corequisites: string[]
  sections: CourseSection[]
  color?: string
}

export interface CourseSection {
  id: string
  type: "Lecture" | "Lab" | "Tutorial"
  number: string
  instructor: string
  schedule: ScheduleTime[]
  location: string
  seatsAvailable: number
  totalSeats: number
}

export interface ScheduleTime {
  day: string
  startTime: string
  endTime: string
}

export interface CalendarEvent {
  id: string
  courseId: string
  sectionId: string
  title: string
  day: string
  startHour: number
  endHour: number
  color: string
  location: string
}

export interface Worklist {
  id: string
  name: string
  courses: string[] // Course IDs
  sections: string[] // Section IDs
}

// Term related types
export interface Term {
  id: string
  name: string
  startDate: string
  endDate: string
}

// AI companion related types
export type AIPersona = "advisor" | "peer" | "expert"

export interface Message {
  id: string
  role: "ai" | "user"
  content: string
  persona?: AIPersona
  timestamp: number
}

export interface ConversationHistory {
  messages: Message[]
  explainedConcepts: string[]
}

// Conflict related types
export interface Conflict {
  id: string
  type: "time" | "prerequisite" | "corequisite"
  description: string
  courseIds: string[]
  sectionIds: string[]
  suggestions: string[]
}

// Educational components
export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  relatedTerms: string[]
  hasBeenShown: boolean
}

