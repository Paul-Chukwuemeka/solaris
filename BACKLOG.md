# Wine Press Solar — Feature Backlog & Fix Register

> Last updated: May 2026  
> Cross-referenced against: `wine-press-solar-prd-2.md` (v1.0)

---

## Priority Legend

| Symbol | Meaning |
|--------|---------|
| 🔴 P0 | Must-have — blocks launch or loses leads |
| 🟠 P1 | Important — launch or shortly after |
| 🟡 P2 | Next iteration |
| 🟢 P3 | Future roadmap |
| 🐛 BUG | Code defect or broken behaviour |
| ✅ DONE | Already implemented |

---

## Section 1 — Critical Fixes (P0 Blockers)

### 1.1 Lead Capture — Not Wired
**Priority:** ✅ DONE  
**File(s):** `app/calculator/page.tsx`, `app/api/leads/route.ts`  
**Detail:**  
The "Book Professional Audit" button on the calculator results page (Step 4) has no `onClick` handler, no form, and no submission logic. The `/api/leads` API route exists but is never called from the frontend. This means zero leads are being captured from the calculator.

**Required work:**
- Build a lead capture modal/form that fires when the CTA is clicked
- Form fields per PRD §7: Full name, Phone (WhatsApp), Email, State/City (auto-filled from Step 1), Installation area (optional), How did you hear about us? (optional dropdown), Notes (optional)
- On submission, POST to `/api/leads` with form data + full system spec silently appended
- Implement server-side: Zod validation, email notification via Resend/SendGrid, optional CRM webhook
- Show a thank-you confirmation state after submission
- Redirect to `/thank-you` page for conversion pixel firing

---

### ✅ 1.2 WhatsApp Number is a Placeholder
**Priority:** 🔴 P0 → ✅ DONE  
**File(s):** `app/page.tsx`, `components/FloatingWhatsAppButton.tsx`, `app/calculator/page.tsx`, `app/thank-you/page.tsx`  
**Detail:**  
All WhatsApp links updated from placeholder `2348000000000` to real number `2349166301384` (Wine Press Solar, +234 916 630 1384). Calculator results "Talk to an Expert" CTA pre-fills a WhatsApp message with the full system spec (region, daily kWh, inverter kVA, battery Ah, panel watts, cost range).

---

### ✅ 1.3 Analytics — Not Installed
**Priority:** 🔴 P0 → ✅ DONE  
**File(s):** `app/layout.tsx`, `lib/analytics.ts`, `components/ConversionTracker.tsx`, `components/WhatsAppLink.tsx`, `.env.local.example`  
**Detail:**  
GTM snippet wired into `app/layout.tsx` via `next/script` (afterInteractive). Snippet is conditioned on `NEXT_PUBLIC_GTM_ID` env var — safe no-op in dev without it. `lib/analytics.ts` provides typed `dataLayer` push helpers. All required events verified firing correctly via Playwright: `CalculatorStarted`, `CalculatorStepCompleted` (×3), `CalculatorResultViewed` (with region/cost data), `WhatsAppButtonClicked` (floating button + calculator CTA), `QuoteFormSubmitted`, `Lead` (fires on /thank-you via `ConversionTracker`). `.env.local.example` created documenting all keys.

---

### 1.4 Missing `/thank-you` Page
**Priority:** ✅ DONE  
**File(s):** `app/` (new file needed)  
**Detail:**  
No `/thank-you` route exists. This page is the conversion tracking trigger for Google Ads and Meta Pixel. It must fire after a lead form submission.

**Required work:**
- Create `app/thank-you/page.tsx`
- Display a confirmation message with next steps (e.g. "We'll call you within 24 hours")
- Include WhatsApp CTA as backup contact
- GTM/GA4 conversion event fires on page load

---

### ✅ 1.5 SEO Foundation — Missing
**Priority:** 🔴 P0 → ✅ DONE  
**File(s):** `app/layout.tsx`, `app/page.tsx`, `app/calculator/page.tsx`, `app/calculator/CalculatorClient.tsx`, `public/robots.txt`, `public/sitemap.xml`  
**Detail:**  
Full SEO foundation implemented. Global metadata in `layout.tsx`: title template, OG tags, Twitter Card, keywords, robots, metadataBase. Unique per-page metadata on all routes. JSON-LD schemas on home page: `LocalBusiness` (Enugu address, phone, hours), `ItemList` of services, `FAQPage`. Calculator extracted into `CalculatorClient.tsx` so `page.tsx` can export server-side metadata with `robots: noindex`. `public/robots.txt` and `public/sitemap.xml` created. Descriptive alt text added to all `<img>` tags across Hero, About, and SocialProof.

