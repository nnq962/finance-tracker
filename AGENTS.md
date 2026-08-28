<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Responsive Design & shadcn/ui Requirements

* Every page and component MUST be fully responsive across Mobile, Tablet, and Desktop.
* Use Tailwind CSS responsive utility classes (e.g. `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) to implement responsive layouts.

### Typography

* Preserve Tailwind CSS's default type scale. **Do not globally remap semantic utilities** such as `text-sm` to another size.
* Primary body copy and user-facing form controls (Button, Input, Select, Textarea, and similar controls) MUST use `text-base` (16px). Mobile text inputs MUST remain at least 16px to avoid browser auto-zoom.
* Supporting descriptions, helper text, timestamps, metadata, and secondary labels SHOULD use `text-sm` (14px), usually with `text-muted-foreground`.
* `text-xs` (12px) MAY be used only for compact UI such as badges or bottom-navigation labels. Do not use text smaller than 12px, including arbitrary values such as `text-[10px]` or `text-[11px]`.
* Card titles SHOULD use `text-lg font-semibold` (18px).
* Section, dialog, and drawer titles SHOULD use `text-xl font-semibold` (20px).
* Page titles MUST use `text-2xl font-semibold tracking-tight` (24px). Use a larger responsive size only when the page hierarchy requires it.
* Regular monetary values in lists SHOULD use `text-lg` or `text-xl` with `font-semibold tabular-nums`.
* KPI and balance highlights SHOULD use `text-3xl md:text-4xl font-semibold tabular-nums`.
* Primary transaction amount inputs SHOULD use `text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight tabular-nums`.
* Prefer `font-normal` for body text, `font-medium` for controls and labels, and `font-semibold` for headings. Reserve `font-bold` for primary monetary displays or similarly high-emphasis values.

### shadcn/ui Usage

* **MUST use shadcn/ui components as the default and primary UI building blocks.** Do not implement equivalent UI components from scratch when a shadcn/ui component exists.
* Before creating any custom UI component, **check whether shadcn/ui already provides a suitable component or primitive.** If it does, use the shadcn/ui component instead.
* Install missing shadcn/ui components with:
  `npx shadcn@latest add <component_name>`
* **MUST use the official shadcn/ui component APIs, props, variants, composition patterns, and primitives as provided.**
* **DO NOT create custom replacements, wrappers, or reimplementations of shadcn/ui components** when the required functionality is already supported by shadcn/ui.
* **DO NOT copy, fork, or rewrite shadcn/ui component implementations** just to customize their behavior. Prefer the official component API, `variant`, `size`, `className`, composition, and supported props.
* Custom styling is allowed **only through the intended shadcn/ui APIs and Tailwind CSS**, without modifying the underlying component behavior or recreating the component.
* If a required component does not exist in shadcn/ui, a custom component may be created, but it should remain minimal and follow shadcn/ui's design patterns and conventions.
* Prefer composing multiple shadcn/ui components together rather than creating a new custom component that duplicates their functionality.

### Default Decision Rule

When implementing UI, follow this priority:

1. **Existing shadcn/ui component** → MUST use it.
2. **Existing shadcn/ui component + Tailwind customization** → MUST use the component and customize it through its supported APIs.
3. **Composition of multiple shadcn/ui components** → Prefer this when the UI requires multiple primitives.
4. **No suitable shadcn/ui component exists** → Create a minimal custom component only when necessary.

**Never choose a custom implementation over an existing shadcn/ui component.**

### Exception: Presentational / Marketing Components

Components whose primary purpose is visual storytelling or brand impression
(e.g. hero sections, landing page feature cards, testimonial/pricing showcases,
banners) are EXEMPT from the mandatory shadcn/ui rule.

For these components:
* You MAY design custom layout, spacing, imagery, and visual composition freely with Tailwind CSS.
* You SHOULD still reuse shadcn/ui primitives (Button, Badge, Avatar, etc.) *inside* the custom layout where it doesn't compromise the visual goal — reuse for consistency of interactive elements, not for the outer container/layout.
* This exception does NOT apply to components with interactive state (forms, menus, dialogs) even if they appear inside a marketing section — those sub-elements still MUST use shadcn/ui.

When unsure whether a component is "functional" or "presentational", default to
treating it as functional (shadcn required) unless the user/task explicitly
frames it as a landing/marketing/showcase element.
