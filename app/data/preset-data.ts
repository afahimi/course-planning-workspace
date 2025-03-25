import type { Course, Term, CalendarEvent, Conflict } from "../types"

export const PRESET_TERMS: Term[] = [
  {
    id: "fall-2023",
    name: "Fall 2023",
    startDate: "2023-09-05",
    endDate: "2023-12-15",
  },
  {
    id: "winter-2024",
    name: "Winter 2024",
    startDate: "2024-01-08",
    endDate: "2024-04-12",
  },
  {
    id: "summer-2024",
    name: "Summer 2024",
    startDate: "2024-05-13",
    endDate: "2024-08-16",
  },
]

// Universal course catalog that would be understandable to any student
export const UNIVERSAL_COURSES: Course[] = [
  {
    id: "intro-comp",
    code: "CORE 101",
    title: "Introduction to Computing",
    description:
      "Fundamentals of computing, programming concepts, and problem-solving approaches using modern languages.",
    credits: 3,
    prerequisites: [],
    corequisites: [],
    color: "blue",
    sections: [
      {
        id: "intro-comp-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Taylor Roberts",
        schedule: [
          { day: "Monday", startTime: "10:00", endTime: "11:30" },
          { day: "Wednesday", startTime: "10:00", endTime: "11:30" },
        ],
        location: "Tech Building 100",
        seatsAvailable: 25,
        totalSeats: 120,
      },
      {
        id: "intro-comp-002",
        type: "Lecture",
        number: "002",
        instructor: "Dr. Alicia Chen",
        schedule: [
          { day: "Tuesday", startTime: "13:00", endTime: "14:30" },
          { day: "Thursday", startTime: "13:00", endTime: "14:30" },
        ],
        location: "Tech Building 202",
        seatsAvailable: 15,
        totalSeats: 100,
      },
      {
        id: "intro-comp-t01",
        type: "Lab",
        number: "L01",
        instructor: "Teaching Assistant",
        schedule: [{ day: "Friday", startTime: "10:00", endTime: "12:00" }],
        location: "Tech Building 305",
        seatsAvailable: 10,
        totalSeats: 30,
      },
    ],
  },
  {
    id: "quant-reasoning",
    code: "CORE 102",
    title: "Quantitative Reasoning",
    description: "Development of mathematical and statistical reasoning for solving real-world problems.",
    credits: 3,
    prerequisites: [],
    corequisites: [],
    color: "green",
    sections: [
      {
        id: "quant-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Marcus Williams",
        schedule: [
          { day: "Monday", startTime: "13:00", endTime: "14:30" },
          { day: "Wednesday", startTime: "13:00", endTime: "14:30" },
        ],
        location: "Science Hall 101",
        seatsAvailable: 20,
        totalSeats: 150,
      },
      {
        id: "quant-002",
        type: "Lecture",
        number: "002",
        instructor: "Dr. Sophia Park",
        schedule: [
          { day: "Tuesday", startTime: "10:00", endTime: "11:30" },
          { day: "Thursday", startTime: "10:00", endTime: "11:30" },
        ],
        location: "Science Hall 101",
        seatsAvailable: 15,
        totalSeats: 150,
      },
    ],
  },
  {
    id: "critical-thinking",
    code: "CORE 103",
    title: "Critical Thinking & Communication",
    description: "Development of reasoning, analysis, and effective communication skills through various media.",
    credits: 3,
    prerequisites: [],
    corequisites: [],
    color: "purple",
    sections: [
      {
        id: "crit-001",
        type: "Lecture",
        number: "001",
        instructor: "Prof. Eleanor Johnson",
        schedule: [
          { day: "Monday", startTime: "9:00", endTime: "10:30" },
          { day: "Wednesday", startTime: "9:00", endTime: "10:30" },
        ],
        location: "Humanities 202",
        seatsAvailable: 10,
        totalSeats: 50,
      },
      {
        id: "crit-002",
        type: "Lecture",
        number: "002",
        instructor: "Prof. David Martinez",
        schedule: [
          { day: "Tuesday", startTime: "15:00", endTime: "16:30" },
          { day: "Thursday", startTime: "15:00", endTime: "16:30" },
        ],
        location: "Humanities 210",
        seatsAvailable: 5,
        totalSeats: 50,
      },
    ],
  },
  {
    id: "global-perspectives",
    code: "CORE 104",
    title: "Global Perspectives",
    description: "Exploration of diverse cultural, political, and social systems around the world.",
    credits: 3,
    prerequisites: [],
    corequisites: [],
    color: "orange",
    sections: [
      {
        id: "global-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Amara Okafor",
        schedule: [
          { day: "Monday", startTime: "11:00", endTime: "12:30" },
          { day: "Wednesday", startTime: "11:00", endTime: "12:30" },
        ],
        location: "Social Sciences 310",
        seatsAvailable: 25,
        totalSeats: 80,
      },
    ],
  },
  {
    id: "research-methods",
    code: "CORE 201",
    title: "Research Methods",
    description: "Introduction to research design, methodologies, data collection, and analysis techniques.",
    credits: 3,
    prerequisites: ["CORE 103"],
    corequisites: [],
    color: "pink",
    sections: [
      {
        id: "research-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Jonathan Blake",
        schedule: [
          { day: "Tuesday", startTime: "9:30", endTime: "11:00" },
          { day: "Thursday", startTime: "9:30", endTime: "11:00" },
        ],
        location: "Research Center 100",
        seatsAvailable: 10,
        totalSeats: 60,
      },
    ],
  },
  {
    id: "data-analysis",
    code: "CORE 202",
    title: "Data Analysis & Visualization",
    description:
      "Methods for analyzing and visualizing data to extract meaningful insights and communicate findings effectively.",
    credits: 3,
    prerequisites: ["CORE 102"],
    corequisites: [],
    color: "teal",
    sections: [
      {
        id: "data-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Emma Liu",
        schedule: [
          { day: "Monday", startTime: "14:00", endTime: "15:30" },
          { day: "Wednesday", startTime: "14:00", endTime: "15:30" },
        ],
        location: "Tech Building 150",
        seatsAvailable: 5,
        totalSeats: 80,
      },
      {
        id: "data-l01",
        type: "Lab",
        number: "L01",
        instructor: "Lab Assistant",
        schedule: [{ day: "Friday", startTime: "13:00", endTime: "15:00" }],
        location: "Tech Building 305",
        seatsAvailable: 5,
        totalSeats: 30,
      },
    ],
  },
  {
    id: "ethical-reasoning",
    code: "CORE 203",
    title: "Ethical Reasoning",
    description: "Exploration of ethical theories and moral dilemmas across various domains and professional contexts.",
    credits: 3,
    prerequisites: ["CORE 103"],
    corequisites: [],
    color: "indigo",
    sections: [
      {
        id: "ethics-001",
        type: "Lecture",
        number: "001",
        instructor: "Prof. Samuel Washington",
        schedule: [
          { day: "Tuesday", startTime: "13:30", endTime: "15:00" },
          { day: "Thursday", startTime: "13:30", endTime: "15:00" },
        ],
        location: "Humanities 150",
        seatsAvailable: 15,
        totalSeats: 60,
      },
    ],
  },
  {
    id: "creative-innovation",
    code: "CORE 204",
    title: "Creative Innovation",
    description: "Development of creative problem-solving approaches and innovative thinking strategies.",
    credits: 3,
    prerequisites: [],
    corequisites: [],
    color: "amber",
    sections: [
      {
        id: "creative-001",
        type: "Lecture",
        number: "001",
        instructor: "Prof. Isabella Rodriguez",
        schedule: [
          { day: "Monday", startTime: "15:30", endTime: "17:00" },
          { day: "Wednesday", startTime: "15:30", endTime: "17:00" },
        ],
        location: "Arts Center 200",
        seatsAvailable: 20,
        totalSeats: 70,
      },
    ],
  },
  {
    id: "leadership",
    code: "CORE 301",
    title: "Leadership & Teamwork",
    description: "Principles of effective leadership, team dynamics, and collaborative problem-solving.",
    credits: 3,
    prerequisites: ["CORE 103"],
    corequisites: [],
    color: "cyan",
    sections: [
      {
        id: "lead-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Michael Townsend",
        schedule: [
          { day: "Tuesday", startTime: "11:00", endTime: "12:30" },
          { day: "Thursday", startTime: "11:00", endTime: "12:30" },
        ],
        location: "Business Building 300",
        seatsAvailable: 10,
        totalSeats: 50,
      },
    ],
  },
  {
    id: "advanced-comp",
    code: "CORE 302",
    title: "Advanced Computing Concepts",
    description: "Advanced topics in computing including data structures, algorithms, and software design principles.",
    credits: 3,
    prerequisites: ["CORE 101"],
    corequisites: [],
    color: "blue",
    sections: [
      {
        id: "adv-comp-001",
        type: "Lecture",
        number: "001",
        instructor: "Dr. Alan Turing",
        schedule: [
          { day: "Monday", startTime: "13:30", endTime: "15:00" },
          { day: "Wednesday", startTime: "13:30", endTime: "15:00" },
        ],
        location: "Tech Building 220",
        seatsAvailable: 15,
        totalSeats: 60,
      },
      {
        id: "adv-comp-l01",
        type: "Lab",
        number: "L01",
        instructor: "Lab Assistant",
        schedule: [{ day: "Friday", startTime: "14:00", endTime: "16:00" }],
        location: "Tech Building 310",
        seatsAvailable: 10,
        totalSeats: 25,
      },
    ],
  },
]

