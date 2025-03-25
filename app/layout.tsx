"use client"

import type React from "react"

import { AppProvider } from "./context/app-context"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}



import './globals.css'

const metadata = {
      generator: 'v0.dev'
    };
