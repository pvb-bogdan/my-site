# UX / UI Improvement Plan — petrebogdan.com

**Branch:** `dev-ux-polish` (create from `master`)
**Stack:** Nuxt 3 · Vue 3.5 · Tailwind 3 · @nuxtjs/i18n · @nuxt/image · @nuxtjs/seo
**Reviewed:** 2026-11-03, in the dev server at 1024px desktop and 375px mobile, light and dark.

The site already has a good base: a clear section flow, semantic tokens for dark mode, focus rings,
reduced-motion CSS, i18n and lazy images. The work below fixes real bugs I reproduced in the
browser, then raises accessibility and mobile UX, then adds polish. Each phase can ship as its own
commit.

---

## Phase 1 — Bugs (reproduced)

### 1.1 Theme flash on every load (FOUC)
- **What happens:** the server renders the light theme, then `useTheme()` adds `.dark` in
  `onMounted`. Every visit flashes white, then turns dark (screenshot taken ~1s after load showed the
  light hero).
- **Fix:**
  - Add a small inline blocking script in `nuxt.config.ts` → `app.head.script` (with
    `tagPosition: 'head'`). It reads `localStorage.theme`, falls back to
    `matchMedia('(prefers-color-scheme: dark)')`, and sets `document.documentElement.classList`
    before first paint.
  - Simplify `composables/useTheme.ts` so it reads the current class instead of forcing
    `isDark = true` by default. Respect the OS preference when nothing is saved.
  - Add `<meta name="color-scheme" content="light dark">` and set `color-scheme` on `html` / `html.dark`
    so scrollbars and form controls match the theme.

### 1.2 Project modal leaks its Escape listener
- `components/ProjectModal.vue`: the `watch` callback returns a cleanup function. Vue ignores that
  return value, so every open adds a `keydown` listener that is never removed.
- **Fix:** use `onWatcherCleanup` (Vue 3.5) or keep the handler at module scope and add/remove it
  explicitly. Also clean up on `onBeforeUnmount`.

### 1.3 Invalid HTML in Contact: `<a>` inside `<button>`
- `components/ContactSection.vue`: once revealed, the phone and email `tel:`/`mailto:` links sit
  inside a `<button>`. That's invalid nesting, gives unpredictable click and keyboard behavior, and
  screen readers announce it badly.
- **Fix:** render a `<button>` while hidden and swap it for a full-card `<a>` once revealed (one
  interactive element at a time). Left-align the text: it's currently centered in Phone/Email and
  left-aligned in WhatsApp. Move focus to the new link after reveal. Remove the artificial 300 ms
  `setTimeout` or show a short loading state.

### 1.4 Desktop nav collides with the language switch at 1024px
- At 1024px wide, the "Contact" pill overlaps the RO/EN group by 5px (measured).
- **Fix:** show the full centered nav only from `xl` (1280px) and use the hamburger below that, or
  reduce link padding (`px-4`) between `lg` and `xl`. Check at 1024, 1180 and 1280.

### 1.5 `error.vue` uses animation classes that don't exist there
- `animate-blob-move-1…5`, `animate-fade-in-up`, `animate-float-*` and `animation-delay-*` are
  defined in **scoped** styles inside `HeroSection.vue`, so the 404 page gets none of them.
- **Fix:** move these keyframes and utilities into `tailwind.config.js` (`theme.extend.animation` /
  `keyframes`) or into `assets/css/tailwind.css`, and delete the duplicates. `z-1` and `-z-1` are not
  Tailwind defaults either: use `z-10` and `-z-10`, or add them to the config.

### 1.6 Missing OG image
- `nuxt.config.ts` points `og:image` at `/og-image.png`, which returns **404**. Add a 1200×630
  image to `public/` or generate one with `nuxt-og-image` (included in `@nuxtjs/seo`). The global
  `og:url` is also hard-coded to the root. Let `@nuxtjs/seo` produce the canonical URL and og:url per
  locale.

---

## Phase 2 — Accessibility (WCAG 2.2 AA)

### 2.1 Project modal becomes a real dialog
- Add `role="dialog"`, `aria-modal="true"` and `aria-labelledby` pointing at the project title.
- When it opens, move focus to the close button. Trap Tab inside the dialog. When it closes, return
  focus to the card that opened it. Right now focus stays on `<body>`.