// Generate preset worklists with increasing conflict complexity
export function generatePresetData(presetId: number) {
  const allCourses = UNIVERSAL_COURSES

  // Preset 1: No conflicts - Basic schedule
  if (presetId === 1) {
    return {
      worklist: {
        id: "preset-1",
        name: "Basic Schedule",
        courses: ["intro-comp", "quant-reasoning", "critical-thinking"],
        sections: ["intro-comp-001", "quant-002", "crit-001"],
      },
      events: generateEventsFromCourseSections(
        ["intro-comp", "quant-reasoning", "critical-thinking"],
        ["intro-comp-001", "quant-002", "crit-001"],
        allCourses,
      ),
      conflicts: [],
    }
  }

  // Preset 2: Simple conflicts - 2 time conflicts
  else if (presetId === 2) {
    const worklist = {
      id: "preset-2",
      name: "Minor Conflicts",
      // These will create simple time conflicts
      courses: ["intro-comp", "quant-reasoning", "critical-thinking", "global-perspectives"],
      sections: ["intro-comp-001", "quant-001", "crit-001", "global-001"],
    }

    const events = generateEventsFromCourseSections(worklist.courses, worklist.sections, allCourses)

    const conflicts = detectConflictsInEvents(events, allCourses)

    return { worklist, events, conflicts }
  }

  // Preset 3: Multiple conflicts - 4 conflicts (time + prerequisite)
  else if (presetId === 3) {
    const worklist = {
      id: "preset-3",
      name: "Multiple Conflicts",
      courses: ["intro-comp", "research-methods", "data-analysis", "creative-innovation", "ethical-reasoning"],
      sections: ["intro-comp-002", "research-001", "data-001", "creative-001", "ethics-001"],
    }

    const events = generateEventsFromCourseSections(worklist.courses, worklist.sections, allCourses)

    // Generate time conflicts
    let conflicts = detectConflictsInEvents(events, allCourses)

    // Add prerequisite conflicts
    conflicts = conflicts.concat(detectPrerequisiteConflicts(worklist.courses, allCourses))

    return { worklist, events, conflicts }
  }

  // Preset 4: Complex schedule - 6 conflicts (time + prerequisite + corequisite)
  else if (presetId === 4) {
    const worklist = {
      id: "preset-4",
      name: "Complex Schedule",
      courses: ["intro-comp", "research-methods", "data-analysis", "ethical-reasoning", "leadership", "advanced-comp"],
      sections: ["intro-comp-001", "research-001", "data-001", "ethics-001", "lead-001", "adv-comp-001"],
    }

    const events = generateEventsFromCourseSections(worklist.courses, worklist.sections, allCourses)

    // Generate all types of conflicts
    let conflicts = detectConflictsInEvents(events, allCourses)
    conflicts = conflicts.concat(detectPrerequisiteConflicts(worklist.courses, allCourses))

    // Add another artificial conflict for complexity
    conflicts.push({
      id: "conflict-coreq-1",
      type: "corequisite",
      description: "CORE 302 requires concurrent enrollment in lab section L01",
      courseIds: ["advanced-comp"],
      sectionIds: ["adv-comp-001"],
      suggestions: ["Add the required lab section", "Choose a different course"],
    })

    return { worklist, events, conflicts }
  }

  // Preset 5: Scheduling nightmare - 8+ conflicts (many interdependent conflicts)
  else {
    const worklist = {
      id: "preset-5",
      name: "Scheduling Nightmare",
      courses: [
        "intro-comp",
        "quant-reasoning",
        "critical-thinking",
        "global-perspectives",
        "research-methods",
        "data-analysis",
        "ethical-reasoning",
        "advanced-comp",
      ],
      sections: [
        "intro-comp-001",
        "quant-001",
        "crit-002",
        "global-001",
        "research-001",
        "data-001",
        "ethics-001",
        "adv-comp-001",
      ],
    }

    const events = generateEventsFromCourseSections(worklist.courses, worklist.sections, allCourses)

    // Generate maximum conflicts
    let conflicts = detectConflictsInEvents(events, allCourses)
    conflicts = conflicts.concat(detectPrerequisiteConflicts(worklist.courses, allCourses))

    // Add more artificial conflicts
    conflicts.push({
      id: "conflict-coreq-1",
      type: "corequisite",
      description: "CORE 302 requires concurrent enrollment in lab section L01",
      courseIds: ["advanced-comp"],
      sectionIds: ["adv-comp-001"],
      suggestions: ["Add the required lab section", "Choose a different course"],
    })

    conflicts.push({
      id: "conflict-coreq-2",
      type: "corequisite",
      description: "CORE 202 requires concurrent enrollment in lab section L01",
      courseIds: ["data-analysis"],
      sectionIds: ["data-001"],
      suggestions: ["Add the required lab section", "Choose a different course"],
    })

    // Add an artificial capacity conflict
    conflicts.push({
      id: "conflict-capacity-1",
      type: "capacity",
      description: "CORE 103 section 002 has only 5 seats remaining with 20 students on waitlist",
      courseIds: ["critical-thinking"],
      sectionIds: ["crit-002"],
      suggestions: ["Try a different section", "Consider an alternative course"],
    })

    return { worklist, events, conflicts }
  }
}

