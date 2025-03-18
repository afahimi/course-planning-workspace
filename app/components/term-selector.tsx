"use client"
import { useAppContext } from "../context/app-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TermSelector() {
  const { terms, currentTerm, setCurrentTerm } = useAppContext()

  const handleTermChange = (termId: string) => {
    const term = terms.find((t) => t.id === termId)
    if (term) {
      setCurrentTerm(term)
    }
  }

  return (
    <Select value={currentTerm.id} onValueChange={handleTermChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Term" />
      </SelectTrigger>
      <SelectContent>
        {terms.map((term) => (
          <SelectItem key={term.id} value={term.id}>
            {term.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

