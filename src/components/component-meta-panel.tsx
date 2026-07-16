import {
  Boxes,
  Ear,
  Palette,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PILLARS, type ComponentMeta, type Pillar } from "@/lib/component-meta";

const PILLAR_META: Record<
  Pillar,
  { label: string; icon: LucideIcon; blurb: string }
> = {
  structure: { label: "Structure", icon: Boxes, blurb: "Anatomy & composition" },
  appearance: { label: "Appearance", icon: Palette, blurb: "Variants & tokens" },
  behavior: { label: "Behavior", icon: Zap, blurb: "Interaction & state" },
  accessibility: { label: "Accessibility", icon: Ear, blurb: "Role, keyboard, ARIA" },
};

function titleize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase());
}

/** Render one field of a pillar (string | boolean | string[]). */
function Field({ label, value }: { label: string; value: unknown }) {
  if (value == null || (Array.isArray(value) && value.length === 0)) return null;

  return (
    <div className="space-y-1.5">
      <div className="text-xs font-medium tracking-wide text-brand-blue7 uppercase">
        {titleize(label)}
      </div>
      {Array.isArray(value) ? (
        <div className="flex flex-wrap gap-1.5">
          {value.map((v) => (
            <Badge key={String(v)} variant="outline" className="font-normal">
              {String(v)}
            </Badge>
          ))}
        </div>
      ) : typeof value === "boolean" ? (
        <div className="text-sm text-foreground">{value ? "Yes" : "No"}</div>
      ) : (
        <div className="text-sm text-muted-foreground">{String(value)}</div>
      )}
    </div>
  );
}

function PillarBlock({
  pillar,
  data,
}: {
  pillar: Pillar;
  data: Record<string, unknown>;
}) {
  const { label, icon: Icon, blurb } = PILLAR_META[pillar];
  return (
    <div className="rounded-lg border border-border bg-background/40 p-4 space-y-4">
      <div className="flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent/15 text-brand-blue7">
          <Icon className="size-4" />
        </span>
        <div>
          <div className="font-medium text-foreground">{label}</div>
          <div className="text-xs text-muted-foreground">{blurb}</div>
        </div>
      </div>
      <div className="space-y-3">
        {Object.entries(data).map(([k, v]) => (
          <Field key={k} label={k} value={v} />
        ))}
      </div>
    </div>
  );
}

function AiHints({ hints }: { hints: ComponentMeta["aiHints"] }) {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <span className="font-medium text-foreground">aiHints</span>
        {typeof hints.priority === "number" && (
          <Badge className="ml-auto">priority {hints.priority}</Badge>
        )}
      </div>

      <Field label="useCases" value={hints.useCases} />

      {hints.selectionCriteria && (
        <div className="space-y-1.5">
          <div className="text-xs font-medium tracking-wide text-brand-blue7 uppercase">
            Selection Criteria
          </div>
          <ul className="space-y-1">
            {Object.entries(hints.selectionCriteria).map(([variant, when]) => (
              <li key={variant} className="text-sm text-muted-foreground">
                <code className="text-foreground">{variant}</code> — {when}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hints.antiPatterns && hints.antiPatterns.length > 0 && (
        <div className="space-y-1.5">
          <div className="text-xs font-medium tracking-wide text-destructive uppercase">
            Anti-patterns
          </div>
          <ul className="space-y-2">
            {hints.antiPatterns.map((ap) => (
              <li key={ap.avoid} className="text-sm">
                <span className="text-foreground">Avoid:</span>{" "}
                <span className="text-muted-foreground">{ap.avoid}.</span>{" "}
                <span className="text-muted-foreground">{ap.reason}</span>{" "}
                <span className="text-brand-chalk">Instead: {ap.instead}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="whenNotToUse" value={hints.whenNotToUse} />
        <Field label="pairsWith" value={hints.pairsWith} />
      </div>
    </div>
  );
}

/**
 * Output component — renders a ComponentMeta as the four pillars
 * (Structure · Appearance · Behavior · Accessibility) plus aiHints.
 */
export function ComponentMetaPanel({ meta }: { meta: ComponentMeta }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {meta.name}
          {meta.status && (
            <Badge variant="secondary" className="font-normal">
              {meta.status}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>{meta.description}</CardDescription>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge variant="outline">{meta.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          {PILLARS.map((pillar) => (
            <PillarBlock
              key={pillar}
              pillar={pillar}
              data={meta[pillar] as Record<string, unknown>}
            />
          ))}
        </div>
        <Separator />
        <AiHints hints={meta.aiHints} />
      </CardContent>
    </Card>
  );
}
