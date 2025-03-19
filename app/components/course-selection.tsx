"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Course } from "../types"

const SAMPLE_COURSES: Course[] = [
  {
    id: "1", name: "Introduction to Computer Science", code: "CS101", credits: 3, time: "MWF 10:00-11:00",
    title: "",
    description: "",
    prerequisites: [],
    corequisites: [],
    sections: []
  },
  {
    id: "2", name: "Calculus I", code: "MATH101", credits: 4, time: "TTh 13:00-14:30",
    title: "",
    description: "",
    prerequisites: [],
    corequisites: [],
    sections: []
  },
  {
    id: "3", name: "Introduction to Psychology", code: "PSYC101", credits: 3, time: "MWF 14:00-15:00",
    title: "",
    description: "",
    prerequisites: [],
    corequisites: [],
    sections: []
  },
]

export default function CourseSelection({ onAddCourse }: { onAddCourse: (course: Course) => void }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = SAMPLE_COURSES.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        {filteredCourses.map((course) => (
          <div key={course.id} className="flex justify-between items-center mb-2 p-2 border rounded">
            <div>
              <div className="font-bold">{course.code}</div>
              <div>{course.name}</div>
              <div className="text-sm text-gray-500">{course.time}</div>
            </div>
            <Button onClick={() => onAddCourse(course)}>Add</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

