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
  component: {
    name: "Separator",
    category: "atoms",
    type: "display",
    description: "Thin rule that visually or semantically divides content.",
    path: "src/components/ui/separator.tsx",
    figma: { nodeId: null },
  },
  props: {
    orientation: { type: "enum", default: "horizontal", options: ["horizontal", "vertical"] },
    decorative: { type: "boolean", default: true, description: "When true, hidden from the a11y tree." },
    className: { type: "string", required: false },
  },
  variants: {
    axes: { orientation: ["horizontal", "vertical"] },
    purpose: {
      "orientation.horizontal": "Divide stacked content.",
      "orientation.vertical": "Divide inline items in a row/toolbar.",
    },
  },
  relationships: {
    commonPartners: ["Card", "Tabs"],
    role: "separator (or none when decorative)",
    keyboardSupport: "Not focusable.",
    screenReader: "Hidden when decorative; otherwise announces a separator.",
  },
  tokens: {
    color: { background: "var(--border)" },
    spacing: { thickness: "1px" },
  },
  aiHints: {
    priority: "low",
    keywords: ["separator", "divider", "rule", "hr"],
    selectionCriteria: { Separator: "Visually divide two groups of content." },
    usage: {
      useCases: ["Divide sections in a Card", "Separate a heading from a row", "Vertical divider in a toolbar"],
      commonPatterns: [
        { name: "Section divider", composition: "Separator between two stacked blocks." },
      ],
      antiPatterns: [
        { scenario: "Stacking separators to fake spacing", reason: "Spacing is a layout concern.", alternative: "Use margin/gap utilities." },
      ],
    },
  },
}
