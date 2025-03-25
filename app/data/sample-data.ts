import type { Course, Term, Worklist, Message, CalendarEvent, GlossaryTerm } from "../types"

// Sample terms
export const SAMPLE_TERMS: Term[] = [
  {
    id: "winter-2023",
    name: "Winter 2023",
    startDate: "2023-01-09",
    endDate: "2023-04-14",
  },
  {
    id: "summer-2023",
    name: "Summer 2023",
    startDate: "2023-05-15",
    endDate: "2023-08-18",
  },
  {
    id: "fall-2023",
    name: "Fall 2023",
    startDate: "2023-09-05",
    endDate: "2023-12-15",
  },
]

// Sample courses
export const SAMPLE_COURSES: Course[] = [
  {
    id: "math100",
    code: "MATH 100",
    title: "Differential Calculus",
    description:
      "Limits, continuity, derivatives and applications, mean value theorem, fundamental theorem of calculus, and techniques of integration.",
    credits: 3,
    prerequisites: ["High school calculus or equivalent"],
    corequisites: [],
    color: "blue",
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
    description: "Atomic structure, chemical bonding, molecular structure, and properties of matter.",
    credits: 4,
    prerequisites: [],
    corequisites: ["CHEM 123 (Lab)"],
    color: "green",
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
    description: "Structure and function of cells, cell division, and molecular genetics.",
    credits: 3,
    prerequisites: [],
    corequisites: [],
    color: "purple",
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
    description: "Energy, conservation laws, and the physics of waves.",
    credits: 3,
    prerequisites: ["High school physics recommended"],
    corequisites: [],
    color: "orange",
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
    description: "Fundamental program and computation structures.",
    credits: 4,
    prerequisites: [],
    corequisites: [],
    color: "pink",
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
  {
    id: "engl110",
    code: "ENGL 110",
    title: "Academic Writing",
    description:
      "Study and practice of the principles of university-level discourse, with emphasis on expository and persuasive writing.",
    credits: 3,
    prerequisites: [],
    corequisites: [],
    color: "teal",
    sections: [
      {
        id: "engl110-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Thomas Lee",
        schedule: [
          { day: "Monday", startTime: "14:00", endTime: "15:30" },
          { day: "Wednesday", startTime: "14:00", endTime: "15:30" },
        ],
        location: "Arts Building 150",
        seatsAvailable: 5,
        totalSeats: 30,
      },
    ],
  },
]

// Sample worklists
export const SAMPLE_WORKLISTS: Worklist[] = [
  {
    id: "worklist-1",
    name: "Winter 2023 - Science",
    courses: ["math100", "chem121", "biol112"],
    sections: ["math100-001", "chem121-001", "biol112-001"],
  },
  {
    id: "worklist-2",
    name: "Winter 2023 - Computer Science",
    courses: ["math100", "cpsc110", "engl110"],
    sections: ["math100-002", "cpsc110-001", "engl110-001"],
  },
]

// Sample messages
export const SAMPLE_MESSAGES: Message[] = [
  {
    id: "1",
    role: "ai",
    content:
      "Welcome to the Course Registration Companion! I'm here to help you plan your academic journey. What would you like to know about course registration?",
    persona: "advisor",
    timestamp: Date.now() - 60000,
  },
]

// Sample calendar events
export const SAMPLE_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "math100-001-Monday-10",
    courseId: "math100",
    sectionId: "math100-001",
    title: "MATH 100: Lecture 001",
    day: "Monday",
    startHour: 10,
    endHour: 11.5,
    color: "blue",
    location: "Mathematics Building 100",
  },
  {
    id: "math100-001-Wednesday-10",
    courseId: "math100",
    sectionId: "math100-001",
    title: "MATH 100: Lecture 001",
    day: "Wednesday",
    startHour: 10,
    endHour: 11.5,
    color: "blue",
    location: "Mathematics Building 100",
  },
  {
    id: "math100-001-Friday-10",
    courseId: "math100",
    sectionId: "math100-001",
    title: "MATH 100: Lecture 001",
    day: "Friday",
    startHour: 10,
    endHour: 11.5,
    color: "blue",
    location: "Mathematics Building 100",
  },
  {
    id: "chem121-001-Tuesday-13",
    courseId: "chem121",
    sectionId: "chem121-001",
    title: "CHEM 121: Lecture 001",
    day: "Tuesday",
    startHour: 13,
    endHour: 14.5,
    color: "green",
    location: "Chemistry Building 200",
  },
  {
    id: "chem121-001-Thursday-13",
    courseId: "chem121",
    sectionId: "chem121-001",
    title: "CHEM 121: Lecture 001",
    day: "Thursday",
    startHour: 13,
    endHour: 14.5,
    color: "green",
    location: "Chemistry Building 200",
  },
  {
    id: "biol112-001-Monday-9",
    courseId: "biol112",
    sectionId: "biol112-001",
    title: "BIOL 112: Lecture 001",
    day: "Monday",
    startHour: 9,
    endHour: 10.5,
    color: "purple",
    location: "Life Sciences Centre 100",
  },
  {
    id: "biol112-001-Wednesday-9",
    courseId: "biol112",
    sectionId: "biol112-001",
    title: "BIOL 112: Lecture 001",
    day: "Wednesday",
    startHour: 9,
    endHour: 10.5,
    color: "purple",
    location: "Life Sciences Centre 100",
  },
]

// Sample glossary terms
export const SAMPLE_GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "prerequisite",
    term: "Prerequisite",
    definition: "A course that must be completed before taking another course.",
    relatedTerms: ["corequisite"],
    hasBeenShown: false,
  },
  {
    id: "corequisite",
    term: "Corequisite",
    definition: "A course that must be taken at the same time as another course.",
    relatedTerms: ["prerequisite"],
    hasBeenShown: false,
  },
  {
    id: "credit",
    term: "Credit",
    definition: "A unit used to measure academic workload. Most courses are worth 3-4 credits.",
    relatedTerms: ["course load"],
    hasBeenShown: false,
  },
  {
    id: "course-load",
    term: "Course Load",
    definition:
      "The total number of credits a student is taking in a term. Full-time students typically take 15 credits.",
    relatedTerms: ["credit"],
    hasBeenShown: false,
  },
  {
    id: "section",
    term: "Section",
    definition: "A specific offering of a course with its own schedule, instructor, and location.",
    relatedTerms: ["lecture", "lab", "tutorial"],
    hasBeenShown: false,
  },
  {
    id: "waitlist",
    term: "Waitlist",
    definition: "A list of students waiting to register for a course that is currently full.",
    relatedTerms: ["registration"],
    hasBeenShown: false,
  },
]

