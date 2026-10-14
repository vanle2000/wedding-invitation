# Le Jardin Écarlate — Phát & Thảo

A mobile-first digital wedding invitation rebuilt as a French botanical correspondence card: an oxblood gatefold folio, antique-gold monogram clasp, warm ivory paper, French handwriting, archival peony art, and a scarlet camellia.

React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion

## Wedding details

- **Couple:** Phát & Thảo
- **Date:** Sunday, February 14, 2027
- **Ceremony:** 9:00 AM
- **Reception:** 5:00 PM
- **Venue:** Goldland Plaza, 14–20 Lý Thường Kiệt, Thuận Hóa, Huế

Replaceable content is centralized in `src/content/wedding.ts`.

## Experience

1. **French gatefold** — a deep-red 4:5 folio with gold rules, archival flowers, and a circular P&T clasp. Pressing the monogram opens both doors; the revealed ivory card becomes the second touch target.
2. **Invitation** — Parisienne names, restrained formal wording, peony and camellia crossing the paper edges.
3. **Details** — an oxblood printed insert showing February 14 and the two confirmed event times.
4. **Venue** — Goldland Plaza with a custom oxblood-and-gold architectural illustration and understated directions link.
5. **Timeline** — a thin antique-gold editorial sequence.
6. **RSVP** — attendance, full name, and guest count only; transparent hairline inputs and truthful delivery states.
7. **Le dernier pétale** — touch the camellia to reveal the couple’s final love letter.

## Design system

- Oxblood `#681C2A`; wine `#4A101B`; camellia `#A52A3C`
- Warm ivory `#F8F1E4`; parchment `#EFE3D1`
- Antique gold `#BE9B50`; olive `#58604A`; ink `#33292B`
- Parisienne is used only for names and short intimate phrases
- Bodoni Moda carries headings and dates; Cormorant Garamond carries readable prose; Jost carries UI labels
- Primary canvas: 390 × 844 px; fluid from 320–430 px; centered at 430 px on desktop
- iPhone safe areas, keyboard focus handoff, inert closed content, and reduced-motion behavior are included

## Architecture

```text
src/
  App.tsx
  animations/variants.ts
  content/
    wedding.ts
    rsvpDelivery.ts
  art/
    BotanicalArt.tsx
    GoldOrnament.tsx
    PaperGrain.tsx
    RoyalMedallion.tsx
  ui/
    Reveal.tsx
    SectionHeading.tsx
  components/
    GatefoldCover.tsx
    InvitationCanvas.tsx
    Invitation.tsx
    Details.tsx
    Venue.tsx
    Timeline.tsx
    Rsvp.tsx
    Closing.tsx
```

The body is one continuous ivory canvas—not a stack of rounded UI cards.

## Botanical artwork

The two attached historical plates were background-cleaned and exported as transparent WebP assets:

- `public/images/peony-antique.webp` — [Jacques Le Moyne de Morgues, *Peony*](https://commons.wikimedia.org/wiki/File:Jacques_Le_Moyne_de_Morgues._Peony.jpg), public domain.
- `public/images/camellia-red.webp` — [Kawahara Keiga, *Camellia japonica*](https://commons.wikimedia.org/wiki/File:Camellia_japonica_%E3%83%84%E3%83%90%E3%82%AD.jpg), public domain.

The typography direction was informed by the history of French formal scripts and copperplate aristocratic announcements described by [Typofonderie](https://typofonderie.com/gazette/altesse-formal-script-influenced-by-copperplate-writing-masters). The project uses open web fonts rather than the commercial typeface discussed there.

## RSVP delivery

The current configuration uses preview mode. Before sending invitations, change `wedding.rsvp.delivery`:

```ts
{ method: 'email', to: 'you@example.com' }
{ method: 'sms', to: '+84901234567' }
{ method: 'endpoint', url: 'https://…' }
{ method: 'demo' }
```

Endpoint payload: `{ attendance, name, guests, submittedAt }`.

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

Pushing `main` deploys `dist/` through `.github/workflows/deploy.yml`.
