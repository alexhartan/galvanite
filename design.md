# Galvanite — Design System

Extracted from the live CSS of [galvanite.io](https://www.galvanite.io/) (Webflow build,
stylesheet `galvanite.webflow.shared.f79bfe5f5.min.css`). This documents the design
tokens, typography, buttons, and box/card styles as they are actually defined in
production. Values are transcribed verbatim from the compiled stylesheet's `:root`
and rule set.

The look is a **dark, deep-navy space theme** (rocket/launch motif) with a single
high-energy **yellow** call-to-action accent and a family of blues ranging from near-black
to bright sky-chalk.

---

## 1. Colors

All colors are defined as CSS custom properties on `:root` / `body`.

### Blues (core palette, dark → light)

| Token | Hex | Role |
|---|---|---|
| `--color--blue0` | `#0d1326` | Page background (darkest); button-hover background |
| `--color--blue1` | `#111933` | Secondary-button background; active states |
| `--color--blue2` | `#162140` | Panel / tertiary-button hover fill |
| `--color--blue3` | `#17294d` | Deep panel blue |
| `--color--blue4` | `#163259` | Dark section text color on light backgrounds |
| `--color--blue5` | `#2d4f80` | **Primary button text color**; heading color on white sections |
| `--color--blue6` | `#266099` | Heading color inside `.section-white` |
| `--color--blue7` | `#57a9d9` | Eyebrow text; accent border / bright blue |

### Chalk / light neutrals

| Token | Hex | Role |
|---|---|---|
| `--color--chalk` | `#8ac2e5` | Paragraph text (`.paragraph`), footer links |
| `--color--light-chalk` | `#cceeff` (`#cef`) | **Default body text**; button-hover text |
| `--color--lightest-chalk` | `#e6f8fa` | Pill text; brightest highlight |
| `--color--white` | `#ffffff` | Headings, white cards, high-contrast text |
| `--color--white-border` | `#e4eef5` | Border color on white cards |
| `--color--gray` | `#525f7a` | Text color inside white boxes |

### Accents

| Token | Hex | Role |
|---|---|---|
| `--color--yellow` | `#ffd400` | **Primary CTA / accent** — button fill, spinning star glyph, arrow marker |
| `--color--royal-blue` | `#1a79ff` | Social icons, partner badge, testimonial stripe |
| `--color--sea` | `#24bfd4` | Cyan used in glow gradients (`.glow-line`, `.card-glow`) |

### Alpha / utility colors

| Token | Value | Role |
|---|---|---|
| `--color--darken` | `#0f183399` | ~60% navy overlay / soft drop shadows |
| `--color--lighten` | `#33a3ff40` | ~25% blue — glow borders, focus glows, subtle strokes |

Other literal colors seen in rules: `#00113380` (pill background), `#091021` (testimonial
button hover), `#4DB5FF60` / `#4cb5ff` (nav underline & glow), `#93d0ff40` (separator
gradient), `#80BFFF20`→`#cceeff40` (badge shimmer gradient).

### Palette swatches

```
Backgrounds:  #0d1326  #111933  #162140  #17294d   (blue0 → blue3)
Mid blues:    #163259  #2d4f80  #266099  #57a9d9   (blue4 → blue7)
Chalk:        #8ac2e5  #cceeff  #e6f8fa  #ffffff
Accent:       #ffd400 (yellow)   #1a79ff (royal)   #24bfd4 (sea)
```

---

## 2. Typography

### Font families

| Token | Stack | Usage |
|---|---|---|
| `--type--heading` | `"Nordt Slim", sans-serif` | All headings (h1–h4), eyebrows, footer links |
| `--type--body` | `"DM Sans", Arial, sans-serif` | Body copy, h5/h6, buttons, paragraphs |

**Font files (self-hosted `@font-face`):**
- **DM Sans** — variable font, `font-weight: 100 1000`, `font-display: swap`
  (`DMSans-VariableFont_opsz,wght.ttf`).
- **Nordt Slim** — three static weights, `font-display: swap`:
  - `400` → `NordtSlim-Light.otf`
  - `600` → `NordtSlim-SemiLight.otf`
  - `700` → `NordtSlim-Regular.otf`
- `webflow-icons` — embedded icon font (base64 TTF).

### Base sizing (fluid / viewport-based)

The root font-size is **viewport-relative**, so `em` units scale the whole system:

