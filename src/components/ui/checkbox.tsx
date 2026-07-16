"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@/lib/utils"
import type { ComponentMeta } from "@/lib/component-meta"
import { CheckIcon } from "lucide-react"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
export const meta: ComponentMeta = {
  name: "Checkbox",
  description: "Binary (or indeterminate) toggle for a single option or list item.",
  category: "forms",
  status: "stable",
  structure: {
    anatomy: ["root box", "check indicator"],
    composition: "Pair with a Label; group several for multi-select lists.",
  },
  appearance: {
    tokens: ["primary", "primary-foreground", "input", "ring", "border"],
    states: ["unchecked", "checked", "indeterminate", "focus-visible", "disabled"],
  },
  behavior: {
    interactions: ["click", "Space to toggle"],
    events: ["onCheckedChange"],
    controllable: true,
  },
  accessibility: {
    role: "checkbox",
    keyboard: ["Space toggles", "Tab focuses"],
    aria: ["aria-checked reflects state incl. mixed"],
  },
  aiHints: {
    priority: 2,
    useCases: ["Accept terms", "Multi-select from a list", "Toggle a boolean setting inline with text"],
    selectionCriteria: {
      Checkbox: "Multiple independent options can be on at once.",
    },
    antiPatterns: [
      { avoid: "Using a Checkbox for an instant on/off preference", reason: "Switch communicates immediate effect better.", instead: "Use Switch for settings that apply immediately." },
    ],
    whenNotToUse: ["For mutually exclusive choices use radios/Select", "For immediate settings use Switch"],
    pairsWith: ["Label"],
  },
}
