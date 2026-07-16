import { ArrowRight, Rocket, Sparkles } from "lucide-react";

import { ComponentMetaExplorer } from "@/components/component-meta-explorer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SWATCHES = [
  { name: "background", value: "#0d1326" },
  { name: "card", value: "#111933" },
  { name: "popover", value: "#162140" },
  { name: "muted", value: "#17294d" },
  { name: "accent", value: "#266099" },
  { name: "ring / blue7", value: "#57a9d9" },
  { name: "chalk", value: "#8ac2e5" },
  { name: "foreground", value: "#cceeff" },
  { name: "white / heading", value: "#ffffff" },
  { name: "primary", value: "#ffd400" },
  { name: "royal", value: "#1a79ff" },
  { name: "sea", value: "#24bfd4" },
  { name: "destructive", value: "#e5484d" },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl">{title}</h2>
        <Separator className="flex-1" />
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <TooltipProvider>
      <main className="mx-auto w-full max-w-5xl px-6 py-16 space-y-20">
        {/* Hero */}
        <header className="space-y-6">
          <Badge variant="outline" className="gap-1.5 text-brand-blue7 border-ring/30">
            <Sparkles className="size-3" />
            Design system
          </Badge>
          <h1 className="text-6xl leading-[1.05]">
            Galvanite <span className="text-primary">components</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            shadcn/ui themed to the live galvanite.io palette and typography —
            DM Sans, Nordt Slim headings, deep-navy surfaces and the signature
            yellow call-to-action. A starting point to polish.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="brand" size="xl">
              Book a call
              <ArrowRight />
            </Button>
            <Button variant="secondary" size="xl">
              <Rocket />
              View work
            </Button>
          </div>
        </header>

        {/* Colors */}
        <Section title="Colors">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {SWATCHES.map((s) => (
              <div key={s.name} className="space-y-2">
                <div
                  className="h-16 w-full rounded-lg border border-border"
                  style={{ backgroundColor: s.value }}
                />
                <div className="text-sm">
                  <div className="font-medium text-foreground">{s.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {s.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <div className="space-y-3">
            <h1 className="text-5xl">Heading 1 — Nordt Slim</h1>
            <h2 className="text-4xl">Heading 2 — display</h2>
            <h3 className="text-3xl">Heading 3 — semibold</h3>
            <h4 className="text-2xl">Heading 4</h4>
            <p className="max-w-2xl text-muted-foreground">
              Body copy is set in DM Sans. The quick brown fox jumps over the
              lazy dog while a rocket climbs through a deep-navy sky.
            </p>
            <p className="text-sm text-brand-chalk">
              Eyebrow / small — chalk blue, wide tracking.
            </p>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="brand">Brand CTA</Button>
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="brand" size="xl">
              XL brand <ArrowRight />
            </Button>
            <Button size="lg">Large</Button>
            <Button size="sm">Small</Button>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button size="icon" variant="outline" aria-label="Launch" />
                }
              >
                <Rocket />
              </TooltipTrigger>
              <TooltipContent>Launch</TooltipContent>
            </Tooltip>
          </div>
        </Section>

        {/* Cards + forms */}
        <Section title="Cards & forms">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Start a project</CardTitle>
                <CardDescription>
                  Tell us where you want to launch.
                </CardDescription>
                <CardAction>
                  <Badge>New</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Ada Lovelace" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scope">Scope</Label>
                  <Select>
                    <SelectTrigger id="scope">
                      <SelectValue placeholder="Select a scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brand">Brand &amp; identity</SelectItem>
                      <SelectItem value="web">Website</SelectItem>
                      <SelectItem value="product">Product design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="msg">Message</Label>
                  <Textarea
                    id="msg"
                    placeholder="A few words about the mission…"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" defaultChecked />
                  <Label htmlFor="terms" className="text-muted-foreground">
                    I agree to be contacted
                  </Label>
                </div>
                <Button variant="brand" className="w-full">
                  Send
                  <ArrowRight />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Tabs, switches, and badges.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="specs">Specs</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="overview"
                    className="pt-4 text-muted-foreground"
                  >
                    A galvanized, launch-ready design foundation.
                  </TabsContent>
                  <TabsContent
                    value="specs"
                    className="pt-4 text-muted-foreground"
                  >
                    12-column grids, .75rem radii, soft blue glows.
                  </TabsContent>
                  <TabsContent
                    value="team"
                    className="pt-4 text-muted-foreground"
                  >
                    Built by people who like rockets.
                  </TabsContent>
                </Tabs>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label htmlFor="notify">Launch notifications</Label>
                  <Switch id="notify" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="beta">Beta features</Label>
                  <Switch id="beta" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Component metadata — four pillars + aiHints */}
        <Section title="Component metadata">
          <p className="max-w-2xl text-muted-foreground">
            Every component ships a machine-readable{" "}
            <code className="text-foreground">meta</code> — the four pillars
            (Props · Variants · Relationships · Tokens) plus{" "}
            <code className="text-foreground">aiHints</code> — so humans and
            agents can pick and use it correctly.
          </p>
          <ComponentMetaExplorer />
        </Section>

        <footer className="pt-8 text-sm text-muted-foreground">
          Galvanite theme · dark-first · derived from{" "}
          <span className="font-mono">design-shadcn.md</span>
        </footer>
      </main>
    </TooltipProvider>
  );
}
