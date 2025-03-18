"use client"

import { useAppContext } from "../context/app-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { HelpCircle } from "lucide-react"

export function GlossaryTooltip({ termId }: { termId: string }) {
  const { glossaryTerms, markConceptAsExplained } = useAppContext()

  const term = glossaryTerms.find((t) => t.id === termId)

  if (!term) return null

  const handleOpen = () => {
    if (!term.hasBeenShown) {
      markConceptAsExplained(termId)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip onOpenChange={handleOpen}>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="px-2 py-1 cursor-help flex items-center gap-1">
            {term.term}
            <HelpCircle className="h-3 w-3" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{term.definition}</p>
          {term.relatedTerms.length > 0 && (
            <div className="mt-2 text-xs">
              <span className="font-semibold">Related:</span> {term.relatedTerms.join(", ")}
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

