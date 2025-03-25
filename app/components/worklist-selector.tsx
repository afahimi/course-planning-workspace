"use client"
import { useAppContext } from "../context/app-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function WorklistSelector() {
  const { worklists, currentWorklist, setCurrentWorklist } = useAppContext()

  const handleWorklistChange = (worklistId: string) => {
    const worklist = worklists.find((w) => w.id === worklistId)
    if (worklist) {
      setCurrentWorklist(worklist)
    }
  }

  return (
    <Select value={currentWorklist.id} onValueChange={handleWorklistChange}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select Worklist" />
      </SelectTrigger>
      <SelectContent>
        {worklists.map((worklist) => (
          <SelectItem key={worklist.id} value={worklist.id}>
            {worklist.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

