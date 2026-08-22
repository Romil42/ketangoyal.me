# Ketan Goyal — Brand & Design System (v1.0)

*Companion document to `implementation_plan.md`. This governs positioning, voice, color, and typography for the V1 build. Tools, resources, blog, and backend are Phase 2 and out of scope here — see §8.*

---

## 1. Positioning

### Positioning statement
Ketan Goyal is a builder who documents what he's building, in public, before he knows whether it will work.

### Brand line
**"I learn by building."**
*Technology, businesses, systems and experiments.*

### Category
Not a founder portfolio. Not a personal blog. This is closest to a **build log** — a documented record of things attempted, shipped, paused, and learned. Kraftt Digital is the current chapter, not the headline.

### Archetype
The Apprentice-turned-Practitioner, not the Guru. He hasn't run companies for fifteen years, so the site never borrows that kind of authority. Its authority comes from specificity — dates, tools, numbers, dead ends — not from titles.

### Positioning pillars
1. **Process over credentials** — the site sells the method (curiosity → learn → build → test → fail/pause → understand → build again), not a résumé.
2. **Documented, not curated** — failures and pauses are on the record next to the wins. The Vibed Vines V1 stopping is as visible as SmartStore shipping.
3. **Built, not theorized** — claims are backed by something that exists: a shipped feature, a live store, a screenshot, a working script.
4. **Grounded, not hyped** — business curiosity shows up as wholesale-market visits and PHP debugging, not "10x your growth" language.

### What this site is deliberately not
- Not a "Founder | Developer | AI Expert" title stack on the hero.
- Not a Kraftt Digital landing page with a bio bolted on.
- Not an inspirational-quote personal-brand site.
- Not a warm-cream, terracotta-accent template — see §3 for why that look is explicitly avoided.

### One-line pitch, by audience
- **Business owner researching Kraftt:** "The person building Kraftt has spent years actually building things, not just consulting on them."
- **Peer / recruiter / collaborator:** "A working record of how someone taught himself production engineering and business fundamentals in public."
- **Returning reader:** "Come back to see what changed."

---

## 2. Voice & Tone

### Voice pillars, in priority order
1. **Plain** — everyday words over jargon. "I broke the checkout flow and spent two days fixing it" beats "I encountered and remediated a critical production issue."
2. **Specific** — a date, a tool name, a number, or a named failure is worth more than an adjective. Replace "significant growth" with the real number, or cut the sentence.
3. **Candid, not confessional** — failures are stated matter-of-factly, without self-flagellation or false modesty. "I paused it when circumstances changed," not "I failed miserably at..."
4. **Quietly confident** — no exclamation points selling the reader, no "game-changing," no "10x." Confidence comes from precision, not volume.
5. **Present-tense curiosity** — even retrospective sections should read like someone still figuring it out, not someone who has arrived.

### Sentence-level rules
- Active voice by default.
- Short sentences carry the emotional beats; longer sentences carry the explanation.
- No rhetorical-question hooks ("Ever wonder how...?").
- No listicle voice ("5 things that will blow your mind").
- Numerals for metrics and dates in body copy, not spelled-out numbers.
- Section headers are statements, not questions or gerund fragments: "Then I learned PHP," not "Learning PHP."

### Calibration: two rewrites
- Generic: *"I'm a passionate entrepreneur and developer with a growth mindset."*
  Ketan Goyal voice: **"I learn by building. Most of what's on this site started as something I didn't know how to do yet."**
- Generic: *"The Vibed Vines was an incredible learning experience on my entrepreneurial journey."*
  Ketan Goyal voice: **"The Vibed Vines V1 was Placeit mockups, a ChatGPT logo, and an Instagram grid. I paused it when circumstances changed — then came back to it with 100+ SKUs and a real Shopify storefront."**

### Words to avoid
"passionate," "synergy," "game-changing," "10x," "unlock," "leverage" (as a verb), "journey" more than once per page, "excited to announce."

### Words this brand owns
"learn," "build," "shipped," "paused," "debugged," "figured out," "still in progress."

---

## 3. Color System

