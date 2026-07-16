"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { ComponentMeta } from "@/lib/component-meta"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
export const meta: ComponentMeta = {
  name: "Label",
  description: "Accessible caption that names a form control.",
  category: "forms",
  status: "stable",
  structure: {
    anatomy: ["root label", "text", "optional required marker"],
    composition: "Set htmlFor to the control id, or wrap the control.",
  },
  appearance: {
    tokens: ["foreground", "muted-foreground"],
    states: ["rest", "disabled (via peer)"],
  },
  behavior: {
    interactions: ["click forwards focus to the associated control"],
    controllable: false,
  },
  accessibility: {
    notes: ["The primary accessible name for inputs; always associate it."],
  },
  aiHints: {
    priority: 2,
    useCases: ["Name any Input, Textarea, Select, Switch, or Checkbox"],
    antiPatterns: [
      { avoid: "Omitting the association (htmlFor/id)", reason: "Clicking the label won't focus the control and SR pairing breaks.", instead: "Match Label htmlFor to control id." },
    ],
    pairsWith: ["Input", "Textarea", "Select", "Switch", "Checkbox"],
  },
}
