"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function RegistrationSuccess({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center justify-center">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <DialogTitle className="text-xl">Registration Complete</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Your course registration has been successfully submitted. A confirmation has been sent to your email
            address.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-green-50 p-4 rounded-md border border-green-200 text-green-800 text-sm">
          <p className="font-medium">Registration Details:</p>
          <ul className="mt-2 list-disc list-inside">
            <li>Term: Winter 2024</li>
            <li>Courses: {Math.floor(Math.random() * 3) + 3} courses registered</li>
            <li>Credits: {Math.floor(Math.random() * 6) + 12} credits</li>
            <li>Registration ID: REG-{Math.floor(Math.random() * 900000) + 100000}</li>
          </ul>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

