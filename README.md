# Phát & Thảo — Wedding Invitation

A premium mobile-first wedding invitation inspired by British Regency stationery: warm ivory fine-art paper, dusty baby-pink florals, burgundy ink, antique-gold hairlines, and restrained editorial motion. It opens as a photographed 4:5 stationery suite wrapped in white-wildflower vellum, tied with frayed terracotta silk, and secured by a gold P&T wax seal.

React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion

## Wedding content

All replaceable content lives in `src/content/wedding.ts`:

- **Couple:** Phát & Thảo (`P` / `T` monogram)
- **Date:** Sunday, February 14, 2027
- **Ceremony:** 9:00 AM
- **Reception:** 5:00 PM
- **Venue:** Goldland Plaza, 14–20 Lý Thường Kiệt, Thuận Hóa, Huế
- **Timeline:** editable `timeline[]` entries
- **Closing:** editable final-note copy
- **RSVP:** configurable `email`, `sms`, `endpoint`, or `demo` delivery

The RSVP is intentionally simple: attendance, full name, and guest count. It currently uses `demo` delivery. Connect a real recipient or endpoint in `src/content/wedding.ts` before sending invitations.

```ts
delivery: { method: 'email', to: 'you@example.com' }
delivery: { method: 'sms', to: '+84901234567' }
delivery: { method: 'endpoint', url: 'https://…' }
delivery: { method: 'demo' }
```

Endpoint payload: `{ attendance: "accept" | "decline", name, guests, submittedAt }`.

## Experience

1. **Invitation suite** — 4:5 top-down flat lay with layered main invitation, details insert and reply card; translucent white-wildflower vellum; frayed terracotta silk; gold royal P&T seal embossed with their full names. Pressing the seal releases the ribbon and lifts the vellum, then the revealed invitation opens the document.
2. **Monogram** — airy botanical P/T reveal on the same continuous paper.
3. **Invitation** — formal editorial announcement and fine-art couple portrait.
4. **Details** — typography-led February 14 date with 9:00 AM / 5:00 PM split.
5. **Venue** — Goldland Plaza, atmospheric image, and understated directions link.
6. **Timeline** — thin gold vertical line with readable single-column moments.
7. **RSVP** — transparent hairline inputs and truthful delivery states.
8. **Closing** — guests press a seal to unfold a final romantic love note.

## Architecture

```text
src/
  content/
    wedding.ts             one source of truth for wedding details
    rsvpDelivery.ts        email / SMS / endpoint / demo transports
  animations/variants.ts   fadeIn, fadeUp, slowScale, envelopeOpen,
                           waxSealReveal, imageReveal, sectionReveal
  decorations/
    BotanicalDecoration.tsx
    OrnamentalDivider.tsx
    Monogram.tsx
    WaxSeal.tsx              royal burgundy + gold seals: named rim, crown, laurel, P&T crest, unique SVG IDs
    VellumWildflowers.tsx   white printed floral overlay
    SilkRibbon.tsx          frayed terracotta ribbon release
    RoseDecor.tsx
    PaperTexture.tsx
  ui/
    Reveal.tsx
    SectionHeading.tsx
    VintagePhoto.tsx
    RadioOption.tsx
  components/
    Envelope.tsx             full-screen suite interaction orchestrator
    InvitationSuite.tsx     reusable 4:5 flat-lay composition
    MonogramReveal.tsx
    Invitation.tsx
    Details.tsx
    Venue.tsx
    Timeline.tsx
    Rsvp.tsx
    Closing.tsx
```

The sections are semantic components but visually share one paper canvas; there are no stacked UI cards. Real Redouté rose cut-outs sit in `public/images/rose-*.webp`. `public/images/couple.svg` and `venue.svg` remain placeholders—replace them with optimized real WebP/AVIF photographs and update the paths in `wedding.ts`.

## Design system

- Paper `#FBF7EF`; deep paper `#F2E9DC`; baby pink `#F5E2E6`
- Burgundy `#743345`; dusty rose `#B87384`; sage `#87947F`
- Antique gold `#B4975A`; terracotta silk `#B96850`; cloudy vellum `#F1EDE3`; cool charcoal `#3D3537`
- Bodoni Moda for display, Cormorant Garamond for editorial text, Jost for functional labels, Parisienne only for short decorative phrases
- Primary target: 390 × 844 px; fluid from 320–430 px; desktop preserves a centered 430 px invitation sheet
- iPhone safe areas via `env(safe-area-inset-*)`; reduced-motion support; no horizontal overflow

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

`vite.config.ts` uses `base: './'`, so `dist/` is compatible with GitHub Pages and other static hosts. Pushing `main` deploys through `.github/workflows/deploy.yml`.
