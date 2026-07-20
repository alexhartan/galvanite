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
  component: {
    name: "Badge",
    category: "atoms",
    type: "display",
    description: "Compact non-interactive label for status, counts, or categorization.",
    path: "src/components/ui/badge.tsx",
    figma: { nodeId: null },
  },
  props: {
    variant: {
      type: "enum",
      default: "default",
      description: "Emphasis / semantic tone.",
      options: ["default", "secondary", "destructive", "outline"],
    },
    className: { type: "string", required: false },
  },
  variants: {
    axes: { variant: ["default", "secondary", "destructive", "outline"] },
    purpose: {
      "variant.default": "Neutral/positive emphasis.",
      "variant.secondary": "Muted, low-emphasis tag.",
      "variant.destructive": "Error or warning status.",
      "variant.outline": "Quiet tag on busy surfaces.",
    },
  },
  relationships: {
    commonPartners: ["Card", "Button"],
    mustBeChildOf: [],
    role: "status (only when it conveys live state, otherwise none)",
    keyboardSupport: "Not focusable; decorative.",
    screenReader: "Read as text; keep the label meaningful without color.",
  },
  tokens: {
    color: { background: "var(--primary)", foreground: "var(--primary-foreground)", border: "var(--border)" },
    border: { radius: "var(--radius-md)" },
    typography: { size: "0.75rem", weight: "500" },
  },
  aiHints: {
    priority: "low",
    keywords: ["badge", "tag", "status", "chip", "label", "count"],
    selectionCriteria: {
      default: "Neutral/positive status.",
      destructive: "Error / warning.",
      outline: "Low-emphasis tag.",
    },
    usage: {
      useCases: ["Show item status (New, Beta)", "Category tag", "Small count indicator"],
      commonPatterns: [
        { name: "Card status", composition: "Badge inside CardAction to flag a card." },
      ],
      antiPatterns: [
        { scenario: "Making a Badge clickable", reason: "It has no interactive affordance or focus handling.", alternative: "Use a Button size=xs or a link." },
      ],
    },
  },
}