- Close button: add `type="button"` and a visible focus ring. Carousel prev/next and dots: add
  `type="button"` and `aria-current` on the active dot. Dots are 8px tall, so give them a ≥24px hit
  area with padding.
- Support the ←/→ keys for the image carousel while the modal is open.
- Remove the scoped `* { scrollbar-width: none }` rule. It hides the vertical scrollbar of the whole
  modal, so users can't tell how long the page is.

### 2.2 Portfolio cards are not keyboard-accessible
- Cards are `<div @click>`: you can't Tab to them and Enter does nothing.
- **Fix:** make each card a `<button type="button">`, or an `<a>` if deep links are added (see
  3.3). Give it a visible focus ring, and show the hover overlay on `:focus-visible` too.
- Filter buttons (desktop and the mobile sticky bar): add `aria-pressed` and wrap them in
  `role="group"` with an `aria-label`. The mobile bar's icons need visible text labels or a tooltip
  (see 3.2).

### 2.3 Landmarks, skip link, heading order
- Wrap the sections in `<main id="main">` in `pages/index.vue`.
- Add a "Skip to content" link as the first focusable element, visible on focus (both locales).
- Footer uses an `<h4>` for a greeting sentence. Make it a `<p>`.
- Add `aria-labelledby` on each `<section>` pointing at its `<h2>`.

### 2.4 Language switch and theme toggle state
- RO/EN buttons: add `aria-pressed` (or `aria-current="true"`) and `lang` attributes on the labels.
- Theme toggle: add `aria-pressed` bound to `isDark`. The label should describe the action it will
  take ("Switch to light mode").
- Mark the decorative SVGs (sun/moon, service icons, decorative shapes) `aria-hidden="true"`
  wherever that's missing.

### 2.5 Contrast
- Footer copyright: `text-gray-400` on `bg-gray-100` is about 2.5:1, which fails. Use `text-gray-600` /
  `dark:text-gray-400` on `dark:bg-gray-800`, and check it.
- 404 page "error code" label: `text-gray-300` on a light background fails. Use
  `text-gray-500 dark:text-gray-400`.
- Swipe hints (`text-gray-400`) fail in light mode. Use `text-gray-600`.
- Hero active nav pill: white text on a `blue-700 → cyan-500` gradient drops below 4.5:1 at the
  cyan end. End the gradient at `sky-600`, or use a solid `blue-600`.

### 2.6 Touch targets (measured at 375px)
- Logo link 29×32, RO/EN buttons 41×32, theme toggle 36×36, menu 40×40, testimonial dots 16×16.
  Bring them all to **≥44×44** (padding or `min-h-11 min-w-11`). For the dots, keep the 16px
  visual and add an invisible hit area.

### 2.7 Images and alt text
- Hero image `alt="Device Mockup"` is wrong. Use "Illustrated portrait of Bogdan Petre" (translated).
- About image `alt="Avatar"`. Use "Photo of Bogdan Petre".
- Contact illustration: decorative, so use `alt=""`.
- Project modal images all use the project title as alt. Add "— image N of M".

### 2.8 Reduced motion
- `scroll-behavior: smooth` and `scrollIntoView({ behavior: 'smooth' })` ignore
  `prefers-reduced-motion`. Wrap the CSS rule in `@media (prefers-reduced-motion: no-preference)`
  and pass `behavior: 'auto'` from JS when the user asks for reduced motion.

---

## Phase 3 — Mobile and UX improvements

### 3.1 Project info is hover-only: invisible on touch
- On mobile the portfolio grid shows only images. Title, description and tags appear only on hover,
  which never happens on touch screens.
- **Fix:** always show a caption under each card (title plus one category or tag line). Keep the
  richer hover overlay for `@media (hover: hover)` only.

### 3.2 Sticky segmented filter (replaces both the desktop buttons and the mobile icon bar)
**Decision:** the filters stay in view while the user scrolls through the portfolio, on every
screen size, as a single component.

- **One component, `<PortfolioFilter />`**, an Apple-style *segmented control*. It's a translucent
  pill holding **icon + text label** segments (All · Web Design · Magazines · Graphics), with the
  project count in each segment ("Web Design 4").
- **Placement:** use `position: sticky` inside `#portfolio`, with
  `top: calc(var(--header-height) + 0.5rem)`. Because it's sticky *within the section*, it appears
  when the grid scrolls in and leaves with the section, so it never covers Testimonials or Contact.
  Expose the header height as a CSS variable from `HeaderNav` (72px mobile, pill height desktop).
