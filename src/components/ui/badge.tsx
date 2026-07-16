import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import type { ComponentMeta } from "@/lib/component-meta"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
export const meta: ComponentMeta = {
  name: "Badge",
  description: "Compact non-interactive label for status, counts, or categorization.",
  category: "data-display",
  status: "stable",
  structure: {
    anatomy: ["root", "icon (optional)", "label"],
    composition: "Render inline within headings, list rows, or CardAction.",
  },
  appearance: {
    variants: ["default", "secondary", "destructive", "outline"],
    tokens: ["primary", "secondary", "destructive", "border", "foreground"],
    states: ["rest"],
  },
  behavior: {
    interactions: [],
    controllable: false,
    notes: ["Decorative by default; not focusable or clickable."],
  },
  accessibility: {
    role: "status (only if it conveys live state)",
    notes: ["Keep text meaningful on its own; color is not the only signal."],
  },
  aiHints: {
    priority: 3,
    useCases: ["Show item status (New, Beta)", "Category tag", "Small count indicator"],
    selectionCriteria: {
      default: "Neutral/positive emphasis.",
      secondary: "Muted, low-emphasis tag.",
      destructive: "Error or warning status.",
      outline: "Quiet tag on busy surfaces.",
    },
    antiPatterns: [
      { avoid: "Making a Badge clickable", reason: "It has no interactive affordance or focus handling.", instead: "Use a Button (size xs) or a link." },
    ],
    whenNotToUse: ["For dismissible tokens use a chip/tag with a remove control"],
    pairsWith: ["Card", "Button"],
  },
}
