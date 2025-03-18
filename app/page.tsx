"use client"

import { useState } from "react"
import { useAppContext } from "./context/app-context"
import { CalendarGrid } from "./components/calendar-grid"
import { AICompanion } from "./components/ai-companion"
import { CourseSearch } from "./components/course-search"
import { CourseDetailPopup } from "./components/course-detail-popup"
import { ConflictResolution } from "./components/conflict-resolution"
import { TermSelector } from "./components/term-selector"
import { WorklistSelector } from "./components/worklist-selector"
import { GlossaryTooltip } from "./components/glossary-tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Search, BookOpen, AlertTriangle, HelpCircle, ChevronLeft, ChevronRight, ArrowLeft, Menu } from "lucide-react"
import Image from 'next/image'
import ubcLogo from '/public/ubc-logo.png'
import amin from '/public/amin.jpeg'

export default function RegistrationCompanion() {
  const { currentTerm, currentWorklist, conflicts, selectedCourse, isDetailOpen, setIsDetailOpen } = useAppContext()

  const [activeTab, setActiveTab] = useState("calendar")
  const [showConflicts, setShowConflicts] = useState(false)

  return (
    <>
    <div className="flex flex-row items-center justify-between" style={{ backgroundColor: '#FFFFFF', height: "80px" }}>
    <div className="flex justify-between">
    <div className="flex gap-1" style={{ marginLeft: "20px", color: '#002144' }}>
      <Menu className="h-6 w-6 m-4 cursor-pointer" />
      <h1 className="text-2xl font-bold" style={{ paddingTop: "10px" }}>MENU</h1>
      <div className="h-full ml-10 bg-slate-500" style={{ width: "1px" }}/>
      <Image src={ubcLogo} alt="UBC Logo" width={50} height={50} className="ml-4" />
      </div>
    </div>
    <Image src={amin} alt="Amin" width={50} height={50} className="mr-5 rounded-full"/>
    </div>
    <div className="flex flex-col justify-center" style={{ backgroundColor: '#002144', height: "80px" }}>
      <div className="flex gap-1" style={{ marginLeft: "20px" }}>
      <ArrowLeft className="h-6 w-6 text-white m-4 cursor-pointer" />
      <h1 className="text-2xl font-bold text-white" style={{ paddingTop: "10px" }}>Course Registration</h1>
      </div>
    </div>
    <div className="flex h-3/4 bg-slate-50">
      {/* Main Content Section (70%) */}
      <div className="w-[70%] flex flex-col h-full">
        {/* Header */}
        <header className="bg-white border-b p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Course Registration</h1>
            <div className="flex items-center gap-4">
              <TermSelector />
              <WorklistSelector />
              {conflicts.length > 0 && (
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-amber-600 border-amber-300 bg-amber-50"
                  onClick={() => setShowConflicts(true)}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>
                    {conflicts.length} Conflict{conflicts.length > 1 ? "s" : ""}
                  </span>
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-4 pt-4">
              <TabsList>
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </TabsTrigger>
                <TabsTrigger value="search" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span>Course Search</span>
                </TabsTrigger>
                <TabsTrigger value="info" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Program Info</span>
                </TabsTrigger>
                <TabsTrigger value="help" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>Help</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <TabsContent
                value="calendar"
                className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">
                    {currentTerm.name} - {currentWorklist.name}
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous Week
                    </Button>
                    <Button variant="outline" size="sm">
                      Next Week
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
                <CalendarGrid />
              </TabsContent>

              <TabsContent value="search" className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col">
                <CourseSearch />
              </TabsContent>

              <TabsContent value="info" className="h-full mt-0">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Program Information</h2>
                  <p className="mb-4">
                    As a first-year student, you should focus on completing the foundational courses for your intended
                    program. Here are some common first-year requirements:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">Science</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>MATH 100/101 (Calculus)</li>
                        <li>CHEM 121/123 (Chemistry)</li>
                        <li>PHYS 101/102 (Physics)</li>
                        <li>BIOL 112/121 (Biology)</li>
                        <li>ENGL 110 (Academic Writing)</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">Computer Science</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>CPSC 110/121 (Computer Science)</li>
                        <li>MATH 100/101 (Calculus)</li>
                        <li>MATH 221 (Linear Algebra)</li>
                        <li>ENGL 110 (Academic Writing)</li>
                        <li>Science Elective</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Important Terms</h3>
                    <p className="mb-2">
                      Understanding university terminology is important for successful course planning. Hover over these
                      terms to learn more:
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <GlossaryTooltip termId="prerequisite" />
                      <GlossaryTooltip termId="corequisite" />
                      <GlossaryTooltip termId="credit" />
                      <GlossaryTooltip termId="course-load" />
                      <GlossaryTooltip termId="section" />
                      <GlossaryTooltip termId="waitlist" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="help" className="h-full mt-0">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Help & Support</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Using the Registration Companion</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Use the <strong>Calendar</strong> tab to view your current schedule
                        </li>
                        <li>
                          Use the <strong>Course Search</strong> tab to find and add courses
                        </li>
                        <li>
                          Use the <strong>Program Info</strong> tab to learn about program requirements
                        </li>
                        <li>Ask the AI Companion any questions about registration</li>
                        <li>Switch between different AI personas for different perspectives</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2">Registration Tips</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Register for courses as soon as your registration time opens</li>
                        <li>Have backup courses ready in case your first choices are full</li>
                        <li>Check for prerequisites before registering for courses</li>
                        <li>Balance your schedule with different types of courses</li>
                        <li>Consider your commute time when planning your schedule</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2">Contact Academic Advising</h3>
                      <p>
                        For additional help with course registration, contact your faculty's academic advising office:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Science Advising: science.advising@university.edu</li>
                        <li>Arts Advising: arts.advising@university.edu</li>
                        <li>Engineering Advising: engineering.advising@university.edu</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* AI Companion Section (30%) */}
      <div className="w-[30%] border-l">
        <AICompanion />
      </div>

      {/* Popups */}
      <CourseDetailPopup isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} course={selectedCourse} />

      <ConflictResolution isOpen={showConflicts} onClose={() => setShowConflicts(false)} />
    </div>
    </>
  )
}