| Context | `body` font-size |
|---|---|
| Desktop (default) | `0.8vw`, `line-height: 1.5` |
| ≥ 1250px | pinned to `10px` reference |
| ≥ 1920px | pinned to `12px` reference |
| Tablet (portrait ≤ 991px) | `1.9vw` |
| Mobile (portrait ≤ 767px) | `3.2vw` |

Global heading treatment: `letter-spacing: -0.033em; word-spacing: 0.1em` (tightened,
slightly airy word spacing). `text-wrap: balance` via `.wrap-balance`.

### Type scale

Sizes are in `em` (relative to the fluid root). Desktop → mobile shown where they differ.

| Element | Font | Size (desktop) | Weight | Line-height | Notes |
|---|---|---|---|---|---|
| `h1` / `.text-style-h1` | Nordt Slim | `5em` (up to `5.5em` on large) | 700 | 1.1 | color white; ~2.9em on mobile |
| `h2` / `.text-style-h2` | Nordt Slim | `3.6em` | 700 | 1.2 (1.1 tablet) | ~2.2em mobile |
| `h3` / `.text-style-h3` | Nordt Slim | `2.6em` | 600 | 1.1 | `letter-spacing: -0.02em` |
| `h4` / `.text-style-h4` | Nordt Slim | `2em` | 700 | 1.15 | `letter-spacing: -0.01em` |
| `h5` / `.text-style-h5` | DM Sans | `1.6em` | 400 | 1.25 | |
| `h6` / `.text-style-h6` | DM Sans | `1.25em` | 400 | 1.3 | |
| `p` | DM Sans | `1.3em` | 400 | 1.5 | `margin-bottom: --size--xxxs` |
| `blockquote` | DM Sans | `1.4em` | 400 | 1.45 | `border-left: 5px solid --color--blue5` |
| `.text-eyebrow` | Nordt Slim | `1.2em` | 600 | — | color `--color--blue7`, `letter-spacing: .15em`, `word-spacing: .15em` (uppercase-style label) |
| `.bento-h` | DM Sans | `1.7em` | 600 | 1.15 | card headline, `letter-spacing: -.01em`, balanced |

**Text utilities:** `.text-large` = `1.1em`, `.text-small` = `0.9em`,
`.paragraph` = chalk-colored body. Links (`a`) default to white with
`transition: color .3s` and no underline.

**Color helpers:** `.text-blue` / `.text-highlighted` → `--color--blue5`;
`.text-darkblue` → `--color--blue4`.

---

## 3. Buttons

### Primary button — `.button`

The signature yellow CTA.

```css
.button {
  background-color: var(--color--yellow);   /* #ffd400 */
  color: var(--color--blue5);               /* #2d4f80 */
  border-radius: var(--size--xxxs);         /* .4rem, all corners */
  padding: 0 1.75em;
  font-size: 1.45em;
  font-weight: 500;
  line-height: 3;                            /* tall pill-ish height */
  letter-spacing: -0.02em;
  word-spacing: 0.1em;
  transform-origin: 50% 100%;
  transition: all .25s ease;
  display: block;
  position: relative;
}
```

**Hover** — inverts to dark, and padding shifts asymmetrically to reveal an animated
yellow arrow marker (`::before`, a right-pointing triangle made of borders) sliding in
from the right:

```css
.button:hover {
  background-color: var(--color--blue0);      /* #0d1326 */
  color: var(--color--light-chalk);           /* #cceeff */
  box-shadow: 0 0 var(--size--xxxs) 0 var(--color--lighten);
  padding-left: 1em;
  padding-right: 2.5em;                        /* room for the arrow */
}
.button:active {
  background-color: var(--color--blue1);       /* #111933 */
  color: var(--color--white);
  transform: scale(.99);
}
```

The arrow (desktop, landscape ≥ 992px):

```css
.button::before {
  border: .5rem solid var(--color--yellow);
  border-left-color: transparent;
  border-bottom-color: transparent;            /* → triangle pointing right */
  inset: calc(50% - .5rem) .83rem 0 auto;
  transform: scale(.75);  opacity: 0;
}
.button:hover::before { transform: scale(1); opacity: 1; transition: transform .3s ease-out, opacity .3s ease-in; }
```

### Variants

