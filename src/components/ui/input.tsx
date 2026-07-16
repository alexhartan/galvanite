import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"
import type { ComponentMeta } from "@/lib/component-meta"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
export const meta: ComponentMeta = {
  name: "Input",
  description: "Single-line text field for short free-form entry.",
  category: "forms",
  status: "stable",
  structure: {
    anatomy: ["root input"],
    composition: "Pair with a Label via htmlFor/id; group inside a form field wrapper.",
  },
  appearance: {
    tokens: ["input", "background", "foreground", "muted-foreground", "ring", "destructive"],
    states: ["rest", "focus-visible", "disabled", "invalid"],
  },
  behavior: {
    interactions: ["type", "focus", "blur"],
    events: ["onChange", "onFocus", "onBlur"],
    controllable: true,
    notes: ["Supports controlled and uncontrolled use; type=email/number/etc."],
  },
  accessibility: {
    role: "textbox",
    keyboard: ["Standard text-editing keys"],
    aria: ["aria-invalid toggles the error ring", "associate a Label or aria-label"],
  },
  aiHints: {
    priority: 1,
    useCases: ["Name/email/short text", "Search box", "Numeric entry"],
    antiPatterns: [
      { avoid: "Placeholder used as the only label", reason: "It disappears on input and fails a11y.", instead: "Always pair with a visible Label." },
      { avoid: "Multi-line content in an Input", reason: "Text is clipped to one line.", instead: "Use Textarea." },
    ],
    whenNotToUse: ["For long text use Textarea", "For a fixed choice set use Select"],
    pairsWith: ["Label", "Button"],
  },
}
