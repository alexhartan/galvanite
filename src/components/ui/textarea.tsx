import * as React from "react"

import { cn } from "@/lib/utils"
import type { ComponentMeta } from "@/lib/component-meta"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-3 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

export const meta: ComponentMeta = {
  component: {
    name: "Textarea",
    category: "atoms",
    type: "input",
    description: "Multi-line text field for longer free-form entry.",
    path: "src/components/ui/textarea.tsx",
    figma: { nodeId: null },
  },
  props: {
    placeholder: { type: "string", required: false },
    disabled: { type: "boolean", default: false },
    rows: { type: "number", required: false },
    value: { type: "string", required: false, description: "Controlled value." },
    "aria-invalid": { type: "boolean", required: false },
    onChange: { type: "(e: ChangeEvent) => void", required: false },
    className: { type: "string", required: false },
  },
  variants: { axes: {}, purpose: {} },
  relationships: {
    requires: ["Label"],
    commonPartners: ["Label", "Button"],
    exposesState: ["value", "focused", "invalid"],
    role: "textbox (multiline)",
    keyboardSupport: "Standard text editing; Enter inserts a newline.",
    screenReader: "Needs an associated Label or aria-label.",
  },
  tokens: {
    color: { background: "var(--background)", foreground: "var(--foreground)", border: "var(--input)", ring: "var(--ring)", invalid: "var(--destructive)" },
    border: { radius: "var(--radius-md)" },
  },
  aiHints: {
    priority: "medium",
    keywords: ["textarea", "multiline", "message", "description", "comment"],
    selectionCriteria: {
      Textarea: "Content that can exceed one line.",
      Input: "Use instead for a single short value.",
    },
    usage: {
      useCases: ["Messages/comments", "Descriptions", "Any content over one line"],
      commonPatterns: [
        { name: "Labeled area", composition: "Label + Textarea inside a form field wrapper." },
      ],
      antiPatterns: [
        { scenario: "Using Textarea for a single short value", reason: "Over-sized target for one line.", alternative: "Use Input." },
      ],
    },
  },
}