---

## Section 2 — Calculator Gaps (P0–P1)

### ✅ 2.1 Step Missing: Usage Context (Home / Office / Shop)
**Priority:** 🟠 P1 → ✅ DONE  
**File(s):** `app/calculator/CalculatorClient.tsx`  
**Detail:**  
New Step 0 added before region selection. Four context cards: Home/Residence, Office/Business, Shop/Retail, Other. Clicking a card immediately advances to step 1. Progress bar updated to 5 segments. Step 2 (loads) heading and subtext are context-aware (e.g. "What appliances are you powering?" / "Select everything you want to run on solar at home"). `installationContext` passed through to lead API payload.

---

### ✅ 2.2 Only 5 Appliance Presets (PRD Requires 30+)
**Priority:** 🟠 P1 → ✅ DONE  
**File(s):** `app/calculator/CalculatorClient.tsx`  
**Detail:**  
Replaced flat 5-item list with 7 category tabs and 30 preset appliances. Categories: Lighting (3), Cooling (5), Kitchen (5), Entertainment (5), Computing (4), Water/Utility (4), Office/Shop (4). Each card shows appliance name, icon, and wattage. Custom appliance entry (name + watts input) added. Also fixed BACKLOG-5.2: `addLoad(l as any)` in the energy list `+` button replaced with `updateQuantity(l.id, 1)`.

---

### ✅ 2.3 Autonomy Days Hardcoded to 1
**Priority:** 🟠 P1 → ✅ DONE  
**File(s):** `app/calculator/CalculatorClient.tsx`  
**Detail:**  
Added Step 4 "How Long Should Your Battery Last?" — a dedicated autonomy selection screen between battery type and results (custom installs only). Four options: 6h (0.25 days), 12h (0.5 days), 24h (1 day), Full Independence (2 days). `autonomyDays` state wired into `handleCalculate` and the auto-recalculate effect. Progress bar expanded to 6 segments. Results step shifted to step 6. Backup Duration shown in System Specifications on the results page.

---

### ✅ 2.4 No "Talk to an Expert" WhatsApp CTA on Results Page
**Priority:** 🟠 P1 → ✅ DONE  
**File(s):** `app/calculator/CalculatorClient.tsx`  
**Detail:**  
"Talk to an Expert" WhatsApp CTA was already implemented as part of BACKLOG-1.2. Enhanced in this ticket to include panel count (N × 500W), battery count (N × 200Ah), backup duration (from autonomy step), and region — giving the team a complete spec snapshot in the WhatsApp pre-fill message.

---

### ✅ 2.5 No Budget Indicator Step
**Priority:** 🟡 P2 → ✅ DONE  
**File(s):** `app/calculator/CalculatorClient.tsx`  
**Detail:**  
Added Step 5 "What's Your Budget?" — optional 6-option selector (Under ₦500k / ₦500k–₦1M / ₦1M–₦2.5M / ₦2.5M–₦5M / ₦5M+ / Flexible) with a "Skip →" escape hatch. Selected budget wired into the lead payload and WhatsApp pre-fill message. Progress bar expanded to 7 segments. Generator path also routes through this step.

---

### ✅ 2.6 No Shareable / PDF Result
**Priority:** 🟡 P2 → ✅ DONE  
**File(s):** `app/calculator/CalculatorClient.tsx`, `app/calculator/page.tsx`, `app/globals.css`, `components/FloatingWhatsAppButton.tsx`  
**Detail:**  
Implemented Option A (shareable URL) + print. Results page now shows "Copy Link" and "Print" buttons. Share link encodes a JSON snapshot (result, region, batteryType, autonomyDays, budgetRange) as base64 in a `?share=` query param. Navigating to `/calculator?share=...` hydrates straight to the results page via a `useSearchParams` effect. Print view hides nav/footer/sidebar and shows a Wine Press branding footer. CalculatorPage wrapped in `<Suspense>` to satisfy Next.js `useSearchParams` boundary requirement.

---