| Variant | Background | Text | Border / notes |
|---|---|---|---|
| `.button.secondary` | `--color--blue1` `#111933` | `--color--yellow` | `outline: 1px solid #1a97ff21`; hover → outline `--color--lighten`, text `--color--lightest-chalk` |
| `.button.tertiary` | `--color--light-chalk` `#cceeff` | (inherits) | hover background `--color--blue2` |
| `.button.transparent` | transparent | — | arrow `::before` disabled |
| `.button.button-call` | (primary) | — | `flex: 1`, tighter side padding `1.25em`; min-width 33.33% in hero |
| `.button.button-swiper` | (primary) | — | circular nav control: `2.2em × 2.2em`, `font-size: 1.75em`, `line-height: 2.2` |
| `.w-button` | `#3898ec` | `#fff` | Webflow default — overridden by `.button` everywhere |

### Pills & tags

- **`.pre-pill`** — floating glass pill: `border: 1px solid var(--color--lighten)`,
  `border-radius: var(--size--xxs)` (.6rem), `background: #00113380`,
  `box-shadow: 0 0 var(--size--xxxs) .1em var(--color--lighten)`,
  text `--color--lightest-chalk`. Carries a spinning 8-point **yellow star** glyph
  (`::before`, `clip-path` polygon, `spin-and-pulse 3.6s` animation) built from
  `--color--yellow`.
- **`.text-eyebrow`** — small-caps-style label above headings (see typography).

---

## 4. Boxes, Cards & Shapes

### Radius scale

Border radii come from the spacing tokens plus a dedicated base:

| Token | Value | Typical use |
|---|---|---|
| `--size--border-radius` | `.75rem` | Default card radius (`.white-box`, `.mega-img-box`) |
| `--size--xxxs` | `.4rem` | Buttons |
| `--size--xxs` | `.6rem` | `.pre-pill`, `.work-box` |
| `--border-radius-sm` | `.3em` | Small chips |
| `--border-radius-md` | `.9em` | Medium elements |
| `100%` / `50%` | — | Circular avatars, dots, swiper buttons |

### Card families

**`.white-box`** — light content card:
```css
.white-box {
  background-color: var(--color--white);
  color: var(--color--gray);              /* #525f7a */
  border-radius: var(--size--border-radius);  /* .75rem */
  display: grid;                          /* 12-col grid */
  gap: 16px;
  position: relative;
}
```
Hover (desktop): `.white-box.floating-box:hover { transform: scale(1.04); }`,
`.white-box.prod-box:hover { transform: scale(1.02); }`.

**`.prod-box-inner`** product-card variants:
- `.box-white` → `background: var(--color--white)`, `border-color: var(--color--white-border)` `#e4eef5`.
- `.box-bordered` → `border-bottom: 1px solid var(--color--lighten)`.
- `.box-transparent` → masked fade at bottom; heading uses `--color--light-chalk`,
  brightening to `--color--blue5` / white on hover.

**`.work-box`** — portfolio tile:
```css
.work-box {
  background-color: #000;
  border-radius: var(--size--xxs);            /* .6rem */
  box-shadow: 0 -4px 12px -4px var(--color--darken);
  overflow: clip;
}
```
Hover fades the still image, reveals video, scales inner to `.95`.

**`.thumb`** — image thumb, `aspect-ratio: 4/3`, `object-fit: cover`; hover
`transform: scale(1.1); opacity: .6` with arrow nudging out.

**`.mega-img-box`** — mega-menu image, `border-radius: .75rem`, animates
`aspect-ratio` 1 → 3/2 on hover.

### Shadows & glows

The system leans on **soft blue glows** rather than hard drop shadows:

```
0 0 4px 0 var(--color--lighten)                     /* focus / button glow */
0 0 var(--size--xxxs) .1em var(--color--lighten)    /* pill glow */
0 -4px 12px -4px var(--color--darken)               /* work-box lift */
0 0 50px 10px var(--color--blue2)                    /* ambient panel glow */
inset 0 0 0 1px var(--color--blue7)                  /* bright inset border */
inset 0 0 0 1px rgb(from var(--color--chalk) r g b / 10%)  /* subtle inset hairline */
0 .2em 1.2em 0 #217dd926                             /* colored elevation */
```

### Dividers

`.separator-grad` — `linear-gradient(to left, transparent, #93d0ff40 50%, transparent)`;
nav underline uses a masked `#4DB5FF60` 1px line faded at both ends.

---

## 5. Layout & Spacing

### Spacing scale (`--size--*`)

Desktop values (some tighten at ≤ 1920px, shown in parentheses):

