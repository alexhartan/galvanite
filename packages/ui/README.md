# @galvanite/ui

Shared component library for galvanite.io, built on [shadcn/ui](https://ui.shadcn.com) (Radix primitives, Tailwind v4). Components are copied into `src/components` rather than installed as opaque dependencies, so they're editable in place.

Sibling to `@galvanite/tokens` under `packages/`.

## Adding or updating components

```bash
pnpm --filter @galvanite/ui exec shadcn add <component>
pnpm --filter @galvanite/ui exec shadcn add --all --overwrite
```
