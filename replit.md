# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.
The main product is Pista Secreta: a Portuguese-first mystery-investigation
experience with pt-BR, English, and Spanish interfaces.

## Artifacts

- **Pista Secreta** (`artifacts/pista-secreta`) — React/Vite site with a multilingual landing page, six digital-case cards, a six-question case-matching quiz, digital investigations at `/investigacao/:slug`, and personalized briefings at `/personalizados`.
- **API Server** (`artifacts/api-server`) — Express API for analytics and personalized-briefing workflows.
- **Component Preview Server** (`artifacts/mockup-sandbox`) — isolated design-component previews.

## Product behavior and boundaries

- Portuguese (`pt-BR`) is the source language and fallback. English (`en`) and
  Spanish (`es`) are lazy-loaded; the selected language is saved as
  `pista-secreta:language` and updates the document language and page metadata.
  See `docs/i18n.md` before editing translations or adding a locale.
- Case slugs, evidence and message IDs, answer IDs, checkout URLs, product
  prices, and analytics event names are stable product data. Do not change
  them as part of copy or presentation work.
- The quiz records its own impression, open, start, answer, completion, result,
  case-click, and restart events. Landing-page case views and purchase-button
  clicks are tracked separately. A checkout-button click is not proof of a
  completed purchase.
- Personalized-briefing attachments require sign-in and use private storage.
  Keep authentication, consent, upload visibility, and delivery behavior
  intact when changing that flow.
- Configure credentials only through Replit Secrets. Relevant secret names
  include `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`,
  `VITE_CLERK_PUBLISHABLE_KEY`, `DEFAULT_OBJECT_STORAGE_BUCKET_ID`,
  `PRIVATE_OBJECT_DIR`, `PUBLIC_OBJECT_SEARCH_PATHS`, `SMTP_HOST`,
  `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, and
  `PERSONALIZADOS_ADMIN_EMAIL`. Never put their values in this file.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/pista-secreta run i18n:check` — check translation-key parity and literal translation-key references
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
