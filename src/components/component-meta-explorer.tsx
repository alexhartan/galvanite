"use client";

import { ComponentMetaPanel } from "@/components/component-meta-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { meta as buttonMeta } from "@/components/ui/button";
import { meta as inputMeta } from "@/components/ui/input";
import { meta as selectMeta } from "@/components/ui/select";
import { meta as switchMeta } from "@/components/ui/switch";
import { meta as tooltipMeta } from "@/components/ui/tooltip";

const ENTRIES = [
  { value: "button", meta: buttonMeta },
  { value: "input", meta: inputMeta },
  { value: "select", meta: selectMeta },
  { value: "switch", meta: switchMeta },
  { value: "tooltip", meta: tooltipMeta },
] as const;

export function ComponentMetaExplorer() {
  return (
    <Tabs defaultValue="button">
      <TabsList>
        {ENTRIES.map((e) => (
          <TabsTrigger key={e.value} value={e.value}>
            {e.meta.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {ENTRIES.map((e) => (
        <TabsContent key={e.value} value={e.value} className="pt-4">
          <ComponentMetaPanel meta={e.meta} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
