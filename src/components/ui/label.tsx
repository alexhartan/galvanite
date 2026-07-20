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
  component: {
    name: "Label",
    category: "atoms",
    type: "display",
    description: "Accessible caption that names a form control.",
    path: "src/components/ui/label.tsx",
    figma: { nodeId: null },
  },
  props: {
    htmlFor: { type: "string", required: false, description: "Id of the associated control." },
    className: { type: "string", required: false },
  },
  variants: { axes: {}, purpose: {} },
  relationships: {
    mustBeParentOf: [],
    commonPartners: ["Input", "Textarea", "Select", "Switch", "Checkbox"],
    role: "label",
    keyboardSupport: "Clicking forwards focus to the associated control.",
    screenReader: "Provides the accessible name for its control.",
  },
  tokens: {
    color: { foreground: "var(--foreground)", muted: "var(--muted-foreground)" },
    typography: { size: "0.875rem", weight: "500" },
  },
  aiHints: {
    priority: "medium",
    keywords: ["label", "caption", "form", "field name"],
    selectionCriteria: { Label: "Name any interactive form control." },
    usage: {
      useCases: ["Name an Input, Textarea, Select, Switch, or Checkbox"],
      commonPatterns: [
        { name: "For/id pairing", composition: "Label htmlFor=id linked to control id." },
      ],
      antiPatterns: [
        { scenario: "Omitting the htmlFor/id association", reason: "Click-to-focus and SR pairing break.", alternative: "Match Label htmlFor to the control id." },
      ],
    },
  },
}