| Token | Value | | Token | Value |
|---|---|---|---|---|
| `--size--xxxs` | `.4rem` | | `--size--m` | `3.6rem` (3rem) |
| `--size--xxs` | `.6rem` | | `--size--l` | `6rem` (5rem) |
| `--size--xs` | `1rem` | | `--size--xl` | `9rem` (7.5rem) |
| `--size--s` | `2rem` | | `--size--xxl` | `13rem` (11rem) |
| | | | `--size--xxxl` | `20rem` (16rem) |

Mobile-specific: `--size--mobile--xxs .3rem`, `--mobile--xs .75rem`,
`--mobile--s 1.5rem`, `--mobile--m 2.5rem`.

Gap utilities map directly: `.gap-xxxs` … `.gap-xxl` → `gap: var(--size--*)`.

### Container

```css
.container {
  width: 100%;
  max-width: 1250px;        /* 1600px on ≥1920px landscape */
  margin-inline: auto;
  padding-inline: 2rem;
  position: relative;
}
.page-wrapper { display: flex; flex-direction: column; min-height: 100vh; }
.section      { display: flex; flex-direction: column; width: 100%; position: relative; }
```

- Default site background: `--color--blue0` (`#0d1326`) — set on `html` and `body`.
- `.section-white` inverts to a light background; headings inside recolor to
  `--color--blue6` (`#266099`).

### Breakpoints (Webflow orientation-based)

| Query | Meaning |
|---|---|
| `(orientation: landscape) and (min-width: 992px)` | Desktop hover/interaction layer |
| `(orientation: portrait) and (max-width: 991px)` | Tablet |
| `(orientation: portrait) and (max-width: 767px)` | Mobile |
| `min-width: 1250px` / `1920px` | Large-desktop root-size steps |

---

## 6. Motion & Interaction

Common patterns pulled from the stylesheet:

- **Transitions:** buttons `all .25s ease`; links `color .3s`; cards `transform`/`opacity`
  `.3–.5s ease`. Hero rocket sequences use `cubic-bezier(.215,.61,.355,1)` over 3–6s.
- **Reveal on load:** `[reveal="text"|"fade"]` and `.bento-h` start hidden; `reveal-load`
  elements fade + `translateY(1.5rem)` in over `.75–1s`.
- **Signature animations:**
  - `spin-and-pulse` (3.6s) — rotating/scaling yellow star on pills.
  - `outline-diagonal` (7.5s) — shimmer sweep on the Webflow badge / borders.
  - `pulse` (4s), `pulse-fade` (3s) — dot glows.
  - `rocketVibrate`, `pulseExhaust`, `rocketGlow`, `moveJet` — hero rocket motif.
  - `clientFlip` (30s) — cycling client logos.
  - `marqueeX` / `scrollHorizontally` — infinite horizontal marquees.
- **Hover convention (desktop only):** most interactive elements brighten
  (`opacity`/`color` toward chalk/white), lift (`scale(1.02–1.1)`), and slide an arrow or
  reveal hidden labels. Hover effects are gated behind
  `(orientation: landscape) and (min-width: 992px)`.

---

## Quick reference — token cheat sheet

```css
:root {
  /* Blues */
  --color--blue0:#0d1326; --color--blue1:#111933; --color--blue2:#162140;
  --color--blue3:#17294d; --color--blue4:#163259; --color--blue5:#2d4f80;
  --color--blue6:#266099; --color--blue7:#57a9d9;
  /* Chalk / neutral */
  --color--chalk:#8ac2e5; --color--light-chalk:#cef; --color--lightest-chalk:#e6f8fa;
  --color--white:white; --color--white-border:#e4eef5; --color--gray:#525f7a;
  /* Accent */
  --color--yellow:#ffd400; --color--royal-blue:#1a79ff; --color--sea:#24bfd4;
  /* Alpha */
  --color--darken:#0f183399; --color--lighten:#33a3ff40;
  /* Type */
  --type--heading:"Nordt Slim",sans-serif;
  --type--body:"DM Sans",Arial,sans-serif;
  /* Spacing */
  --size--xxxs:.4rem; --size--xxs:.6rem; --size--xs:1rem; --size--s:2rem;
  --size--m:3.6rem; --size--l:6rem; --size--xl:9rem; --size--xxl:13rem; --size--xxxl:20rem;
  /* Radius */
  --size--border-radius:.75rem; --border-radius-sm:.3em; --border-radius-md:.9em;
}
```
