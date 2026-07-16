import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import type { ComponentMeta } from "@/lib/component-meta"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        // Galvanite hero CTA: yellow fill, inverts to deep-navy on hover with a soft blue glow.
        brand:
          "bg-primary text-primary-foreground font-medium tracking-tight rounded-sm hover:bg-background hover:text-foreground hover:shadow-[0_0_0.5rem_0_var(--color-brand-blue7)] active:scale-[0.99]",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xl: "h-12 gap-2 rounded-sm px-7 text-base has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export const meta: ComponentMeta = {
  name: "Button",
  description:
    "Primary interactive control that triggers an action or navigation. Carries the Galvanite yellow CTA as its `brand` variant.",
  category: "actions",
  status: "stable",
  structure: {
    anatomy: ["root", "leading icon (optional)", "label", "trailing icon (optional)"],
    composition: "Icons are auto-sized; use asChild/render to render as a link or other element.",
  },
  appearance: {
    variants: ["default", "outline", "secondary", "ghost", "destructive", "link", "brand"],
    sizes: ["xs", "sm", "default", "lg", "xl", "icon", "icon-sm", "icon-lg"],
    tokens: ["primary", "primary-foreground", "secondary", "muted", "destructive", "ring", "background", "foreground"],
    states: ["rest", "hover", "focus-visible", "active", "disabled"],
  },
  behavior: {
    interactions: ["click", "keyboard activation (Enter/Space)"],
    events: ["onClick"],
    controllable: false,
    notes: ["`brand` inverts yellow→deep-navy on hover with a blue glow, mirroring galvanite.io."],
  },
  accessibility: {
    role: "button",
    keyboard: ["Enter / Space to activate", "Tab to focus"],
    aria: ["aria-label required for icon-only buttons", "aria-disabled reflects disabled"],
    notes: ["Focus-visible ring uses --ring."],
  },
  aiHints: {
    priority: 1,
    useCases: ["Submit a form", "Primary page call-to-action", "Trigger a dialog or menu", "Inline row actions"],
    selectionCriteria: {
      brand: "The single most important CTA on a marketing/hero surface.",
      default: "Standard primary action inside app UI.",
      secondary: "Alternative action shown next to a primary one.",
      outline: "Low-emphasis action that still needs a visible boundary.",
      ghost: "Tertiary action in toolbars or dense UI.",
      destructive: "Irreversible or dangerous actions (delete, remove).",
      link: "Navigation styled as inline text.",
    },
    antiPatterns: [
      { avoid: "Using more than one `brand` button in a viewport", reason: "Dilutes the single-CTA hierarchy of the brand.", instead: "Pair one `brand` with `secondary`/`outline`." },
      { avoid: "Icon-only button without a label", reason: "Screen readers announce nothing.", instead: "Add aria-label or wrap in a Tooltip with an accessible name." },
    ],
    whenNotToUse: ["For navigation between pages prefer a link", "For binary on/off state use Switch or Checkbox"],
    pairsWith: ["Tooltip", "Card", "Input"],
  },
}
