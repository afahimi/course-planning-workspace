"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "./context/app-context"
import { CalendarGrid } from "./components/calendar-grid"
import { AICompanion } from "./components/ai-companion"
import { CourseSearch } from "./components/course-search"
import { CourseDetailPopup } from "./components/course-detail-popup"
import { ConflictResolution } from "./components/conflict-resolution"
import { RegistrationSuccess } from "./components/registration-success"
import { ConflictTimer } from "./components/conflict-timer"
import { TermSelector } from "./components/term-selector"
import { WorklistSelector } from "./components/worklist-selector"
import { PresetSelector } from "./components/preset-selector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Search,
  BookOpen,
  AlertTriangle,
  HelpCircle,
  RefreshCw,
  ArrowLeft,
  Menu,
  CheckCircle,
} from "lucide-react"
import { CurrentSchedule } from "./components/current-schedule"
import { PRESET_TERMS, generatePresetData } from "./data/preset-data"

export default function RegistrationCompanion() {
  const {
    currentTerm,
    setCurrentTerm,
    conflicts,
    setConflicts,
    selectedCourse,
    isDetailOpen,
    setIsDetailOpen,
    setWorklists,
    setCurrentWorklist,
    setCalendarEvents,
  } = useAppContext()

  const [activeTab, setActiveTab] = useState("calendar")
  const [showConflicts, setShowConflicts] = useState(false)
  const [showPresetSelector, setShowPresetSelector] = useState(true)
  const [currentPreset, setCurrentPreset] = useState<number>(1)
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false)
  const [initialConflicts, setInitialConflicts] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  const handleRegister = () => {
    setShowRegistrationSuccess(true)
  }

  // Apply preset data when preset is selected
  const handlePresetSelected = (presetId: number) => {
    const { worklist, events, conflicts } = generatePresetData(presetId)

    // Set selected preset
    setCurrentPreset(presetId)

    // Update worklist and current worklist
    setWorklists((prev) => {
      const updatedWorklists = [...prev.filter((w) => w.id !== worklist.id), worklist]
      return updatedWorklists
    })
    setCurrentWorklist(worklist)

    // Set calendar events from preset
    setCalendarEvents(events)

    // Set conflicts from preset
    setConflicts(conflicts)

    // Store initial conflict count for the timer
    setInitialConflicts(conflicts.length)

    // Start the timer
    setTimerActive(true)

    // Start the timer only if not in sandbox mode and there are conflicts
    setTimerActive(presetId !== 0 && conflicts.length > 0)

    // Close preset selector
    setShowPresetSelector(false)
  }

  // Reset to preset selector
  const handleReset = () => {
    setShowPresetSelector(true)
    setTimerActive(false)
  }

  // Set default term on first load
  useEffect(() => {
    setCurrentTerm(PRESET_TERMS[0])
  }, [setCurrentTerm])

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Navigation Bars */}
      <div className="flex-shrink-0">
        <div
          className="flex flex-row items-center justify-between"
          style={{ backgroundColor: "#FFFFFF", height: "80px" }}
        >
          <div className="flex justify-between">
            <div className="flex gap-1" style={{ marginLeft: "20px", color: "#002144" }}>
              <Menu className="h-6 w-6 m-4 cursor-pointer" />
              <h1 className="text-2xl font-bold" style={{ paddingTop: "10px" }}>
                MENU
              </h1>
              <div className="h-full ml-10 bg-slate-500" style={{ width: "1px" }} />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center" style={{ backgroundColor: "#002144", height: "80px" }}>
          <div className="flex gap-1" style={{ marginLeft: "20px" }}>
            <ArrowLeft className="h-6 w-6 text-white m-4 cursor-pointer" />
            <h1 className="text-2xl font-bold text-white" style={{ paddingTop: "10px" }}>
              Course Registration
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Area - Limited to remaining viewport height */}
      <div className="flex flex-1 overflow-hidden bg-slate-50">
        {/* Main Content Section (70%) */}
        <div className="w-[70%] flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex-shrink-0 bg-white border-b p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Course Registration</h1>
              <div className="flex items-center gap-4">
                <TermSelector />
                <WorklistSelector />
                <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Reset Preset</span>
                </Button>
                {conflicts.length > 0 ? (
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
                ) : (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-green-600 border-green-300 bg-green-50"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>No Conflicts</span>
                  </Button>
                )}

                {conflicts.length === 0 && (
                  <Button onClick={handleRegister} className="bg-green-600 hover:bg-green-700 text-white">
                    Register Courses
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="flex-shrink-0 px-4 pt-4">
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

              <div className="flex-1 overflow-hidden">
                <TabsContent
                  value="calendar"
                  className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col overflow-hidden"
                >
                  <div className="flex-shrink-0 flex items-center justify-between p-4">
                    <h2 className="text-lg font-semibold">
                      {currentTerm.name} - Difficulty Level: {currentPreset}
                    </h2>
                  </div>
                  <div className="flex-1 overflow-auto p-4">
                    {/* Timer component */}
                    {/* {timerActive && !showPresetSelector && (
                      <ConflictTimer
                        isRunning={timerActive}
                        conflicts={conflicts.length}
                        initialConflicts={initialConflicts}
                      />
                    )} */}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="lg:col-span-2">
                        <CalendarGrid />
                      </div>
                      <div>
                        <CurrentSchedule />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="search"
                  className="h-full mt-0 data-[state=active]:flex data-[state=active]:flex-col"
                >
                  <div className="flex-1 overflow-auto p-4">
                    <CourseSearch />
                  </div>
                </TabsContent>

                <TabsContent value="info" className="h-full mt-0 overflow-auto p-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Program Information</h2>
                    <p>
                      This is a prototype for a new course registration system. We're testing how effectively users can
                      resolve scheduling conflicts.
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2">How to Use This Survey</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Start by selecting a preset difficulty level</li>
                      <li>Try to resolve all the scheduling conflicts</li>
                      <li>Use the AI assistant to find alternative courses</li>
                      <li>You can reset to a different preset at any time</li>
                    </ol>

                    <h3 className="text-lg font-semibold mt-6 mb-2">About the Presets</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Level 1:</strong> No conflicts - for getting familiar with the interface
                      </li>
                      <li>
                        <strong>Level 2:</strong> Minor conflicts - a couple of simple time overlaps
                      </li>
                      <li>
                        <strong>Level 3:</strong> Multiple conflicts - includes time conflicts and prerequisites
                      </li>
                      <li>
                        <strong>Level 4:</strong> Complex schedule - many interdependent conflicts
                      </li>
                      <li>
                        <strong>Level 5:</strong> Scheduling nightmare - the ultimate challenge
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="help" className="h-full mt-0 overflow-auto p-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Help & Support</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">Resolving Conflicts</h3>
                        <p className="mt-1">
                          Click the conflict notification to see details about schedule conflicts. You can:
                        </p>
                        <ul className="list-disc pl-5 mt-2">
                          <li>Remove one of the conflicting courses</li>
                          <li>Try an alternative section of the same course</li>
                          <li>Use the AI assistant to find replacement courses</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">Using the AI Assistant</h3>
                        <p className="mt-1">The AI assistant can help you with:</p>
                        <ul className="list-disc pl-5 mt-2">
                          <li>Finding courses that fit your schedule</li>
                          <li>Suggesting alternatives to conflicting courses</li>
                          <li>Answering questions about courses and requirements</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">Survey Feedback</h3>
                        <p>
                          After completing the tasks, please provide feedback on your experience with this prototype
                          compared to your current registration system.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* AI Companion Section (30%) */}
        <div className="w-[30%] border-l overflow-hidden">
          <AICompanion />
        </div>

        {/* Popups */}
        <CourseDetailPopup isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} course={selectedCourse} />
        <ConflictResolution
          isOpen={showConflicts}
          onClose={() => setShowConflicts(false)}
          handleRegister={handleRegister}
        />
        <PresetSelector isOpen={showPresetSelector} onClose={handlePresetSelected} />
        <RegistrationSuccess isOpen={showRegistrationSuccess} onClose={() => setShowRegistrationSuccess(false)} />
      </div>
    </div>
  )
}

