import * as React from "react"

import { cn } from "@/lib/utils"
import type { ComponentMeta } from "@/lib/component-meta"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

export const meta: ComponentMeta = {
  component: {
    name: "Card",
    category: "molecules",
    type: "container",
    description: "Surface container that groups related content and actions.",
    path: "src/components/ui/card.tsx",
    figma: { nodeId: null },
  },
  props: {
    className: { type: "string", required: false, description: "Additional classes on the surface." },
  },
  variants: {
    axes: {},
    purpose: {},
  },
  relationships: {
    mustBeParentOf: ["CardHeader", "CardContent", "CardFooter"],
    optionalSibling: ["CardTitle", "CardDescription", "CardAction"],
    commonPartners: ["Button", "Input", "Tabs", "Separator", "Badge"],
    role: "group / region (add aria-labelledby to a CardTitle for a landmark)",
    keyboardSupport: "None itself; interactivity comes from children.",
    screenReader: "Give a CardTitle so the region is identifiable.",
  },
  tokens: {
    color: { background: "var(--card)", foreground: "var(--card-foreground)", border: "var(--border)" },
    border: { radius: "var(--radius-xl)" },
    spacing: { padding: "var(--radius-xl)", gap: "1.5rem" },
  },
  aiHints: {
    priority: "medium",
    keywords: ["card", "panel", "container", "surface", "tile"],
    selectionCriteria: {
      Card: "Group related content/actions behind one bordered surface.",
    },
    usage: {
      useCases: ["Group a form", "Summary/stat tile", "Content preview", "Settings panel"],
      commonPatterns: [
        { name: "Form card", composition: "CardHeader (title + description) → CardContent (fields) → CardFooter (submit)." },
      ],
      antiPatterns: [
        { scenario: "Nesting cards several levels deep", reason: "Stacked borders/backgrounds muddy hierarchy.", alternative: "Use spacing or a Separator within one card." },
      ],
    },
  },
}
