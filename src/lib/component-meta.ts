/**
 * Component metadata schema — the "four pillars + aiHints" framework.
 *
 * Identity lives in `component`; the four descriptive pillars are
 * `props`, `variants`, `relationships` (accessibility folded in), and
 * `tokens`; `aiHints` carries agent-facing selection guidance.
 *
 * Attach one to each component file:
 *
 *   export const meta: ComponentMeta = { ... }
 */

export type ComponentCategory = "atoms" | "molecules" | "organisms";

export type ComponentType =
  | "interactive"
  | "display"
  | "container"
  | "input"
  | "navigation";

/** A single prop's contract. */
export interface PropDef {
  type: string;
  required?: boolean;
  default?: string | number | boolean;
  description?: string;
  /** Allowed values for enum-like props. */
  options?: readonly string[];
}

export interface ComponentMeta {
  component: {
    name: string;
    category: ComponentCategory;
    type: ComponentType;
    description: string;
    path: string;
    figma?: { nodeId: string | null };
  };

  props: Record<string, PropDef>;

  variants: {
    /** Named axes → their allowed values (e.g. variant, size). */
    axes: Record<string, readonly string[]>;
    /** `${axis}.${value}` → what that value is for. */
    purpose: Record<`${string}.${string}`, string>;
    invalidCombinations?: { axes: Record<string, string>; reason: string }[];
  };

  relationships: {
    requires?: string[];
    mustBeChildOf?: string[];
    mustBeParentOf?: string[];
    optionalSibling?: string[];
    commonPartners?: string[];
    triggers?: string[];
    blocksWhen?: { when: string; effect: string }[];
    exposesState?: string[];
    role: string; // a11y, folded in
    keyboardSupport: string;
    screenReader: string;
  };

  tokens: {
    color?: Record<string, string>;
    spacing?: Record<string, string>;
    typography?: Record<string, string>;
    border?: Record<string, string>;
    motion?: Record<string, string>;
    elevation?: Record<string, string>;
  };

  aiHints: {
    priority: "high" | "medium" | "low";
    keywords: string[];
    selectionCriteria: Record<string, string>;
    usage: {
      useCases: string[];
      commonPatterns: { name: string; composition: string }[];
      antiPatterns: { scenario: string; reason: string; alternative: string }[];
    };
  };
}

/** The four descriptive pillars, in canonical order — handy for UI iteration. */
export const PILLARS = ["props", "variants", "relationships", "tokens"] as const;

export type Pillar = (typeof PILLARS)[number];