- **Selected indicator:** a single absolutely positioned "thumb" that slides under the active
  segment with `transform: translateX()` plus width (measure with `getBoundingClientRect`, like the
  existing nav bubble). Use a critically damped curve (no bounce), about 300 ms,
  `cubic-bezier(0.25, 1, 0.5, 1)`. Under reduced motion, cross-fade instead of sliding.
- **Material:** `bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl saturate-150`, a 1px light top edge
  (`border-white/40`), and a soft shadow. Don't put it on top of another glass layer; it sits over
  the grid, not over the header. Fallback: `@media (prefers-reduced-transparency: reduce)` → solid
  background, no blur.
- **Mobile (<640px):** labels stay visible. If the four segments don't fit, the pill scrolls
  horizontally (`overflow-x-auto`, `scroll-snap`) with a fade mask on the edge that has hidden
  content, and the active segment is scrolled into view. Each segment is ≥44px tall.
- **Behavior when changing a filter:** if the grid's top is above the viewport, scroll it back so it
  sits just under the sticky filter (`scrollIntoView` with `scroll-margin-top`), so the user sees the
  new results from the start. Use `behavior: 'auto'` under reduced motion.
- **Semantics:** `role="radiogroup"` with an `aria-label`, each segment `role="radio"` +
  `aria-checked`, ←/→ keys move the selection (roving `tabindex`). Announce the result count in an
  `aria-live="polite"` region ("4 projects").
- **"Show more"** moves out of the sticky bar and becomes a normal button under the grid, the same
  on mobile and desktop. Delete the old `md:hidden` sticky icon bar and the separate desktop button
  row.

### 3.3 Deep-linkable projects
- Sync the open project to the URL (`?project=wedeco-catalog`) so projects can be shared, and so
  the browser Back button closes the modal instead of leaving the site. Requires adding a stable
  `id`/`slug` to each project in `data/projects.json`.
- This also replaces the fragile `projectLocaleKeyOrder` array in `PortfolioSection.vue`, which
  matches translations to projects by **image path and array index**. Key the translations by
  `slug` instead.

### 3.4 About section: bio + "How I work" + tools strip (decided: options B + C)
**Context:** the owner spent 15 years at a company and is now starting as a freelancer. There are
few client projects to count, so the section must **not** show project or client counters. It sells
experience, process and tools instead. Remove the percentage skill bars entirely.

Layout, top to bottom, inside the existing `#about` section:

1. **Bio row** (keep the current 2-column grid)
   - Photo on the left (full colour, see 3.5), text on the right, limited to `max-w-prose`.
   - **Eyebrow line** above the heading: a small status dot plus "Available for freelance
     projects" (i18n key `about.availability`). The green dot is decorative; the text carries the
     meaning.
   - Bio rewritten in 2 short paragraphs (owner supplies the copy). Lead with experience rather than
     numbers, e.g. "15 years designing for print and web inside a busy agency/company — now
     working directly with clients."
   - One honest **experience fact** as styled inline text, not a counter tile, e.g. **15+ years** in
     a large tabular number with "of design & frontend experience" next to it. This is the only
     number on the section.
   - Buttons: LinkedIn (existing) plus an optional secondary "Download CV" (only if the owner provides a
     PDF in `public/`).

2. **"How I work"** (option B), heading `about.processTitle`
   - Four steps in a grid: 4 columns on `lg`, 2 on `md`, and a vertical list on mobile with a thin
     connecting line between the numbers.
   - Each step: a number (`01`–`04`, tabular, muted), a Lucide icon, a title and one sentence.
     Proposed steps (owner to adjust the copy, RO + EN in `locales/*.json` → `about.process[]`):
     | # | Icon | Title | Sentence |
     |---|---|---|---|
     | 01 | `lucide:messages-square` | Discover | We talk about your goals, audience and what success looks like. |
     | 02 | `lucide:pen-tool` | Design | Wireframes and visual design in Figma, reviewed together before any code. |
     | 03 | `lucide:code-xml` | Build | A fast, responsive site in Vue/Nuxt, or print-ready files for print work. |
     | 04 | `lucide:rocket` | Launch & support | Go live, hand over, and stay available for changes. |
   - Static cards in the same style as Services (no hover lift, no `cursor-pointer`). An optional,
     subtle fade-up on scroll into view (once, 30 ms stagger), turned off under reduced motion.