// Helper functions for generating preset data
function generateEventsFromCourseSections(
  courseIds: string[],
  sectionIds: string[],
  allCourses: Course[],
): CalendarEvent[] {
  const events: CalendarEvent[] = []

  courseIds.forEach((courseId, index) => {
    const course = allCourses.find((c) => c.id === courseId)
    const sectionId = sectionIds[index]

    if (!course) return

    const section = course.sections.find((s) => s.id === sectionId)
    if (!section) return

    section.schedule.forEach((time) => {
      const startHour = parseTimeToHour(time.startTime)
      const endHour = parseTimeToHour(time.endTime)

      events.push({
        id: `${sectionId}-${time.day}-${startHour}`,
        courseId: courseId,
        sectionId: sectionId,
        title: `${course.code}: ${section.type} ${section.number}`,
        day: time.day,
        startHour: startHour,
        endHour: endHour,
        color: course.color || "blue",
        location: section.location,
      })
    })
  })

  return events
}

function parseTimeToHour(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number)
  return hours + minutes / 60
}

// Update the detectConflictsInEvents function to be more robust
function detectConflictsInEvents(events: CalendarEvent[], allCourses: Course[]): Conflict[] {
  const conflicts: Conflict[] = []

  // Check each pair of events for time conflicts
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      const event1 = events[i]
      const event2 = events[j]

      // Skip if same course
      if (event1.courseId === event2.courseId) continue

      // Check if same day and overlapping time
      if (
        event1.day === event2.day &&
        ((event1.startHour < event2.endHour && event1.startHour >= event2.startHour) ||
          (event1.endHour > event2.startHour && event1.endHour <= event2.endHour) ||
          (event1.startHour <= event2.startHour && event1.endHour >= event2.endHour))
      ) {
        // Find course information
        const course1 = allCourses.find((c) => c.id === event1.courseId)
        const course2 = allCourses.find((c) => c.id === event2.courseId)

        if (course1 && course2) {
          const conflictId = `conflict-time-${event1.courseId}-${event2.courseId}`

          // Avoid duplicate conflicts
          if (!conflicts.some((c) => c.id === conflictId)) {
            conflicts.push({
              id: conflictId,
              type: "time",
              description: `Time conflict between ${course1.code} and ${course2.code} on ${event1.day}`,
              courseIds: [event1.courseId, event2.courseId],
              sectionIds: [event1.sectionId, event2.sectionId],
              suggestions: [
                `Try a different section of ${course1.code}`,
                `Try a different section of ${course2.code}`,
                `Remove one of the conflicting courses`,
              ],
            })
          }
        }
      }
    }
  }

  return conflicts
}