### Why this palette
AI-generated brand sites cluster around a small set of defaults — most commonly a warm cream background (~#F4F1EA) with a terracotta or clay accent. That's the look you asked to avoid, and it's also generic enough now to read as a template rather than a choice. This palette goes the other direction: a genuinely white, cool-neutral page, closer to a printed page or an engineer's notebook, with a single confident "ink" accent instead of a warm clay one. It ties back to the brand's own material — blueprints, schematics, build logs, things drawn in blue ink on white paper.

### Palette

| Token | Name | Hex | Use |
|---|---|---|---|
| `--paper` | Paper | `#FFFFFF` | Primary background. Always true white — never warm or cream. |
| `--fog` | Fog | `#F6F7F9` | Alternate section background, card fills. Cool, faint blue-gray, not warm. |
| `--mist` | Mist (border) | `#E4E6EB` | Hairlines, dividers, input borders. |
| `--ink` | Ink | `#14161B` | Primary text, headlines. |
| `--slate` | Slate | `#4B505A` | Secondary text, body copy. |
| `--dust` | Dust (muted) | `#868C97` | Captions, timestamps, disabled states. |
| `--signal` | Signal | `#2F4CD1` | The one accent. Links, active states, eyebrow dot, focus rings. Used sparingly. |
| `--signal-soft` | Signal Soft | `#EDF0FC` | Tint for small badges/tags only — never a section background. |
| `--graphite` | Graphite | `#0E0F12` | Dark sections (footer), any future dark mode. |

### Rules
- Background is always `--paper` or `--fog`. Never introduce a warm or yellow-tinted neutral anywhere — including image mats, card fills, or hover states.
- `--signal` is the only saturated color on the site. If a second accent is ever needed, make it another cool hue (e.g., a deep green) — never a warm terracotta or amber — to keep the "ink on paper" logic intact.
- `--signal-soft` is for a badge, a dot, an underline, a small chip — not a hero band or a full-width section.
- Dark sections use `--graphite`, a true near-black, not a warm charcoal or brown-black.

### Replaces in the existing implementation plan
- Drop `--surface-warm` — it has no home in this palette.
- Every "bronze accent" reference (Eyebrow dot, OG image) becomes `--signal` blue.
- Every "off-white" background reference (hero portrait, editorial photos) becomes white / `--paper`.

---

## 4. Typography

### Type roles
- **Display / editorial — Instrument Serif.** Large sizes only: H1/H2 and pull-quote-style statements ("I learn by building.", section openers). Never used for nav, buttons, or labels.
- **Body / UI — Manrope.** All body copy, navigation, buttons, form elements, captions.
- **Optional signature detail — a metadata mono face** (e.g., IBM Plex Mono or JetBrains Mono), small size, for dates and tech-stack tags on the Journey timeline (`2020 →`, `SHIPPED`, `PAUSED`). This is the one typographic signature: it reads like commit-log metadata, reinforcing the build-log positioning without adding decoration. Nice-to-have for V1, easy to add later without restructuring.

### Type scale (desktop baseline)

| Role | Face | Size | Line-height | Tracking | Weight |
|---|---|---|---|---|---|
| Display / H1 | Instrument Serif | 3.5–4.5rem | 1.05 | -0.01em | Regular |
| H2 | Instrument Serif | 2.5rem | 1.1 | -0.01em | Regular |
| H3 | Instrument Serif | 1.75rem | 1.15 | normal | Regular |
| Body large (intros) | Manrope | 1.25rem | 1.6 | normal | 400 |
| Body | Manrope | 1rem | 1.7 | normal | 400 |
| UI / nav / buttons | Manrope | 0.9375rem | 1.4 | 0.01em | 500–600 |
| Eyebrow / label | Manrope | 0.8125rem | 1.2 | 0.08em, uppercase | 600 |
| Caption / metadata | Manrope or mono | 0.8125rem | 1.4 | normal | 400 |

### Rules
- Serif is reserved for moments the reader should slow down for — hero statement, section openers, pull quotes. It never appears in a button, nav item, or form field.
- Body copy max line length: 65–75 characters (`max-width: 65ch` on long-form paragraphs).
- Headline tracking stays slightly tight at large sizes; UI tracking stays slightly open at small sizes — the two faces should feel like deliberately different registers, not matched twins.
- No italics for emphasis in body copy — use `--signal` or weight instead, sparingly.

---

## 5. Imagery direction

- The portrait (`3.png`) sits directly on `--paper` (true white) — let the photo's own tones carry any warmth, not the background.
- Editorial photography (`1.JPG`, `2.jpg`): plain treatment, no heavy grading, no duotone filters, minimal or no corner radius.
- SmartStore screenshots are shown as evidence, not polished product shots — real browser chrome or a plain frame, not glossy device mockups. This matches "documented, not curated."
- No stock photography anywhere on the site.

---

## 6. Structural & motion principles

- Structural devices (numbered eras, numbered builds) are used only where the content is genuinely sequential — the Journey timeline qualifies; a features grid would not.
- Motion is restrained: one deliberate page-load or scroll-reveal moment on the homepage hero is enough. No scattered hover effects, no parallax stacking. `prefers-reduced-motion` fully respected (already in the plan).
- Buttons and cards stay flat — thin `--mist` borders instead of drop shadows, no gradients anywhere, including the OG image.
- Focus states use `--signal` visibly, satisfying both the plan's accessibility requirement and the single-accent rule.

---

## 7. Spot fixes to `implementation_plan.md`

- **§2 Design System** — tokens become `--paper`, `--fog`, `--mist`, `--ink`, `--slate`, `--dust`, `--signal`, `--signal-soft`, `--graphite`. Drop `--surface-warm`.
- **§5 Eyebrow component** — "bronze accent dot" → accent dot in `--signal`.
- **Asset table / Hero** — "integrates perfectly with off-white background" → "integrates directly with the white (`--paper`) background."
- **§16 OG image** — "warm white bg... bronze accent" → "white (`--paper`) background, `--signal` accent, `--ink` text."
- Everything else in the plan — routes, components, file structure, execution approach — stands as written.

---

## 8. Explicitly out of scope for this build (Phase 2)

Tools, resources, blog/writing, and any backend/CMS are deliberately excluded from V1 to keep this build shippable. The positioning pillars (§1) and voice rules (§2) are written to extend cleanly into that phase — nothing here needs rework when it starts.