3. **Tools strip** (option C), heading `about.toolsTitle` ("Tools I use every day")
   - A single wrapping row of **real brand logos** from Simple Icons (see 3.9): Figma, Adobe
     (Photoshop / Illustrator / InDesign as separate marks if wanted), HTML5, CSS, JavaScript,
     Tailwind, Bootstrap, Vue, Nuxt, Git.
   - Monochrome (`text-gray-500 dark:text-gray-400`) at 28–32px, with the **name always visible** as
     small text under each logo (no hover-only information). Optional: brand colour on hover and focus
     only for devices with `@media (hover: hover)`.
   - Group the logos visually with small labels *Design · Frontend · Tooling*, or as one row if that
     looks cleaner. Implementer decides by eye.
   - Use a semantic `<ul>` list; logos are `aria-hidden` and the visible name is the label.

Data: move the tools into `portfolio.json` → `technologies: [{ name, icon: "simple-icons:figma",
group: "design" }]`, and drop the `level` field.

### 3.5 About avatar stays grayscale on touch
- Colour shows only on hover, so mobile users only ever see grayscale. Either show it in full
  colour, or switch to colour when the image scrolls into view (IntersectionObserver), with a
  reduced-motion check.

### 3.6 Testimonials carousel
- Add prev/next arrow buttons on desktop, in addition to the dots.
- Replace the "← swipe →" text hint with a peek of the next card (`w-[85%]` on mobile).
- Dots: replace `aria-pressed` with `aria-current`, and give the track `role="region"`,
  `aria-roledescription="carousel"` and an `aria-label`.

### 3.7 Hero
- LCP: `<h1>` and the paragraph start at `opacity: 0` with animation delays, which pushes back the
  Largest Contentful Paint. Remove the delay and fade on the `<h1>` (or animate transform only).
- Mobile: the hero portrait is hidden below `md`. Show a smaller version (for example 160px, above or
  beside the heading) so the page still has a face on mobile, and keep `fetchpriority` only on the
  version that's visible.
- The "Scroll" indicator has `md-flex` (a typo) next to `md:flex`. Remove the dead class.

### 3.8 Copy fixes
- EN footer: "Wishing you a wonderful Tuesday !" has a stray space before "!". Fix it in
  `pages/index.vue` / `locales/en.json`.
- The hero title says "UI/UX Designer" while the SEO title says "Web Designer & Frontend Developer".
  Pick one positioning and use it in the hero, `<title>`, OG tags and `portfolio.json`.
