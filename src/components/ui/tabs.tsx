"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import type { ComponentMeta } from "@/lib/component-meta"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }

export const meta: ComponentMeta = {
  component: {
    name: "Tabs",
    category: "molecules",
    type: "navigation",
    description: "Switch between peer views within the same context, one visible at a time.",
    path: "src/components/ui/tabs.tsx",
    figma: { nodeId: null },
  },
  props: {
    value: { type: "string", required: false, description: "Controlled active tab value." },
    defaultValue: { type: "string", required: false },
    onValueChange: { type: "(value: string) => void", required: false },
    orientation: { type: "enum", default: "horizontal", options: ["horizontal", "vertical"] },
  },
  variants: {
    axes: { orientation: ["horizontal", "vertical"] },
    purpose: {
      "orientation.horizontal": "Default tab strip above the panel.",
      "orientation.vertical": "Tab list stacked beside the panel.",
    },
  },
  relationships: {
    requires: ["TabsList", "TabsTrigger", "TabsContent"],
    mustBeParentOf: ["TabsList", "TabsContent"],
    commonPartners: ["Card", "Separator"],
    exposesState: ["value"],
    role: "tablist / tab / tabpanel",
    keyboardSupport: "Arrows move between tabs; Tab moves into the panel.",
    screenReader: "Wires aria-selected and aria-controls.",
  },
  tokens: {
    color: { list: "var(--muted)", active: "var(--background)", inactive: "var(--muted-foreground)", ring: "var(--ring)" },
    border: { radius: "var(--radius-lg)" },
  },
  aiHints: {
    priority: "medium",
    keywords: ["tabs", "segmented", "views", "sections", "navigation"],
    selectionCriteria: {
      Tabs: "A few peer views in one panel.",
      Select: "Use instead when there are too many views to fit.",
    },
    usage: {
      useCases: ["Peer views in one panel (Overview/Specs/Team)", "Settings sections"],
      commonPatterns: [
        { name: "Panel switcher", composition: "TabsList of TabsTrigger over matching TabsContent panels." },
      ],
      antiPatterns: [
        { scenario: "Tabs for sequential steps", reason: "Order/progress is not communicated.", alternative: "Use a stepper/wizard." },
        { scenario: "Too many tabs to fit", reason: "Overflow harms discoverability.", alternative: "Use a Select or nav menu." },
      ],
    },
  },
}