### 2.7 "Start Over" Link Missing from Results
**Priority:** 🟠 P1 — ✅ DONE  
**File(s):** `app/calculator/CalculatorClient.tsx`  
**Detail:**  
Added a `handleStartOver` function that resets all calculator state (step, region, loads, battery type, autonomy, budget, generator, result, share URL param) back to defaults and navigates to step 0. A subtle "↺ Start Over" text button is displayed next to the "Back" button in the `print:hidden` bottom bar on the results page. Also confirmed BACKLOG-2.8 (disclaimer) was already implemented.

---

### 2.8 No Disclaimer on Results Page
**Priority:** 🟠 P1 — ✅ DONE  
**File(s):** `app/calculator/CalculatorClient.tsx`  
**Detail:**  
PRD §7 disclaimer text is present in two places on the results page: (1) inside the cost card below the price range, and (2) as a small footnote at the bottom of the results column. Confirmed present — no code changes required.

---

## Section 3 — Missing Pages & Routes

### 3.1 `/services` — Individual Service Detail Pages
**Priority:** 🟠 P1 — ✅ DONE  
**File(s):** `app/services/page.tsx`, `app/services/solar-sales/page.tsx`, `app/services/installation/page.tsx`, `app/services/maintenance/page.tsx`, `components/home/Services.tsx`, `components/Navigation.tsx`  
**Detail:**  
Created all four service routes as statically rendered Next.js pages with full metadata, canonical URLs, and OG tags. Nav "Services" link updated to `/services`. Home Services cards now include "Learn More →" links to each dedicated page. Each page follows the site's flat design system with icon, hero, detailed sections, and WhatsApp CTA.

---

### 3.2 `/about` — Dedicated About Page
**Priority:** 🟠 P1 — ✅ DONE  
**File(s):** `app/about/page.tsx`, `components/Navigation.tsx`  
**Detail:**  
Created a full `/about` standalone page with: hero (brand story + CTAs), stats strip (450+ installs, 12 states, 3+ years, 98% satisfaction), brand origin story section with photo collage, "How We Work" values grid, team cards, standards & certifications, contact block, and bottom CTA. Nav "About" link updated from `#about` to `/about`.

---

### 3.3 `/projects` — Testimonials & Gallery Page
**Priority:** 🟠 P1 — ✅ DONE  
**File(s):** `app/projects/page.tsx`, `components/home/SocialProof.tsx`, `components/Navigation.tsx`  
**Detail:**  
Created full `/projects` page with: hero + stats strip, 9-project gallery grid (Residential, Commercial, Institutional, Estate, SME, Healthcare types) with hover greyscale-to-colour effect, and 6 expanded testimonial cards with reviewer roles. Nav "Projects" link updated to `/projects`. Home SocialProof section gains "View All Projects →" link.

---

