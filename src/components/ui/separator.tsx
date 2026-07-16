"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"
import type { ComponentMeta } from "@/lib/component-meta"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
export const meta: ComponentMeta = {
  name: "Separator",
  description: "Thin rule that visually or semantically divides content.",
  category: "layout",
  status: "stable",
  structure: {
    anatomy: ["root rule"],
    composition: "Place between groups; horizontal or vertical via orientation.",
  },
  appearance: {
    tokens: ["border"],
    states: ["rest"],
  },
  behavior: {
    interactions: [],
    controllable: false,
  },
  accessibility: {
    role: "separator (decorative when aria-hidden)",
    notes: ["Set decorative when it carries no semantic meaning."],
  },
  aiHints: {
    priority: 3,
    useCases: ["Divide sections in a Card", "Separate a heading from a row", "Vertical divider in a toolbar"],
    antiPatterns: [
      { avoid: "Stacking separators to fake spacing", reason: "Spacing is a layout concern.", instead: "Use margin/gap utilities." },
    ],
    pairsWith: ["Card", "Tabs"],
  },
}
