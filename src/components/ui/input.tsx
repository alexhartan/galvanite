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
        "h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }

export const meta: ComponentMeta = {
  component: {
    name: "Input",
    category: "atoms",
    type: "input",
    description: "Single-line text field for short free-form entry.",
    path: "src/components/ui/input.tsx",
    figma: { nodeId: null },
  },
  props: {
    type: { type: "string", default: "text", description: "Native input type (text, email, number, …)." },
    placeholder: { type: "string", required: false },
    disabled: { type: "boolean", default: false },
    value: { type: "string", required: false, description: "Controlled value." },
    defaultValue: { type: "string", required: false },
    "aria-invalid": { type: "boolean", required: false, description: "Toggles the error ring." },
    onChange: { type: "(e: ChangeEvent) => void", required: false },
    className: { type: "string", required: false },
  },
  variants: { axes: {}, purpose: {} },
  relationships: {
    requires: ["Label"],
    commonPartners: ["Label", "Button"],
    exposesState: ["value", "focused", "invalid"],
    role: "textbox",
    keyboardSupport: "Standard text editing keys; Tab to focus.",
    screenReader: "Needs an associated Label or aria-label; aria-invalid announces errors.",
  },
  tokens: {
    color: { background: "var(--background)", foreground: "var(--foreground)", border: "var(--input)", ring: "var(--ring)", invalid: "var(--destructive)" },
    border: { radius: "var(--radius-md)" },
  },
  aiHints: {
    priority: "high",
    keywords: ["input", "text field", "field", "form", "email", "search"],
    selectionCriteria: {
      Input: "Short single-line value.",
      Textarea: "Use instead for multi-line content.",
      Select: "Use instead for a fixed set of choices.",
    },
    usage: {
      useCases: ["Name/email/short text", "Search box", "Numeric entry"],
      commonPatterns: [
        { name: "Labeled field", composition: "Label htmlFor=id + Input id=id inside a spaced wrapper." },
      ],
      antiPatterns: [
        { scenario: "Placeholder used as the only label", reason: "It disappears on input and fails a11y.", alternative: "Always pair with a visible Label." },
        { scenario: "Multi-line content in an Input", reason: "Text is clipped to one line.", alternative: "Use Textarea." },
      ],
    },
  },
}
