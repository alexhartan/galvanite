"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"
import type { ComponentMeta } from "@/lib/component-meta"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
export const meta: ComponentMeta = {
  name: "Switch",
  description: "Toggle for a setting that takes effect immediately.",
  category: "forms",
  status: "stable",
  structure: {
    anatomy: ["track", "thumb"],
    composition: "Pair with a Label describing the setting.",
  },
  appearance: {
    tokens: ["primary", "input", "background", "ring"],
    states: ["off", "on", "focus-visible", "disabled"],
  },
  behavior: {
    interactions: ["click", "Space/Enter to toggle"],
    events: ["onCheckedChange"],
    controllable: true,
    notes: ["Implies the change applies at once — no separate save."],
  },
  accessibility: {
    role: "switch",
    keyboard: ["Space/Enter toggles", "Tab focuses"],
    aria: ["aria-checked reflects state"],
  },
  aiHints: {
    priority: 2,
    useCases: ["Enable/disable a feature", "On/off preferences that apply instantly"],
    antiPatterns: [
      { avoid: "Requiring a separate Save after a Switch", reason: "Contradicts its immediate-effect affordance.", instead: "Apply on change, or use a Checkbox in a form that saves." },
    ],
    whenNotToUse: ["For selecting among 3+ options use Select/Tabs"],
    pairsWith: ["Label"],
  },
}