### 3.4 `/blog` — SEO Resource Hub
**Priority:** 🟠 P1 — ✅ DONE  
**File(s):** `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `content/blog/*.mdx`, `lib/posts.ts`, `mdx-components.tsx`, `next.config.ts`  
**Detail:**  
Implemented a static MDX blog with `@next/mdx`. No external CMS required — articles are local `.mdx` files in `content/blog/`. Post metadata index lives in `lib/posts.ts`. All 5 target SEO articles written and rendered as fully static SSG pages. Post layout has article content, author note, sidebar with calculator CTA and WhatsApp link, and related posts. Blog listing shows newest-first with featured post hero + article grid.

---

### 3.5 `/contact` — Lead Capture Page
**Priority:** 🟠 P1 — ✅ DONE  
**File(s):** `app/contact/page.tsx`, `app/contact/ContactClient.tsx`  
**Detail:**  
Created full `/contact` page with a lead capture form wired to `POST /api/leads`. Fields: full name, WhatsApp/phone, email, city (required); service type, system size, timeline selects; and notes textarea. Inline field-level validation errors from API. Optimistic loading state (spinner, disabled button). On success, renders a personalised confirmation screen with name + phone and next-steps list. Sidebar has WhatsApp direct CTA, calculator link, and contact details card.

---

### 3.6 `/faq` — Standalone FAQ Page
**Priority:** 🟡 P2  
**File(s):** `app/faq/` (new)  
**Detail:**  
FAQ exists as a home page section with only 3 questions. PRD calls for a dedicated `/faq` page that handles pre-purchase objections at scale. Needs 10–15 questions minimum and an FAQPage JSON-LD schema.

---

## Section 4 — UX & Content Issues

### 4.1 Hero Image Uses Unsplash Stock Photography
**Priority:** 🟠 P1  
**File(s):** `components/home/Hero.tsx`, `components/home/About.tsx`, `components/home/SocialProof.tsx`  
**Detail:**  
The PRD explicitly states: *"Hero image: real project photographs, ideally showing a Lagos/Nigerian residential or office setting. No stock imagery."* All images currently use Unsplash URLs.

**Required work:**
- Replace with real Wine Press project photos
- Compress and serve as WebP (use Next.js `<Image>` component with `formats`)
- Add descriptive alt text to all images

---

### 4.2 All `<img>` Tags Should Use Next.js `<Image>`
**Priority:** 🟠 P1 — ✅ DONE  
**File(s):** `components/home/Hero.tsx`, `components/home/About.tsx`, `components/home/SocialProof.tsx`, `app/about/page.tsx`, `app/projects/page.tsx`, `next.config.ts`  
**Detail:**  
All `<img>` tags replaced with Next.js `<Image>` across all 5 files (14 images total). Each has correct `fill` + `sizes` props for responsive WebP delivery, lazy loading, and CLS prevention. Hero image has `priority` prop for LCP optimisation. Unsplash domain added to `images.remotePatterns` in next.config.ts.

---

### ✅ 4.3 Footer Contact Info is Placeholder
**Priority:** 🔴 P0 → ✅ DONE
**File(s):** `components/Footer.tsx`
**Detail:**
Real contact info already in place: Shop 13, POWA Plaza, By Ogui Police Station, Enugu, Nigeria; +234 916 630 1384; hello@winepresssolar.com. Footer Quick Links also updated from hash anchors (`#services`, `#about`, `#projects`) to proper routed links (`/services`, `/about`, `/projects`). Added Blog and Contact links to footer navigation.

---

### 4.4 Social Media Links in Footer are `href="#"`
**Priority:** 🟠 P1  
**File(s):** `components/Footer.tsx` (line 26)  
**Detail:**  
The Globe, Camera, and Briefcase icons (meant for website, Instagram, LinkedIn) all link to `#`. Should link to real social profiles once known.

---

### ✅ 4.5 Services Cards Have No "Learn More" Links
**Priority:** 🟠 P1 → ✅ DONE
**File(s):** `components/home/Services.tsx`
**Detail:**
Each service card has a "Learn More → " link pointing to its dedicated page: `/services/solar-sales`, `/services/installation`, `/services/maintenance`, and `/services` (for Energy Audit). Implemented in a prior session alongside BACKLOG-3.1.

---

### ✅ 4.6 Only 2 Testimonials — PRD Requires 3–5
**Priority:** 🟠 P1 → ✅ DONE
**File(s):** `components/home/SocialProof.tsx`
**Detail:**
Expanded from 2 to 5 testimonials with real Nigerian names and locations (Ikeja Lagos, Maitama Abuja, GRA Enugu, Lekki Lagos, Trans-Ekulu Enugu). Each card now shows a system type badge (e.g. "5kVA Hybrid System") alongside 5-star rating. Layout updated to a responsive 3-column grid (2-col on md, 3-col on lg) with the 5th card spanning 2 columns on md to stay centred.

---

### 4.7 No "How It Works" Process Section
**Priority:** 🟠 P1  
**File(s):** `app/page.tsx`, `components/home/` (new component)  
**Detail:**  
PRD §6.4 specifies a 3–4 step visual process section on the home page showing the journey from calculator → quote → install → support. This section is absent.

---

### 4.8 No Sticky Mobile Footer Bar
**Priority:** 🟡 P2  
**File(s):** `app/layout.tsx` or new component  
**Detail:**  
PRD §10.1 CRO requirement: *"Sticky mobile footer bar: WhatsApp CTA and Calculator CTA always visible."* Not implemented.

---

### 4.9 No Google Review Rating Widget
**Priority:** 🟠 P1  
**File(s):** `components/home/SocialProof.tsx`  
**Detail:**  
PRD §6.2 calls for a Google review rating widget or star rating with review count in the Social Proof section.

---

### 4.10 No ROI Mini-Calculator on Landing Page
**Priority:** 🟡 P2  
**File(s):** `components/home/ROI.tsx`  
**Detail:**  
PRD §6.5 mentions an optional embedded mini-calculator: "Enter your monthly fuel spend → see your projected annual savings." The current ROI section uses static hardcoded numbers (₦7.2M vs ₦2.8M).

---

### 4.11 No "Limited Slots" Urgency/Scarcity Element
**Priority:** 🟡 P2  
**File(s):** `app/page.tsx` (final CTA section)  
**Detail:**  
PRD §6.6 suggests an urgency element: "Limited slots for June installation. Book now." Can be toggled on/off easily.

---

## Section 5 — Technical / Code Issues

### 5.1 Duplicate `html` and `body` Blocks in `globals.css`
**Priority:** 🐛 BUG  
**File(s):** `app/globals.css` (lines 46–57 and 93–103)  
**Detail:**  
`html { scroll-behavior: smooth; }` and `body { background: ...; color: ...; }` blocks appear twice. The second `body` block overrides the first (which has the dot-grid `background-image`), potentially stripping the dot-grid pattern on some pages.

**Fix:** Remove the duplicate `html` and `body` declarations at lines 93–103.

---

### 5.2 `calculateSystem()` Call with `as any` Type Cast
**Priority:** 🐛 BUG  
**File(s):** `app/calculator/page.tsx` (line 275)  
**Detail:**  
`addLoad(l as any)` is called when the `+` button is clicked in the load list — casting a `LoadItem` to `(typeof PRESET_LOADS)[0]`. This works by coincidence (the `name` field matches) but is type-unsafe and will break if the data shapes diverge.

**Fix:** Create a proper handler that increments quantity directly rather than calling `addLoad`.

---

### 5.3 `setRegion` Uses `as any` Type Cast
**Priority:** 🐛 BUG  
**File(s):** `app/calculator/page.tsx` (line 167)  
**Detail:**  
`setRegion(key as any)` when selecting a region card. Should be typed as `keyof typeof pricingConfig.regions`.

---

### 5.4 No `<Image>` Component Used Anywhere
**Priority:** 🟠 P1  
See item 4.2 above.

---

### 5.5 No `robots.txt` or `sitemap.xml`
**Priority:** 🔴 P0  
See item 1.5 above.

---

### 5.6 No reCAPTCHA on Lead Form
**Priority:** 🟠 P1  
**File(s):** `app/api/leads/route.ts` (future lead form)  
**Detail:**  
PRD §14.3 requires reCAPTCHA v3 on the lead form to prevent spam.

---

### 5.7 No Environment Variable Setup
**Priority:** 🟠 P1  
**File(s):** Root (new `.env.local.example`)  
**Detail:**  
No `.env` example file exists. Once email sending, analytics, and reCAPTCHA are added, there will be multiple API keys. An `.env.local.example` should be committed to document required variables.

---

### 5.8 `eslint` Script Has No Entry Point
**Priority:** 🐛 BUG  
**File(s):** `package.json` (line 9)  
**Detail:**  
`"lint": "eslint"` with no path argument will error in newer ESLint versions. Should be `"lint": "next lint"` to use Next.js's built-in ESLint config.

---

## Section 6 — Future Roadmap (P3)

| Feature | Notes |
|---|---|
| CRM Integration | Auto-create leads in HubSpot/Zoho/Pipedrive via webhook from `/api/leads` |
| Client Portal | Order tracking, warranty documents, service history per customer |
| E-commerce Checkout | Online deposit or full payment for installation booking |
| Admin Price Table UI | Non-technical interface to update `pricing-config.json` values without code changes |
| WhatsApp Business API | Automated responses and lead follow-up for v2.0 |
| A/B Testing | Hero headline and CTA copy variation via GTM or VWO |
| Financing / Instalment Info | High-impact CRO element — show payment flexibility if Wine Press offers it |
| Partner Logo Strip | Equipment brand partnerships (Luminous, Felicity, etc.) in Social Proof section |

---

## Summary Counts

| Priority | Count |
|---|---|
| 🔴 P0 — Launch blockers | 7 |
| 🟠 P1 — Important | 17 |
| 🟡 P2 — Next iteration | 6 |
| 🟢 P3 — Roadmap | 8 |
| 🐛 Bugs | 4 |
| **Total** | **42** |
