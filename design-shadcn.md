# Galvanite — shadcn/ui Theme

A shadcn/ui-ready theme derived from the Galvanite design system (see `design.md` for the
raw source values). Galvanite is **dark-first** (deep-navy space theme with a yellow CTA),
so the `.dark` block reproduces the live site and `:root` is the light inversion taken from
the site's `.section-white` treatment.

Format targets **shadcn/ui on Tailwind v4** (the current default: semantic tokens in
`globals.css` + a `@theme inline` map). Values are plain **hex** — fully valid CSS that
Tailwind v4 accepts directly, so no HSL/OKLCH conversion is required. A Tailwind v3 note is
at the bottom.

---

## Token mapping

| shadcn token | Dark (site) | Light (`.section-white`) | Galvanite source |
|---|---|---|---|
| `background` | `#0d1326` | `#ffffff` | `blue0` / `white` |
| `foreground` | `#cceeff` | `#163259` | `light-chalk` / `blue4` |
| `card` | `#111933` | `#ffffff` | `blue1` / `white` |
| `card-foreground` | `#cceeff` | `#163259` | `light-chalk` / `blue4` |
| `popover` | `#162140` | `#ffffff` | `blue2` / `white` |
| `popover-foreground` | `#cceeff` | `#163259` | `light-chalk` / `blue4` |
| `primary` | `#ffd400` | `#ffd400` | `yellow` (CTA) |
| `primary-foreground` | `#2d4f80` | `#2d4f80` | `blue5` (button text) |
| `secondary` | `#162140` | `#e6f8fa` | `blue2` / `lightest-chalk` |
| `secondary-foreground` | `#cceeff` | `#266099` | `light-chalk` / `blue6` |
| `muted` | `#17294d` | `#e6f8fa` | `blue3` / `lightest-chalk` |
| `muted-foreground` | `#8ac2e5` | `#525f7a` | `chalk` / `gray` |
| `accent` | `#266099` | `#266099` | `blue6` |
| `accent-foreground` | `#ffffff` | `#ffffff` | `white` |
| `destructive` | `#e5484d` | `#dc2626` | (added — not in brand palette) |
| `destructive-foreground` | `#ffffff` | `#ffffff` | `white` |
| `border` | `#17294d` | `#e4eef5` | `blue3` / `white-border` |
| `input` | `#163259` | `#e4eef5` | `blue4` / `white-border` |
| `ring` | `#57a9d9` | `#57a9d9` | `blue7` |
| `radius` | `0.75rem` | `0.75rem` | `--size--border-radius` |

**Charts** map to the accent + blue ramp: `chart-1 #ffd400` (yellow), `chart-2 #57a9d9`
(blue7), `chart-3 #266099` (blue6), `chart-4 #24bfd4` (sea), `chart-5 #1a79ff` (royal).

> Note on borders: the live site uses a translucent glow border (`--color--lighten`
> `#33a3ff40`). For solid shadcn components we use `blue3`/`blue4`. If you want the exact
> brand glow, set `--border: #33a3ff40;` — alpha hex is valid.

---

## `globals.css` (drop-in)

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.75rem;

  --background: #ffffff;
  --foreground: #163259;
  --card: #ffffff;
  --card-foreground: #163259;
  --popover: #ffffff;
  --popover-foreground: #163259;
  --primary: #ffd400;
  --primary-foreground: #2d4f80;
  --secondary: #e6f8fa;
  --secondary-foreground: #266099;
  --muted: #e6f8fa;
  --muted-foreground: #525f7a;
  --accent: #266099;
  --accent-foreground: #ffffff;
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --border: #e4eef5;
  --input: #e4eef5;
  --ring: #57a9d9;

  --chart-1: #ffd400;
  --chart-2: #57a9d9;
  --chart-3: #266099;
  --chart-4: #24bfd4;
  --chart-5: #1a79ff;

  --sidebar: #ffffff;
  --sidebar-foreground: #163259;
  --sidebar-primary: #ffd400;
  --sidebar-primary-foreground: #2d4f80;
  --sidebar-accent: #e6f8fa;
  --sidebar-accent-foreground: #266099;
  --sidebar-border: #e4eef5;
  --sidebar-ring: #57a9d9;

  /* Brand fonts */
  --font-sans: "DM Sans", Arial, sans-serif;
  --font-heading: "Nordt Slim", sans-serif;
}

