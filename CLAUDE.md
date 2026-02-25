# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev          # Start dev server on localhost:3000
pnpm build        # Production build
pnpm start        # Start production server

# Quality checks
pnpm lint         # ESLint
pnpm format       # Prettier (writes files)
pnpm typecheck    # tsc --noEmit

# Package manager: pnpm (v10)
```

> Note: `next.config.ts` has `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true`, so `pnpm build` won't catch type/lint errors — run them separately.

## Architecture

**AINURE** is a Next.js 15 (App Router) marketing site for a software agency, extended with medical-specialty questionnaire and analytics features.

### Routing

```
/                         → Homepage
/servicios, /metodologia, /valores, /contacto → Static marketing pages
/talks                    → Talks overview
/talks/cuestionario/hematologia
/talks/cuestionario/otorrinolaringologia → Specialty questionnaires
/talks/dashboard          → PIN-protected analytics dashboard

/api/mail/send            → POST – contact form email
/api/talks/questionnaire  → POST – submit questionnaire response
/api/talks/dashboard      → POST – fetch analytics (PIN required)
```

### Key Patterns

- **App Router with RSC**: components are Server Components by default; use `"use client"` only for interactivity
- **Page transitions**: `app/template.tsx` wraps every page with Framer Motion animations
- **Forms**: React Hook Form + Zod validation; schemas live in `lib/validations.ts`
- **Styling**: Tailwind with an `ainure` green palette (`#567b49` base) defined as HSL CSS variables; use the `cn()` helper from `lib/utils.ts` for conditional classes
- **Components**: shadcn/ui (Radix UI) components in `components/ui/`; path alias `@/components/ui/` is configured

### Data Layer

- **Supabase** is the only database — accessed directly from API routes using `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
- Questionnaire responses are stored in `talks_questionnaire_responses`
- The analytics pipeline is in `lib/talks/analytics.ts` — it aggregates responses, extracts top terms, and computes an AI readiness score
- TypeScript types for the talks domain are in `lib/talks/types.ts`

### Email

`lib/mail/client.ts` abstracts two providers selected by env vars:
1. **MailerSend** (primary) — `MAILERSEND_API_TOKEN`
2. **Nodemailer/SMTP** (fallback) — `ZOHO_SMTP_*` vars

### API Security (questionnaire route)

The questionnaire endpoint has several built-in protections: origin allowlist (`QUESTIONNAIRE_ALLOWED_ORIGINS`), in-memory rate limiting (`QUESTIONNAIRE_RATE_LIMIT_WINDOW_MS` / `QUESTIONNAIRE_RATE_LIMIT_MAX`), honeypot field, and form-age checks (min 3 s, max 6 h).

### Environment Variables

See `.env.local.example` for the full list. Key variables:
```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
DASHBOARD_PIN
MAILERSEND_API_TOKEN
QUESTIONNAIRE_ALLOWED_ORIGINS   # comma-separated
```
