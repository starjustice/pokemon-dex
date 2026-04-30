@AGENTS.md

## Additional Notes for Claude

- Before modifying Next.js APIs (routing, metadata, image config), check `node_modules/next/dist/docs/01-app/` for the current API surface.
- PokeAPI is free and requires no authentication — never add API keys for it.
- The `openspec/` directory contains design docs and specs for features. Read the relevant spec before modifying a feature.
- When adding new components, follow the existing pattern: Tailwind-only styling, dark mode variants, fade-in animations where appropriate.