.dark {
  --background: #0d1326;
  --foreground: #cceeff;
  --card: #111933;
  --card-foreground: #cceeff;
  --popover: #162140;
  --popover-foreground: #cceeff;
  --primary: #ffd400;
  --primary-foreground: #2d4f80;
  --secondary: #162140;
  --secondary-foreground: #cceeff;
  --muted: #17294d;
  --muted-foreground: #8ac2e5;
  --accent: #266099;
  --accent-foreground: #ffffff;
  --destructive: #e5484d;
  --destructive-foreground: #ffffff;
  --border: #17294d;
  --input: #163259;
  --ring: #57a9d9;

  --chart-1: #ffd400;
  --chart-2: #57a9d9;
  --chart-3: #266099;
  --chart-4: #24bfd4;
  --chart-5: #1a79ff;

  --sidebar: #111933;
  --sidebar-foreground: #cceeff;
  --sidebar-primary: #ffd400;
  --sidebar-primary-foreground: #2d4f80;
  --sidebar-accent: #162140;
  --sidebar-accent-foreground: #cceeff;
  --sidebar-border: #17294d;
  --sidebar-ring: #57a9d9;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-heading: var(--font-heading);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground font-sans; }
  h1, h2, h3, h4 { font-family: var(--font-heading); font-weight: 700; letter-spacing: -0.033em; }
  h3 { font-weight: 600; }
}
```

---

## Fonts

Both are custom / self-hosted on the live site. For a shadcn project use `next/font/local`
(or `@font-face`) and expose them as the CSS variables above.

- **DM Sans** — variable, weights `100–1000`. Body / UI (`--font-sans`).
- **Nordt Slim** — static: `Light` = 400, `SemiLight` = 600, `Regular` = 700.
  Headings (`--font-heading`).

```ts
// app/fonts.ts (next/font/local example)
import localFont from "next/font/local";

export const dmSans = localFont({
  src: "./fonts/DMSans-VariableFont_opsz,wght.ttf",
  variable: "--font-sans",
  display: "swap",
});

export const nordtSlim = localFont({
  src: [
    { path: "./fonts/NordtSlim-Light.otf",     weight: "400" },
    { path: "./fonts/NordtSlim-SemiLight.otf", weight: "600" },
    { path: "./fonts/NordtSlim-Regular.otf",   weight: "700" },
  ],
  variable: "--font-heading",
  display: "swap",
});
```
Add both `variable` classes to `<html>` / `<body>` so `--font-sans` and `--font-heading`
resolve. (If you don't have the licensed font files, `DM Sans` is on Google Fonts;
`Nordt Slim` is proprietary — substitute a close geometric slim sans such as
`Space Grotesk` or `Michroma` as a placeholder.)

---

## Matching the brand button

shadcn's default `Button` will already render Galvanite-yellow via `--primary`. To
reproduce the site's exact CTA (yellow → dark-navy invert on hover, tall pill), add a
variant:

```tsx
// in the buttonVariants cva()
brand:
  "bg-primary text-primary-foreground rounded-sm px-7 font-medium tracking-tight " +
  "transition-all duration-200 " +
  "hover:bg-background hover:text-foreground hover:shadow-[0_0_.4rem_0_#33a3ff40] " +
  "active:scale-[.99]",
```
- `rounded-sm` ≈ the brand's `.4rem` (`--size--xxxs`) button radius.
- The brand's animated yellow arrow (`::before`) is decorative — add via a pseudo-element
  or an icon that translates in on hover if you want the full effect.
- Brand **secondary** button = navy fill + yellow text: `bg-secondary text-primary`.

---

## Tailwind v3 / classic shadcn

If the project is on Tailwind v3 (shadcn's older `hsl(var(--x))` convention), don't paste
hex into the vars — the config wraps them in `hsl()`. Either:
1. Convert each hex above to **HSL channels** (e.g. `--background: 222 48% 10%;`) and keep
   the `hsl(var(--background))` mappings in `tailwind.config.ts`; or
2. Change the config mappings from `hsl(var(--x))` to bare `var(--x)` and keep the hex.

Everything else (token names, radius, fonts) is identical.

---

## Radius & spacing reference

- `--radius` = `0.75rem` (Galvanite `--size--border-radius`); shadcn derives
  `sm/md/lg/xl` from it.
- Galvanite's spacing scale (`--size--xxxs .4rem` → `--size--xxxl 20rem`) maps naturally to
  Tailwind spacing utilities; see `design.md` §5 for the full ramp if you want to extend
  `@theme` with custom spacing steps.
