/**
 * Component metadata schema — the "four pillars + aiHints" framework.
 *
 * Every UI component ships a machine-readable `meta` object so that humans and
 * AI agents can reason about it: what it is (Structure), how it looks
 * (Appearance), how it acts (Behavior), and how it stays usable by everyone
 * (Accessibility) — plus `aiHints` that tell an agent when to reach for it,
 * how to pick a variant, and what never to do.
 *
 * Attach one to each component file:
 *
 *   export const meta: ComponentMeta = { ... }
 */

export type ComponentCategory =
  | "actions"
  | "forms"
  | "data-display"
  | "feedback"
  | "layout"
  | "navigation"
  | "overlay";

export type ComponentStatus = "stable" | "beta" | "experimental";

/** Pillar 1 — Structure: anatomy, parts, and composition. */
export interface StructurePillar {
  /** The named parts / slots that make up the component. */
  anatomy: string[];
  /** How the component is composed or nested with others. */
  composition?: string;
  /** Sub-components exported from the same module. */
  parts?: string[];
}

/** Pillar 2 — Appearance: variants, sizes, and the design tokens consumed. */
export interface AppearancePillar {
  variants?: string[];
  sizes?: string[];
  /** Semantic theme tokens the component paints with. */
  tokens?: string[];
  /** Visual states (rest, hover, focus, disabled, …). */
  states?: string[];
}

/** Pillar 3 — Behavior: interaction model, events, and stateful logic. */
export interface BehaviorPillar {
  interactions?: string[];
  events?: string[];
  /** Whether the component is controllable and how. */
  controllable?: boolean;
  notes?: string[];
}

/** Pillar 4 — Accessibility: role, keyboard, ARIA, and focus. */
export interface AccessibilityPillar {
  role?: string;
  keyboard?: string[];
  aria?: string[];
  notes?: string[];
}

/** An explicit thing NOT to do, why, and what to do instead. */
export interface AntiPattern {
  avoid: string;
  reason: string;
  instead: string;
}

/** Machine hints that help an agent select and use the component correctly. */
export interface AiHints {
  /** Relative importance when several components could fit (1 = highest). */
  priority?: number;
  /** Concrete situations this component is the right answer for. */
  useCases: string[];
  /** variant/prop → the condition under which to choose it. */
  selectionCriteria?: Record<string, string>;
  antiPatterns?: AntiPattern[];
  /** Situations where a different component is a better fit. */
  whenNotToUse?: string[];
  /** Components this one commonly pairs with. */
  pairsWith?: string[];
}

export interface ComponentMeta {
  name: string;
  description: string;
  category: ComponentCategory;
  status?: ComponentStatus;
  /** Four pillars. */
  structure: StructurePillar;
  appearance: AppearancePillar;
  behavior: BehaviorPillar;
  accessibility: AccessibilityPillar;
  /** Agent-facing guidance. */
  aiHints: AiHints;
}

/** The four pillar keys, in canonical order — handy for iteration in UI. */
export const PILLARS = [
  "structure",
  "appearance",
  "behavior",
  "accessibility",
] as const;

export type Pillar = (typeof PILLARS)[number];
