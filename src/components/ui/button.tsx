import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import type { ComponentMeta } from "@/lib/component-meta"

const buttonVariants = cva(
  // Radius is standardized across every variant/size: half of the brand
  // button's original radius (var(--radius-sm)), so it's expressed as a
  // living relationship to that token rather than a hardcoded value.
  "group/button inline-flex shrink-0 items-center justify-center rounded-[calc(var(--radius-sm)*0.5)] border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
          "bg-primary text-primary-foreground font-medium tracking-tight hover:bg-background hover:text-foreground hover:shadow-[0_0_0.5rem_0_var(--color-brand-blue7)] active:scale-[0.99]",
      },
      // Horizontal padding is unchanged; heights (the vertical footprint of
      // these fixed-height controls) are reduced ~22–25% from the previous
      // pass, landing the default at 36px — the height inputs/selects align
      // to. Icon-only sizes track their text-size counterpart so they stay
      // square and aligned.
      size: {
        default:
          "h-9 gap-1.5 px-[22.5px] has-data-[icon=inline-end]:pr-[18px] has-data-[icon=inline-start]:pl-[18px]",
        xl: "h-14 gap-2 px-[63px] text-base has-data-[icon=inline-end]:pr-[45px] has-data-[icon=inline-start]:pl-[45px]",
        xs: "h-7 gap-1 px-[18px] text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-[13.5px] has-data-[icon=inline-start]:pl-[13.5px] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-[22.5px] text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-[13.5px] has-data-[icon=inline-start]:pl-[13.5px] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-[22.5px] has-data-[icon=inline-end]:pr-[18px] has-data-[icon=inline-start]:pl-[18px]",
        icon: "size-9",
        "icon-xs":
          "size-7 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-10",
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
  component: {
    name: "Button",
    category: "atoms",
    type: "interactive",
    description:
      "Primary interactive control that triggers an action or navigation. Carries the Galvanite yellow CTA as its `brand` variant.",
    path: "src/components/ui/button.tsx",
    figma: { nodeId: null },
  },
  props: {
    variant: {
      type: "enum",
      default: "default",
      description: "Visual emphasis of the button.",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link", "brand"],
    },
    size: {
      type: "enum",
      default: "default",
      description: "Control height / density.",
      options: ["xs", "sm", "default", "lg", "xl", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    disabled: { type: "boolean", default: false, description: "Disables interaction." },
    render: { type: "ReactElement", required: false, description: "Render as another element (e.g. a link)." },
    className: { type: "string", required: false, description: "Additional classes." },
    onClick: { type: "(e: MouseEvent) => void", required: false, description: "Activation handler." },
  },
  variants: {
    axes: {
      variant: ["default", "outline", "secondary", "ghost", "destructive", "link", "brand"],
      size: ["xs", "sm", "default", "lg", "xl", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    purpose: {
      "variant.brand": "The single most important CTA on a marketing/hero surface (yellow → deep-navy on hover).",
      "variant.default": "Standard primary action inside app UI.",
      "variant.secondary": "Alternative action shown next to a primary one.",
      "variant.outline": "Low-emphasis action that still needs a visible boundary.",
      "variant.ghost": "Tertiary action in toolbars or dense UI.",
      "variant.destructive": "Irreversible or dangerous actions (delete, remove).",
      "variant.link": "Navigation styled as inline text.",
      "size.xl": "Oversized hero CTA.",
      "size.icon": "Square icon-only button.",
    },
    invalidCombinations: [
      { axes: { variant: "link", size: "icon" }, reason: "A text link has no icon-only affordance; use ghost + icon size." },
    ],
  },
  relationships: {
    commonPartners: ["Tooltip", "Card", "Input", "Select"],
    triggers: ["Dialog", "Select", "Tooltip"],
    role: "button",
    keyboardSupport: "Tab to focus; Enter/Space to activate.",
    screenReader: "Announced as a button by its text; icon-only buttons require aria-label.",
  },
  tokens: {
    color: {
      background: "var(--primary)",
      foreground: "var(--primary-foreground)",
      ring: "var(--ring)",
      "brand.hoverBg": "var(--background)",
      "brand.glow": "var(--color-brand-blue7)",
    },
    // Uniform across every variant/size — half of the original brand-button radius.
    border: { radius: "calc(var(--radius-sm) * 0.5)" },
    motion: { transition: "all 200ms ease", active: "scale(0.99)" },
  },
  aiHints: {
    priority: "high",
    keywords: ["button", "cta", "action", "submit", "click"],
    selectionCriteria: {
      brand: "The one hero call-to-action.",
      default: "Standard in-app primary action.",
      secondary: "Secondary action beside a primary.",
      destructive: "Delete / remove / irreversible.",
      link: "Inline text navigation.",
    },
    usage: {
      useCases: ["Submit a form", "Primary page CTA", "Open a dialog or menu", "Inline row actions"],
      commonPatterns: [
        { name: "CTA pair", composition: "One Button variant=brand next to Button variant=secondary." },
        { name: "Icon button", composition: "Button size=icon wrapped in a Tooltip for its label." },
      ],
      antiPatterns: [
        { scenario: "Multiple brand buttons in one viewport", reason: "Dilutes the single-CTA hierarchy.", alternative: "Keep one brand button; make the rest secondary/outline." },
        { scenario: "Icon-only button without a label", reason: "Screen readers announce nothing.", alternative: "Add aria-label or wrap in a Tooltip." },
      ],
    },
  },
}
