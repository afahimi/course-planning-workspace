"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Course } from "../types"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM

export default function WeeklyCalendar({ courses }: { courses: Course[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-1 text-xs">
          <div></div>
          {DAYS.map((day) => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
          {HOURS.map((hour) => (
            <>
              <div key={hour} className="text-right pr-2">
                {hour}
              </div>
              {DAYS.map((day) => (
                <div key={`${day}-${hour}`} className="border h-6"></div>
              ))}
            </>
          ))}
        </div>
        {courses.map((course) => (
          <div key={course.id} className="absolute bg-blue-200 p-1 rounded text-xs">
            {course.code}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

