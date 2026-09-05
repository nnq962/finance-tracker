<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# UI and design requirements

## Mobile-first

- Design every screen for mobile first. The primary experience should look and behave like a mobile application rather than a desktop website compressed to a smaller viewport.
- Start layout, navigation, spacing, interaction, and content hierarchy from phone-sized viewports, then progressively enhance the experience for tablets and desktops.
- Keep primary actions easy to reach and ensure all screens remain usable with touch input and narrow widths.

## Use shadcn/ui

- Use shadcn/ui components for the interface. Before creating UI, check whether the required shadcn/ui components are already installed; install any missing components with the shadcn CLI.
- Do not create custom replacements for components that shadcn/ui provides. Compose screens from the installed shadcn/ui components instead.
- Preserve the default shadcn/ui appearance as much as possible. Do not override a shadcn/ui component's colors, typography, borders, radii, shadows, states, or internal spacing unless the user explicitly requests it.
- Only add layout and responsive classes around shadcn/ui components when needed to compose the page. Avoid restyling the components themselves.

## Plan components before implementation

- Before implementing any requested design, first identify which shadcn/ui components the design should use.
- Check the currently installed components and install the missing ones before building the screen.
- Read the relevant component documentation on the official shadcn/ui website and follow its documented structure, API, variants, composition patterns, interaction behavior, and accessibility guidance.
- Do not guess how a shadcn/ui component should be assembled. Use the official example for that component as the implementation baseline so screens remain consistent with the rest of the design system.
