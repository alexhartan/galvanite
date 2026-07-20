import {
  Palette,
  Share2,
  Shapes,
  SlidersHorizontal,
  Sparkles,
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
import type { ComponentMeta } from "@/lib/component-meta";

/* ---------------------------------------------------------------- helpers */

function titleize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[._]/g, " ")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function PillarShell({
  icon: Icon,
  label,
  blurb,
  children,
}: {
  icon: LucideIcon;
  label: string;
  blurb: string;
  children: React.ReactNode;
}) {
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
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-medium tracking-wide text-brand-blue7 uppercase">
      {children}
    </div>
  );
}

function ChipList({ label, items }: { label: string; items?: readonly string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-1.5">
      <FieldLabel>{titleize(label)}</FieldLabel>
      <div className="flex flex-wrap gap-1.5">
        {items.map((v) => (
          <Badge key={v} variant="outline" className="font-normal">
            {v}
          </Badge>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- pillar: props */

function PropsPillar({ props }: { props: ComponentMeta["props"] }) {
  const entries = Object.entries(props);
  return (
    <PillarShell icon={SlidersHorizontal} label="Props" blurb="Component API">
      {entries.length === 0 ? (
        <div className="text-sm text-muted-foreground">No configurable props.</div>
      ) : (
        <div className="space-y-3">
          {entries.map(([name, def]) => (
            <div key={name} className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <code className="text-sm text-foreground">{name}</code>
                <Badge variant="secondary" className="font-normal">
                  {def.type}
                </Badge>
                {def.required && (
                  <span className="text-xs text-destructive">required</span>
                )}
                {def.default !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    = {String(def.default)}
                  </span>
                )}
              </div>
              {def.description && (
                <div className="text-sm text-muted-foreground">{def.description}</div>
              )}
              {def.options && (
                <div className="flex flex-wrap gap-1">
                  {def.options.map((o) => (
                    <Badge key={o} variant="outline" className="font-normal text-xs">
                      {o}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PillarShell>
  );
}

/* ---------------------------------------------------------- pillar: variants */

function VariantsPillar({ variants }: { variants: ComponentMeta["variants"] }) {
  const axes = Object.entries(variants.axes);
  const purpose = Object.entries(variants.purpose);
  const empty = axes.length === 0 && purpose.length === 0;
  return (
    <PillarShell icon={Shapes} label="Variants" blurb="Axes & purpose">
      {empty ? (
        <div className="text-sm text-muted-foreground">Single, non-variant component.</div>
      ) : (
        <>
          {axes.map(([axis, values]) => (
            <ChipList key={axis} label={axis} items={values} />
          ))}
          {purpose.length > 0 && (
            <div className="space-y-1.5">
              <FieldLabel>Purpose</FieldLabel>
              <ul className="space-y-1">
                {purpose.map(([key, text]) => (
                  <li key={key} className="text-sm text-muted-foreground">
                    <code className="text-foreground">{key}</code> — {text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {variants.invalidCombinations?.length ? (
            <div className="space-y-1.5">
              <FieldLabel>Invalid combinations</FieldLabel>
              <ul className="space-y-1">
                {variants.invalidCombinations.map((c, i) => (
                  <li key={i} className="text-sm">
                    <span className="text-foreground">
                      {Object.entries(c.axes)
                        .map(([a, v]) => `${a}=${v}`)
                        .join(" + ")}
                    </span>{" "}
                    <span className="text-muted-foreground">— {c.reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      )}
    </PillarShell>
  );
}

/* ----------------------------------------------------- pillar: relationships */

function RelationshipsPillar({
  rel,
}: {
  rel: ComponentMeta["relationships"];
}) {
  return (
    <PillarShell icon={Share2} label="Relationships" blurb="Composition & a11y">
      <ChipList label="requires" items={rel.requires} />
      <ChipList label="mustBeChildOf" items={rel.mustBeChildOf} />
      <ChipList label="mustBeParentOf" items={rel.mustBeParentOf} />
      <ChipList label="optionalSibling" items={rel.optionalSibling} />
      <ChipList label="commonPartners" items={rel.commonPartners} />
      <ChipList label="triggers" items={rel.triggers} />
      <ChipList label="exposesState" items={rel.exposesState} />
      {rel.blocksWhen?.length ? (
        <div className="space-y-1.5">
          <FieldLabel>Blocks when</FieldLabel>
          <ul className="space-y-1">
            {rel.blocksWhen.map((b, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                {b.when} → {b.effect}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="space-y-2 rounded-md border border-border/60 bg-muted/30 p-3">
        <div className="text-sm">
          <span className="text-brand-blue7">role:</span>{" "}
          <span className="text-foreground">{rel.role}</span>
        </div>
        <div className="text-sm">
          <span className="text-brand-blue7">keyboard:</span>{" "}
          <span className="text-muted-foreground">{rel.keyboardSupport}</span>
        </div>
        <div className="text-sm">
          <span className="text-brand-blue7">screen reader:</span>{" "}
          <span className="text-muted-foreground">{rel.screenReader}</span>
        </div>
      </div>
    </PillarShell>
  );
}

/* ------------------------------------------------------------ pillar: tokens */

function TokensPillar({ tokens }: { tokens: ComponentMeta["tokens"] }) {
  const groups = Object.entries(tokens).filter(
    ([, v]) => v && Object.keys(v).length > 0,
  ) as [string, Record<string, string>][];
  return (
    <PillarShell icon={Palette} label="Tokens" blurb="Themeable values">
      {groups.length === 0 ? (
        <div className="text-sm text-muted-foreground">Inherits ambient tokens.</div>
      ) : (
        groups.map(([group, vals]) => (
          <div key={group} className="space-y-1.5">
            <FieldLabel>{group}</FieldLabel>
            <div className="space-y-1">
              {Object.entries(vals).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 text-sm">
                  {v.startsWith("var(") || v.startsWith("#") ? (
                    <span
                      className="size-3.5 shrink-0 rounded-sm border border-border"
                      style={{ background: v }}
                    />
                  ) : null}
                  <code className="text-muted-foreground">{k}</code>
                  <span className="text-foreground/70">{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </PillarShell>
  );
}

/* ------------------------------------------------------------------ aiHints */

function AiHints({ hints }: { hints: ComponentMeta["aiHints"] }) {
  const priorityTone =
    hints.priority === "high"
      ? "default"
      : hints.priority === "medium"
        ? "secondary"
        : "outline";
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <span className="font-medium text-foreground">aiHints</span>
        <Badge variant={priorityTone} className="ml-auto font-normal">
          priority: {hints.priority}
        </Badge>
      </div>

      <ChipList label="keywords" items={hints.keywords} />

      <div className="space-y-1.5">
        <FieldLabel>Selection criteria</FieldLabel>
        <ul className="space-y-1">
          {Object.entries(hints.selectionCriteria).map(([k, when]) => (
            <li key={k} className="text-sm text-muted-foreground">
              <code className="text-foreground">{k}</code> — {when}
            </li>
          ))}
        </ul>
      </div>

      <ChipList label="use cases" items={hints.usage.useCases} />

      {hints.usage.commonPatterns.length > 0 && (
        <div className="space-y-1.5">
          <FieldLabel>Common patterns</FieldLabel>
          <ul className="space-y-1">
            {hints.usage.commonPatterns.map((p) => (
              <li key={p.name} className="text-sm">
                <span className="text-foreground">{p.name}:</span>{" "}
                <span className="text-muted-foreground">{p.composition}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hints.usage.antiPatterns.length > 0 && (
        <div className="space-y-1.5">
          <FieldLabel>
            <span className="text-destructive">Anti-patterns</span>
          </FieldLabel>
          <ul className="space-y-2">
            {hints.usage.antiPatterns.map((ap) => (
              <li key={ap.scenario} className="text-sm">
                <span className="text-foreground">{ap.scenario}.</span>{" "}
                <span className="text-muted-foreground">{ap.reason}</span>{" "}
                <span className="text-brand-chalk">Instead: {ap.alternative}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------- panel */

/**
 * Output component — renders a ComponentMeta as the four pillars
 * (Props · Variants · Relationships · Tokens) plus aiHints.
 */
export function ComponentMetaPanel({ meta }: { meta: ComponentMeta }) {
  const { component } = meta;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          {component.name}
          <Badge variant="secondary" className="font-normal">
            {component.category}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {component.type}
          </Badge>
        </CardTitle>
        <CardDescription>{component.description}</CardDescription>
        <div className="pt-1 font-mono text-xs text-muted-foreground">
          {component.path}
          {component.figma?.nodeId ? ` · figma:${component.figma.nodeId}` : ""}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <PropsPillar props={meta.props} />
          <VariantsPillar variants={meta.variants} />
          <RelationshipsPillar rel={meta.relationships} />
          <TokensPillar tokens={meta.tokens} />
        </div>
        <Separator />
        <AiHints hints={meta.aiHints} />
      </CardContent>
    </Card>
  );
}
