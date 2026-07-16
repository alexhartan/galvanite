import * as React from "react"

import { cn } from "@/lib/utils"
import type { ComponentMeta } from "@/lib/component-meta"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
export const meta: ComponentMeta = {
  name: "Textarea",
  description: "Multi-line text field for longer free-form entry.",
  category: "forms",
  status: "stable",
  structure: {
    anatomy: ["root textarea"],
    composition: "Pair with a Label; grows to fit content per field styling.",
  },
  appearance: {
    tokens: ["input", "background", "foreground", "muted-foreground", "ring", "destructive"],
    states: ["rest", "focus-visible", "disabled", "invalid"],
  },
  behavior: {
    interactions: ["type", "focus", "blur", "resize"],
    events: ["onChange", "onFocus", "onBlur"],
    controllable: true,
  },
  accessibility: {
    role: "textbox (multiline)",
    aria: ["associate a Label or aria-label", "aria-invalid toggles the error ring"],
  },
  aiHints: {
    priority: 2,
    useCases: ["Messages/comments", "Descriptions", "Any content over one line"],
    antiPatterns: [
      { avoid: "Using Textarea for a single short value", reason: "Over-sized target for one line.", instead: "Use Input." },
    ],
    whenNotToUse: ["For rich text use a dedicated editor"],
    pairsWith: ["Label", "Button"],
  },
}
