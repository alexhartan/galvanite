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
  name: "Card",
  description: "Surface container that groups related content and actions.",
  category: "layout",
  status: "stable",
  structure: {
    anatomy: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardAction", "CardContent", "CardFooter"],
    parts: ["CardHeader", "CardTitle", "CardDescription", "CardAction", "CardContent", "CardFooter"],
    composition: "Compose header (title + description + action) over content over footer.",
  },
  appearance: {
    tokens: ["card", "card-foreground", "border", "muted-foreground"],
    states: ["rest"],
  },
  behavior: {
    interactions: [],
    controllable: false,
    notes: ["Purely presentational; interactivity comes from children."],
  },
  accessibility: {
    notes: ["Give a heading (CardTitle) so the region is identifiable; add aria-labelledby when used as a landmark."],
  },
  aiHints: {
    priority: 2,
    useCases: ["Group a form", "Summary/stat tile", "Content preview", "Settings panel"],
    antiPatterns: [
      { avoid: "Nesting cards several levels deep", reason: "Stacked borders/backgrounds muddy the hierarchy.", instead: "Use spacing or a Separator inside one card." },
    ],
    whenNotToUse: ["For full-bleed page sections that need no boundary"],
    pairsWith: ["Button", "Input", "Tabs", "Separator", "Badge"],
  },
}
