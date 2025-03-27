"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export function PresetSelector({ isOpen, onClose }: { isOpen: boolean; onClose: (preset: number) => void }) {
  const presets = [
    {
      id: 0, // Using 0 for sandbox mode
      name: "Sandbox Mode",
      description: "Start with a blank schedule and freely explore the course registration system at your own pace.",
      conflicts: 0,
      difficulty: "Free Play",
    },
    {
      id: 1,
      name: "Basic Schedule",
      description: "A simple schedule with no conflicts. Good for getting familiar with the interface.",
      conflicts: 0,
      difficulty: "Easy",
    },
    {
      id: 2,
      name: "Minor Conflicts",
      description: "A schedule with a couple of simple time conflicts that can be easily resolved.",
      conflicts: 2,
      difficulty: "Moderate",
    },
    {
      id: 3,
      name: "Multiple Conflicts",
      description: "Several overlapping courses with multiple conflict types to resolve.",
      conflicts: 4,
      difficulty: "Challenging",
    },
    {
      id: 4,
      name: "Complex Schedule",
      description: "A packed schedule with many interdependent conflicts that require careful planning.",
      conflicts: 6,
      difficulty: "Difficult",
    },
    {
      id: 5,
      name: "Scheduling Nightmare",
      description: "A complex web of conflicts, prerequisites, and corequisites. For expert schedulers only!",
      conflicts: 8,
      difficulty: "Expert",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl mb-2">Choose Your Scheduling Challenge</DialogTitle>
          <DialogDescription className="text-base">
            Select a preset to begin testing the registration system. Each preset offers a different level of scheduling
            complexity.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {presets.map((preset) => (
            <Card
              key={preset.id}
              className={`p-4 cursor-pointer border-2 hover:border-blue-400 hover:shadow-md transition-all ${
                preset.id === 0
                  ? "border-blue-200"
                  : preset.id < 3
                    ? "border-green-200"
                    : preset.id < 5
                      ? "border-orange-200"
                      : "border-red-200"
              }`}
              onClick={() => onClose(preset.id)}
            >
              <h3 className="font-bold text-lg mb-1">{preset.name}</h3>
              <div
                className={`text-sm font-medium mb-2 ${
                  preset.id === 0
                    ? "text-blue-600"
                    : preset.id < 3
                      ? "text-green-600"
                      : preset.id < 5
                        ? "text-orange-600"
                        : "text-red-600"
                }`}
              >
                {preset.difficulty}
              </div>
              <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
              <div className="flex items-center text-sm">
                <AlertTriangle
                  className={`h-4 w-4 mr-1 ${
                    preset.id === 0
                      ? "text-blue-600"
                      : preset.id < 3
                        ? "text-green-600"
                        : preset.id < 5
                          ? "text-orange-600"
                          : "text-red-600"
                  }`}
                />
                <span>{preset.conflicts} potential conflicts</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            For this survey, we're measuring how efficiently you can resolve scheduling conflicts and build a workable
            course schedule.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