- **Freelance positioning** (the owner is starting freelance):
  - Hero subtitle should say who you help and with what, e.g. "Web & print designer helping small
    businesses look professional online and on paper". The owner writes the final copy.
  - The primary CTA stays "View work". Make the secondary CTA action-oriented: "Start a project" /
    "Hai să discutăm", linking to `#contact`.
  - Contact intro: say what to send ("Tell me about your business, what you need and your
    timeline"), and add an expected reply time ("I reply within 24 hours").
  - The 2–3 extra projects the owner has will be added to `data/projects.json` (with slugs, see 3.3)
    when the assets are ready. This is not part of this branch unless the assets are supplied.

### 3.9 Replace the hand-made icons with an icon library (Iconify via `@nuxt/icon`)
- **Why:** `components/icons/` holds about 35 hand-copied SVG components. The UI icons are an old
  Heroicons v1 outline style, and the `icons/tech/*` "logos" are hand-drawn approximations that don't
  look like the real brands.
- **Choice:** use **`@nuxt/icon`** (the official Nuxt module for Iconify). It gives access to every
  icon set, Font Awesome included, so we're not locked in. Use **one** UI set for a consistent stroke:
  - UI icons: **Lucide** (`@iconify-json/lucide`), a clean 2px outline style close to the current one.
  - Brand logos (tech + social): **Simple Icons** (`@iconify-json/simple-icons`), accurate
    monochrome brand marks that take `currentColor`.
  - Avoid Font Awesome as the main set: its free solid icons don't match the outline style, and the
    brand logos are covered by Simple Icons.
- **Performance:** install the JSON sets locally and configure
  `icon: { serverBundle: 'local', clientBundle: { scan: true } }` so icons are bundled and rendered
  as inline SVG, without runtime requests to the Iconify API.
- **Mapping (implementer to confirm visually):**
  | Current | New |
  |---|---|
  | `Uiux`, `Print`, `Identity`, `Performance` | `lucide:monitor-smartphone`, `lucide:printer`, `lucide:fingerprint` / `lucide:pen-tool`, `lucide:gauge` |
  | `AllIcon`, `WebDesignIcon`, `MagazinesIcon`, `GraphicsIcon`, `ShowMoreIcon` | `lucide:layout-grid`, `lucide:monitor`, `lucide:book-open`, `lucide:palette`, `lucide:plus` |
  | `Phone`, `Email`, `Eye`, `Whatsapp` | `lucide:phone`, `lucide:mail`, `lucide:eye`, `simple-icons:whatsapp` |
  | `Instagram`, `Facebook`, `Linkedin` | `simple-icons:instagram`, `simple-icons:facebook`, `simple-icons:linkedin` |
  | `tech/*` | `simple-icons:html5`, `css`, `bootstrap`, `tailwindcss`, `javascript`, `vuedotjs`, `nuxt`, `git`, `figma`, `adobe…` (Adobe CC: `simple-icons:adobe`); `Responsive` → `lucide:smartphone` |
  | Inline header SVGs (sun, moon, menu, close), modal arrows, GitHub, external link | `lucide:sun`, `lucide:moon`, `lucide:menu`, `lucide:x`, `lucide:chevron-left/right`, `simple-icons:github`, `lucide:external-link` |
- Store the icon names in data (`portfolio.json` → `"icon": "lucide:printer"`) instead of the
  `iconMap` / `techIconMap` objects, and render `<Icon :name="service.icon" />`.
- **Keep custom:** the decorative background shapes (`DotGrid`, `Triangle`, `CircleRings`,
  `CrossPlus`, `Squares`, `DiagonalLines`) aren't icons. Move them to `components/decor/`.
- Use a fixed set of icon sizes (16 / 20 / 24px) and mark decorative icons `aria-hidden`.
- Delete the unused icon components after migrating.

---

## Phase 5 — Apple-style polish (from the `apple-design` guidance)

Fit these to a portfolio. The goal is calm and confident, not flashy.

### 5.1 Response and press feedback
- Give every interactive element instant feedback on **press**, not only on hover: `:active { transform:
  scale(0.97) }` with a ~100 ms ease-out. That includes links styled as buttons, project cards and
  segments. Today the global rule covers only `<button>`.
- Remove `hover:scale-105` from the CTAs, project cards and modal buttons. Growing on hover feels
  jumpy and makes the layout shimmer. Use a quiet hover (shadow or background shift), and keep the
  scale for press.
- Remove the artificial 300 ms reveal delay in Contact (1.3). Latency on the input path is a regression.

### 5.2 Spatial continuity: the project opens from its card
- The project view should **grow out of the clicked card and shrink back into it** when closed,
  instead of a full-screen fade. Use the **View Transitions API** (`document.startViewTransition`)
  with a shared `view-transition-name` on the card image and the modal hero image. Fall back to the
  current fade where it's unsupported, and under reduced motion.
- Enter and exit along the same path. Esc, the close button and browser Back (3.3) all use the same
  reverse transition.
- Consider a **sheet** instead of a full page on desktop: a large rounded panel (`max-w-5xl`) over a
  dimming scrim, with the page scaled back slightly (`scale(0.98)`). That signals "modal task, the
  page is still behind". On mobile, keep it full-screen.

### 5.3 Materials and depth
- Header: keep the glass pill. Replace its hard `border-b` with a **scroll edge effect**, a soft
  gradient or blur fade under the bar, shown only once content scrolls beneath it.
- Never stack light glass on light glass. The sticky filter (3.2) and the header both blur, so keep
  ≥8px between them, and give the filter a slightly heavier material than the content but lighter
  than the header.
- Add `@media (prefers-reduced-transparency: reduce)` → solid backgrounds for the header, filter and
  social card. Add `@media (prefers-contrast: more)` → solid surfaces with defined borders.

### 5.4 Typography
- Tracking that depends on size: h1 and h2 get `tracking-tight` (−0.02em) and `leading-[1.05]`, h3
  gets −0.01em, and body text stays at 0. Add `text-wrap: balance` on headings and `text-wrap: pretty`
  on paragraphs.
- Limit body text to `max-w-prose` (about 65ch). The About bio currently runs wide on desktop.
- Use `font-variant-numeric: tabular-nums` for the highlight numbers (3.4) and counters
  ("3 / 7", filter counts).

### 5.5 Motion restraint
- Hero blobs: the guidance warns against slow looping full-viewport motion. Keep the blobs but
  make them **static**, or limit them to one very slow, low-amplitude drift. Stop them completely under
  reduced motion and when the hero is offscreen (`animation-play-state` via IntersectionObserver).
- Floating shapes beside the portrait: keep one at most.
- Theme switch: cross-fade light ↔ dark with a ~250 ms View Transition instead of a hard brightness
  jump. Under reduced motion, switch instantly.
- Portfolio grid filter change: cross-fade and FLIP-move the cards (`TransitionGroup` already does
  the move). Shorten the stagger to 30 ms per card, cap it at 6 cards, and make exits faster than
  entrances (~60%).
- Use one set of motion tokens for the whole site in CSS variables: `--ease-out: cubic-bezier(0.25,1,0.5,1)`,
  `--dur-fast: 150ms`, `--dur-base: 250ms`, `--dur-slow: 400ms`. Replace the ad-hoc 200/300/500/700 ms values.

### 5.6 Wayfinding
- The active section in the nav already works. Make "Home" the logo only and drop it from the nav, so
  every nav item names real content (Services · About · Work · Testimonials · Contact). This also
  frees space for 1.4.

---

## Phase 4 — Code health (supports the above)

- Delete the duplicate 404 blob markup in `error.vue`. Extract `<HeroBackground />` and reuse it.
- Extract a `useCarousel()` composable: `ProjectModal` and `TestimonialsSection` duplicate the same
  `scrollToSlide` / `onScroll` logic. Throttle `onScroll` with `requestAnimationFrame`.
- Extract `<ThemeToggle />` and `<LocaleSwitch />`: they're duplicated for desktop and mobile in
  `HeaderNav.vue`.
- Mark the `window` scroll listener in `pages/index.vue` as `{ passive: true }`.
- Delete the ignored scratch files locally (`* copy.vue`, `PortfolioSectionCopy.vue.vue`,
  `data/portfolio copy.json`). Nuxt auto-imports `components/`, so they can still be registered.
- Remove the unused `navLinks`, `title` and `description` copy in `data/portfolio.json` that i18n has
  replaced.

---

## Out of scope (ideas to discuss, not for this branch)
- A contact form (with a provider such as Formspree or Web3Forms), as an alternative to click-to-reveal.
- Per-project case-study pages (`/projects/[slug]`) for SEO, instead of the modal.
- JSON-LD `Person` + `CreativeWork` schema (see the `ai-optimization` skill).

---

## Verification checklist for the implementer
- [ ] `npm run build` passes with no new warnings.
- [ ] Hard reload in dark and light mode shows **no theme flash**, and a first visit with no saved
      theme follows the OS setting.
- [ ] Keyboard only: skip link → nav → filters → open a project with Enter → Tab stays inside the
      modal → Esc closes it and focus returns to the card.
- [ ] Open and close the modal 5 times, then confirm only one `keydown` listener exists (DevTools
      → Event Listeners).
- [ ] At 375px: no horizontal scroll, every tap target ≥44px, project titles visible without hover.
- [ ] At 1024px: no nav overlap. Also check 1280px and 1440px.
- [ ] With "Reduce motion" turned on in the OS: no smooth scroll, and no looping blob or float animations.
- [ ] Lighthouse accessibility score ≥ 95 in both locales. Run axe DevTools and fix any contrast
      issues it reports.
- [ ] `/og-image.png` returns 200 and the share preview renders.
- [ ] RO and EN both work, including the new strings (skip link, alt texts, theme-toggle labels).
- [ ] Portfolio filter stays visible while scrolling the grid at 375 / 768 / 1280px, never covers
      Testimonials or Contact, and can be driven with ←/→ keys.
- [ ] No hand-made icon components are left except the decorative shapes, and no network requests
      go to `api.iconify.design`.
- [ ] Opening a project grows it from the card and closing returns it to the same card
      (Chrome/Safari). The fallback fade works in Firefox and under reduced motion.
- [ ] With "Reduce transparency" turned on: header, filter and social card are solid.
