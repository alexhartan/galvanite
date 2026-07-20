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
  component: {
    name: "Checkbox",
    category: "atoms",
    type: "input",
    description: "Binary (or indeterminate) toggle for a single option or list item.",
    path: "src/components/ui/checkbox.tsx",
    figma: { nodeId: null },
  },
  props: {
    checked: { type: "boolean | 'indeterminate'", required: false, description: "Controlled checked state." },
    defaultChecked: { type: "boolean", required: false },
    disabled: { type: "boolean", default: false },
    onCheckedChange: { type: "(checked: boolean) => void", required: false },
    className: { type: "string", required: false },
  },
  variants: { axes: {}, purpose: {} },
  relationships: {
    requires: ["Label"],
    commonPartners: ["Label"],
    exposesState: ["checked", "indeterminate"],
    role: "checkbox",
    keyboardSupport: "Space toggles; Tab to focus.",
    screenReader: "aria-checked reflects state including mixed.",
  },
  tokens: {
    color: { background: "var(--input)", checkedBg: "var(--primary)", checkedFg: "var(--primary-foreground)", ring: "var(--ring)" },
    border: { radius: "var(--radius-sm)" },
  },
  aiHints: {
    priority: "medium",
    keywords: ["checkbox", "toggle", "multi-select", "boolean", "terms"],
    selectionCriteria: {
      Checkbox: "Multiple independent options can be on at once.",
      Switch: "Use instead for a setting that applies immediately.",
    },
    usage: {
      useCases: ["Accept terms", "Multi-select from a list", "Boolean toggle inline with text"],
      commonPatterns: [
        { name: "Consent row", composition: "Checkbox + Label in a horizontal flex." },
      ],
      antiPatterns: [
        { scenario: "Checkbox for an instant on/off preference", reason: "Switch signals immediate effect better.", alternative: "Use Switch for settings that apply at once." },
      ],
    },
  },
}