function detectPrerequisiteConflicts(courseIds: string[], allCourses: Course[]): Conflict[] {
  const conflicts: Conflict[] = []

  courseIds.forEach((courseId) => {
    const course = allCourses.find((c) => c.id === courseId)

    if (!course) return

    // Check if all prerequisites are in the course list
    if (course.prerequisites.length > 0) {
      course.prerequisites.forEach((prereqName) => {
        // Find the actual prerequisite course by code or substring match
        const prereqCourse = allCourses.find(
          (c) => prereqName.includes(c.code) || c.code.includes(prereqName) || c.title.includes(prereqName),
        )

        if (prereqCourse && !courseIds.includes(prereqCourse.id)) {
          conflicts.push({
            id: `conflict-prereq-${course.id}-${prereqCourse.id}`,
            type: "prerequisite",
            description: `${course.code} requires prerequisite ${prereqCourse.code}`,
            courseIds: [course.id],
            sectionIds: [],
            suggestions: [
              `Add ${prereqCourse.code} to your schedule`,
              `Remove ${course.code} from your schedule`,
              `Check if you've already completed this prerequisite`,
            ],
          })
        }
      })
    }
  })

  return conflicts
}

// Function to generate AI recommendations based on search terms
export function generateRecommendations(searchTerm: string, currentCourses: string[]): Course[] {
  // Filter the universal course catalog based on search term
  let recommendations = UNIVERSAL_COURSES.filter(
    (course) =>
      !currentCourses.includes(course.id) &&
      (course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // If no matches or empty search, recommend courses without prerequisites first
  if (recommendations.length === 0 || !searchTerm.trim()) {
    recommendations = UNIVERSAL_COURSES.filter(
      (course) => !currentCourses.includes(course.id) && course.prerequisites.length === 0,
    ).slice(0, 5)
  }

  // Limit to 5 recommendations
  return recommendations.slice(0, 5)
}

