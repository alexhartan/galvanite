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
  component: {
    name: "Switch",
    category: "atoms",
    type: "input",
    description: "Toggle for a setting that takes effect immediately.",
    path: "src/components/ui/switch.tsx",
    figma: { nodeId: null },
  },
  props: {
    checked: { type: "boolean", required: false, description: "Controlled on/off state." },
    defaultChecked: { type: "boolean", required: false },
    disabled: { type: "boolean", default: false },
    onCheckedChange: { type: "(checked: boolean) => void", required: false },
    className: { type: "string", required: false },
  },
  variants: { axes: {}, purpose: {} },
  relationships: {
    requires: ["Label"],
    commonPartners: ["Label"],
    exposesState: ["checked"],
    role: "switch",
    keyboardSupport: "Space/Enter toggles; Tab to focus.",
    screenReader: "aria-checked reflects state; label describes the setting.",
  },
  tokens: {
    color: { track: "var(--input)", checkedTrack: "var(--primary)", thumb: "var(--background)", ring: "var(--ring)" },
    border: { radius: "9999px" },
    motion: { transition: "transform 150ms ease" },
  },
  aiHints: {
    priority: "medium",
    keywords: ["switch", "toggle", "setting", "on off", "enable"],
    selectionCriteria: {
      Switch: "Immediate-effect on/off setting.",
      Checkbox: "Use instead inside a form that saves on submit.",
    },
    usage: {
      useCases: ["Enable/disable a feature", "Instant on/off preferences"],
      commonPatterns: [
        { name: "Settings row", composition: "Label on the left, Switch pushed to the right with justify-between." },
      ],
      antiPatterns: [
        { scenario: "Requiring a separate Save after a Switch", reason: "Contradicts its immediate-effect affordance.", alternative: "Apply on change, or use a Checkbox in a saved form." },
      ],
    },
  },
}
