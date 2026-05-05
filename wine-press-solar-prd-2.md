☀

**WINE PRESS SOLAR SERVICES**

Web Application

*Product Requirements Document · v1.0*

  -------------------------- --------------------------------------------
  **Document Owner**         Wine Press Solar Services

  **Version**                1.0 --- Initial Release

  **Date**                   April 2026

  **Status**                 Draft --- Awaiting Stakeholder Sign-off
  -------------------------- --------------------------------------------

**1. Executive Summary**

Wine Press Solar Services is a Nigerian solar energy company offering
end-to-end services across sales, installation, and maintenance of
residential and commercial solar systems. This document defines the
requirements for the company\'s first web application --- a
conversion-optimised, SEO-maximised platform whose flagship feature is
an interactive solar setup calculator that guides potential clients
through selecting their appliances and receiving a tailored equipment
recommendation and cost estimate.

The web application serves two core business goals simultaneously:

-   Generate and convert high-intent leads arriving from paid
    advertising (Meta and Google Ads) and organic search.

-   Reduce the sales cycle by equipping prospects with enough
    information and confidence to request a quote or consultation
    without requiring a prior phone call.

This version (v1.0) focuses exclusively on the public-facing marketing
site and the Solar Setup Calculator. Subsequent versions may introduce a
client portal, CRM integration, and a full e-commerce checkout.

**2. Problem Statement & Opportunity**

**2.1 The Problem**

Most Nigerian solar buyers face three friction points before making a
purchase decision:

1.  **Information asymmetry.**

Customers don\'t know what size system they need, so they feel exposed
and hesitant to engage a vendor without prior knowledge. This creates
inertia.

2.  **Opaque pricing.**

Solar installers rarely publish indicative prices online. Customers must
call, wait, and trust --- a high-friction process that drives comparison
shopping and abandoned leads.

3.  **Distrust of vendor recommendations.**

Because buyers feel uninformed, any vendor recommendation is suspected
of being inflated or self-serving. This extends sales cycles and
increases price sensitivity.

**2.2 The Opportunity**

A self-service, interactive calculator that walks a customer through
their own household appliances --- at their own pace, on their own
device --- removes all three friction points. The customer arrives at a
recommendation they co-created, which they trust, and which is already
associated with Wine Press Solar Services. By the time they submit a
lead, they are warm, informed, and psychologically committed.

Paired with a landing page built for paid and organic traffic, this
creates a full-funnel digital asset that compounds over time.

**3. Goals & Success Metrics**

  -----------------------------------------------------------------------
  **Goal**                   **Key Metric (KPI)**       **90-Day Target**
  -------------------------- -------------------------- -----------------
  Maximise ad traffic → lead Calculator                 **≥ 35%**
  conversion                 start-to-lead-submit rate  

  Maximise organic           Organic sessions from      **+40% MoM for 3
  visibility                 Google (SEO)               months
                                                        post-launch**

  Reduce sales cycle length  Avg. days from lead to     **\< 24 hours**
                             quote sent                 

  Qualify leads              \% of leads with complete  **≥ 70%**
  automatically              system spec                

  Establish brand trust      Average session duration   **≥ 3 minutes**
                             (calculator)               

  Generate review/referral   WhatsApp shares of         **Track and
  signals                    calculator results         report**
  -----------------------------------------------------------------------

**4. Target Users & Personas**

**4.1 Primary Personas**

**Persona A --- The Tired Homeowner**

  --------------- -------------------------------------------------------
  **Who they      Middle-income homeowner or tenant in a Nigerian city
  are**           (Lagos, Abuja, PH, Ibadan). Spends
                  ₦30,000--₦80,000/month on diesel or petrol generator
                  fuel.

  **Their goal**  Eliminate or drastically reduce their generator costs.
                  They want a system that reliably powers essential
                  appliances.

  **Their fear**  Being sold the wrong (usually too small) system that
                  doesn\'t meet their needs, or being overcharged.

  **How they find Meta/Instagram ads, word of mouth, Google search:
  us**            \"solar installation Lagos price\".

  **Key insight** They need to feel in control of the process. The
                  calculator hands them that control.
  --------------- -------------------------------------------------------

**Persona B --- The SME Owner / Office Manager**

  --------------- -------------------------------------------------------
  **Who they      Owner or manager of a small business --- salon,
  are**           pharmacy, shop, office --- that loses revenue during
                  power cuts.

  **Their goal**  Keep operations running without generator noise and
                  cost. Needs to power specific commercial appliances.

  **Their fear**  Downtime during installation, high upfront cost without
                  clear ROI.

  **How they find Google search (\"solar for office Lagos\"), Google Ads,
  us**            referral from another business owner.

  **Key insight** Respond to ROI framing. A cost comparison (generator
                  cost vs. solar amortised) builds the business case.
  --------------- -------------------------------------------------------

**Persona C --- The Diaspora Buyer**

  --------------- -------------------------------------------------------
  **Who they      Nigerian living abroad, purchasing a solar installation
  are**           for family at home in Nigeria.

  **Their goal**  Install a reliable system without being physically
                  present. Needs to trust the vendor completely.

  **Their fear**  Being scammed remotely. Poor installation quality they
                  can\'t oversee personally.

  **How they find Instagram and Facebook ads, Google search, family
  us**            recommendation.

  **Key insight** Trust signals (testimonials, photos, certifications)
                  are critical. WhatsApp contact is preferred.
  --------------- -------------------------------------------------------

**5. Information Architecture & Site Map**

The application is a single web domain with the following top-level
structure:

  -----------------------------------------------------------------------
  **Page /         **Purpose**                        **URL Slug**
  Section**                                           
  ---------------- ---------------------------------- -------------------
  **Landing / Home Primary conversion surface;        /
  Page**           receives all paid and organic      
                   traffic                            

  **Solar          Interactive setup tool --- core    /calculator
  Calculator**     v1.0 feature                       

  **Services**     Detail pages for Sales,            /services
                   Installation, Repairs              

  **About Us**     Brand story, team, certifications, /about
                   social proof                       

  **Testimonials / Project photos, client reviews     /projects
  Gallery**                                           

  **Blog /         SEO content --- guides, tips,      /blog
  Resource Hub**   explainers                         

  **FAQ**          Handles common pre-purchase        /faq
                   objections                         

  **Contact / Get  Direct lead capture form +         /contact
  a Quote**        WhatsApp link                      

  **Privacy        Legal requirement; trust signal    /privacy
  Policy**                                            

  **Thank You      Post-form-submission; conversion   /thank-you
  Page**           tracking pixel fires here          
  -----------------------------------------------------------------------

**6. Landing Page --- Functional Requirements**

The landing page is the primary conversion surface. Every design and
copy decision must serve one of two outcomes: keep the visitor engaged
or drive them toward a CTA. It must load fast, communicate value
instantly, and feel trustworthy.

**6.1 Above-the-Fold Hero Section**

-   Headline that communicates the primary value proposition immediately
    --- e.g. \"Stop Paying for Generator Fuel. Go Solar Today.\" Copy
    must be tested A/B across ad campaigns.

-   Sub-headline qualifying the offer --- coverage, quality, warranty,
    or financing angle.

-   Primary CTA button: \"Calculate My Solar Cost\" --- links directly
    to the Solar Calculator.

-   Secondary CTA: \"Get a Free Quote\" --- opens WhatsApp or scrolls to
    contact form.

-   Hero image or video: real project photographs, ideally showing a
    Lagos/Nigerian residential or office setting. No stock imagery.

-   Trust bar beneath the fold: logos/badges for certifications, number
    of installations completed, years in business, warranty duration.

**6.2 Social Proof Section**

-   3--5 customer testimonials with real names, locations, and photos
    where available.

-   Google review rating widget or embedded star rating with review
    count.

-   Before/after photo gallery or project showcase (4--6 images minimum
    at launch).

-   A \"Featured In\" or partner logo strip if applicable (e.g.,
    equipment brand partnerships --- Luminous, Felicity, etc.).

**6.3 Services Overview Section**

-   Three service cards: Solar Sales, Installation, Repairs &
    Maintenance.

-   Each card: icon, brief description (2--3 sentences), and a \"Learn
    More\" link to the full services page.

-   A 4th card or banner promoting the calculator: \"Not sure what you
    need? Build your solar plan in 3 minutes.\"

**6.4 How It Works Section**

A 3--4 step visual process that reduces anxiety about the installation
experience:

4.  You tell us your appliances (via the calculator).

5.  We design your custom system and send you a quote.

6.  We install professionally --- clean, fast, with minimal disruption.

7.  We support you post-installation with our warranty and maintenance
    service.

**6.5 Cost Savings / ROI Section**

-   An illustrative comparison: average monthly generator spend vs.
    solar system break-even timeline.

-   This section directly addresses the most common objection: \"Solar
    is too expensive.\"

-   Include a headline like: \"Most of our customers break even in
    18--24 months.\"

-   Optional: an embedded mini-calculator --- \"Enter your monthly fuel
    spend → see your projected annual savings.\"

**6.6 Final CTA Section (Bottom of Page)**

-   Repeat the primary CTA before the footer: \"Ready to stop paying for
    NEPA and diesel? Start here.\"

-   Calculator CTA + WhatsApp CTA side by side.

-   Urgency/scarcity element if applicable (e.g., \"Limited slots for
    June installation. Book now.\").

**6.7 Navigation & Footer**

-   Sticky top navigation bar: Logo, Services, Projects, Blog, Contact,
    and a high-contrast CTA button (\"Get a Quote\" or \"Calculate
    Cost\").

-   Footer: Company name, address, phone, email, WhatsApp link, social
    media links, service links, legal links (Privacy Policy, Terms).

-   A floating WhatsApp chat button visible on all pages.

**7. Solar Setup Calculator --- Detailed Feature Specification**

The Solar Setup Calculator is the flagship feature of v1.0. It is a
multi-step, interactive web tool that guides a user through their
appliance load profile and produces a personalised solar system
recommendation --- complete with component specifications and an
indicative cost range.

**7.1 Product Philosophy**

-   The calculator must feel like a conversation, not a spreadsheet.
    Progress indicators, friendly copy, and micro-animations keep users
    engaged.

-   The output must feel personalised. A user should feel the result was
    designed specifically for them.

-   The result must create a reason to contact Wine Press Solar
    Services. It should not fully replace the sales conversation but
    should make that conversation easy and warm.

**7.2 Calculator Flow --- Step by Step**

**Step 1 --- Usage Context**

The user selects the setting for which the system is intended:

-   Home (Residential)

-   Office / Business

-   Shop / Retail

-   Other

This step sets copy tone and default appliance presets for subsequent
steps.

**Step 2 --- Location**

The user selects their state/city in Nigeria. This is used for:

-   Solar irradiance calibration (peak sun hours vary across Nigeria ---
    Lagos ≈ 4.5h/day, Kano ≈ 6.5h/day).

-   Regional pricing adjustments if applicable.

-   Routing the lead to the appropriate sales territory.

**Step 3 --- Appliance Selection**

This is the core and most important step. The user builds their load
profile by selecting appliances from a categorised list. Each appliance
card shows:

-   Appliance name and icon

-   Default wattage (editable by advanced users)

-   Quantity selector (+/--)

-   Daily usage hours selector (slider or dropdown)

Appliance categories and items (minimum):

  ------------------------------------------------------------------------
  **Category**        **Appliances**
  ------------------- ----------------------------------------------------
  **Lighting**        LED Bulb (9W), LED Bulb (15W), Fluorescent Tube
                      (36W), Security/Flood Light (30W)

  **Cooling**         Ceiling Fan, Standing Fan, AC 1HP, AC 1.5HP, AC 2HP

  **Kitchen**         Refrigerator (150L), Refrigerator (250L), Chest
                      Freezer, Blender, Electric Kettle, Microwave

  **Entertainment**   LED TV 32\", LED TV 43\", LED TV 55\", DSTV Decoder,
                      Home Theatre, CCTV System

  **Computing**       Laptop, Desktop PC, Wi-Fi Router, Network Switch

  **Water / Utility** Water Pump (0.5HP), Water Pump (1HP), Washing
                      Machine, Water Dispenser

  **Office /          Printer/Copier, POS Terminal, Cash Register, Barber
  Business**          Chair (motor), Hair Dryer

  **Other**           Custom appliance (user enters name and wattage
                      manually)
  ------------------------------------------------------------------------

**Step 4 --- Power Autonomy Preference**

The user selects their desired backup duration (how many hours of power
without grid or generator):

-   6 hours (light backup --- grid is somewhat reliable)

-   12 hours (standard --- typical Nigerian urban home)

-   24 hours (full-day backup --- rural or low-reliability areas)

-   \"I want full independence --- power for days\" (triggers heavy
    battery recommendation)

**Step 5 --- Budget Indicator (Optional)**

A soft budget range selector. This is optional and is used to:

-   Offer a budget-aligned variation of the recommendation if the
    technically ideal system exceeds budget.

-   Flag the lead as premium or value-sensitive for sales team routing.

Ranges: Under ₦500k / ₦500k--₦1M / ₦1M--₦2.5M / ₦2.5M--₦5M / ₦5M+ /
Flexible

**Step 6 --- Results Page**

The results page is a full personalised report. It must include:

**System Summary Card**

-   Total estimated load: X kWh/day

-   Recommended inverter: \[Brand/Type\], \[Capacity\] kVA

-   Solar panels: \[N\] panels × \[W\]W (\[Total W\] array)

-   Batteries: \[N\] units × \[Ah\] --- \[Battery type: Lithium / Gel /
    Tubular\]

-   Charge controller: \[Type\] --- \[Rating\]A

-   Estimated autonomy: X hours without sun

**Cost Estimate Section**

-   Equipment cost range: ₦X,000,000 -- ₦Y,000,000

-   Estimated installation cost: ₦X,000 -- ₦Y,000

-   Total estimated investment: ₦X,000,000 -- ₦Y,000,000

A disclaimer must appear: \"This is an indicative estimate. Final
pricing depends on site survey, equipment availability, and current
market rates. Request a free quote for exact pricing.\"

**Results Page CTAs**

-   Primary CTA: \"Get My Exact Quote\" --- triggers the lead capture
    form (Step 7).

-   Secondary CTA: \"Talk to an Expert\" --- opens WhatsApp with a
    pre-filled message containing the system spec.

-   Tertiary: \"Save / Share My Result\" --- generates a shareable link
    or PDF summary. This has high viral and referral value.

-   \"Start Over\" link --- non-obtrusive, allows the user to
    recalculate.

**Step 7 --- Lead Capture Form**

Triggered after the user engages with the results CTAs. Collects:

-   Full name (required)

-   Phone number (required --- WhatsApp preferred)

-   Email address (required)

-   State / City (auto-filled from Step 2, editable)

-   Installation address or area (optional)

-   How did you hear about us? (optional --- dropdown for attribution)

-   Any additional notes (optional)

On submission, the complete system specification from the calculator is
silently appended to the lead record. The sales team receives a lead
with full context, not just a phone number.

**8. Solar Calculation Engine --- Technical Logic**

The calculation engine is the heart of the calculator. It must be
implemented entirely client-side (JavaScript) to ensure speed, offline
resilience, and privacy. No appliance data should be sent to a server
until the user submits the lead form.

**8.1 Load Calculation**

For each selected appliance:

Energy (Wh/day) = Wattage × Daily Usage Hours × Quantity

Total daily load = Sum of all appliance energy values.

Apply a system inefficiency factor of 1.25 (accounting for inverter
losses, wiring losses, and battery inefficiency):

Adjusted Load = Total Load × 1.25

**8.2 Solar Panel Sizing**

Peak Sun Hours (PSH) by region (example values, to be validated by
engineering):

-   Lagos, Ogun, Oyo: 4.5 PSH

-   Rivers, Bayelsa, Akwa Ibom: 4.2 PSH

-   Abuja, Kogi, Benue: 5.2 PSH

-   Kano, Kaduna, Sokoto: 6.0--6.5 PSH

Required Array Size (W) = Adjusted Load / PSH

Number of Panels = CEIL(Required Array Size / Panel Wattage)

Default panel wattage: 400W monocrystalline. This should be a
configurable system variable.

**8.3 Battery Bank Sizing**

Battery Capacity (Ah) = (Adjusted Load × Autonomy Days) / System Voltage

System voltage defaults to 48V for systems above 2kW and 24V for smaller
systems.

Battery type selection logic:

-   Load \< 2kWh/day and budget \< ₦1M: Recommend Tubular/Gel batteries.

-   Load 2--8kWh/day or autonomy \> 12h: Recommend Lithium Iron
    Phosphate (LFP).

-   Load \> 8kWh/day: Recommend LFP with modular expansion note.

**8.4 Inverter Sizing**

Inverter Size (kVA) = Peak Concurrent Load × 1.3 (safety margin)

Peak concurrent load is calculated by identifying the maximum wattage
likely running simultaneously (not all appliances at once). The engine
should identify high-draw items (ACs, pumps, fridges) and apply a demand
factor.

Recommend the nearest standard inverter size above the calculated
requirement (1kVA, 2kVA, 3.5kVA, 5kVA, 7.5kVA, 10kVA, 15kVA, 20kVA).

**8.5 Pricing Engine**

Pricing is calculated from a configurable price table maintained by the
Wine Press admin team. The table maps:

-   Panel Wattage × Quantity → Equipment cost range

-   Inverter kVA → Equipment cost range

-   Battery type × Ah × Number of units → Equipment cost range

-   Fixed installation cost bracket by system size

All prices are expressed as ranges (min--max) to account for market
volatility and brand variation. The price table must be updatable
without code changes (a simple JSON config file or CMS field is
sufficient for v1.0).

**9. SEO Requirements**

**9.1 Technical SEO**

-   Site must be server-side rendered (SSR) or statically generated.
    Client-side-only rendering (pure React SPA) is not acceptable for
    SEO.

-   Core Web Vitals targets: LCP \< 2.5s, FID/INP \< 100ms, CLS \< 0.1.

-   Mobile-first responsive design. Google indexes mobile version.

-   HTTPS required. HTTP redirects to HTTPS.

-   Canonical tags on all pages to prevent duplicate content.

-   XML sitemap auto-generated and submitted to Google Search Console.

-   Robots.txt properly configured --- calculator results pages should
    be noindexed.

-   Structured data (JSON-LD schema) implemented for: LocalBusiness,
    Service, FAQPage, Review.

**9.2 On-Page SEO**

-   Each page has a unique, keyword-rich title tag (50--60 characters)
    and meta description (150--160 characters).

-   H1 tag is unique per page and contains primary keyword.

-   Image alt tags on all images. File names are descriptive (not
    IMG_4021.jpg).

-   Internal linking strategy: blog posts link to service pages; service
    pages link to calculator.

-   Open Graph and Twitter Card meta tags on all pages for social
    sharing.

**9.3 Target Keywords --- Initial Set**

  -----------------------------------------------------------------------
  **Keyword**                         **Intent**        **Target Page**
  ----------------------------------- ----------------- -----------------
  solar installation Lagos price      Transactional     Home / Calculator

  solar panel installation Nigeria    Transactional     Home / Services

  how many solar panels do I need     Informational     Calculator / Blog
  Nigeria                                               

  solar inverter price Nigeria 2025   Informational     Blog / Calculator

  solar company Lagos                 Navigational      Home / About

  solar installation cost Nigeria     Transactional     Calculator

  inverter battery size calculator    Transactional     Calculator

  best solar company Nigeria          Transactional     Home /
                                                        Testimonials

  solar panel for house Nigeria       Transactional     Home / Services

  NEPA alternative Nigeria            Informational     Blog
  -----------------------------------------------------------------------

**10. Conversion Rate Optimisation (CRO) Requirements**

**10.1 CTA Design Principles**

-   All CTAs use action verbs: \"Calculate\", \"Get My Quote\", \"Talk
    to Us Now\", \"Start Saving Today\".

-   Primary CTAs use high-contrast Solar Amber (#F59E0B in light mode,
    #FBBF24 in dark mode) and follow the 8px border-radius limit.

-   **Flat Design**: No drop shadows, gradients, or glassmorphism
    effects are to be used on any CTA or UI element.

-   Mobile CTAs are minimum 48px height for tap target compliance.

-   Sticky mobile footer bar: WhatsApp CTA and Calculator CTA always
    visible.

**10.2 Trust Signals**

-   Display total number of completed installations prominently (updated
    regularly).

-   Display warranty duration: e.g. \"2-Year Installation Warranty ---
    10-Year Panel Manufacturer Warranty.\"

-   Show payment flexibility if offered: installment options, financing
    partnerships.

-   Physical address and registration number visible in footer ---
    reduces scam perception.

-   Real team photos (not stock imagery) on the About page.

**10.3 Page Speed & UX**

-   First Contentful Paint \< 1.5 seconds on 4G Nigerian network
    conditions.

-   Images compressed and served in WebP format with JPEG fallback.

-   Lazy loading for below-fold images.

-   No intrusive pop-ups within the first 5 seconds. Exit-intent pop-up
    is acceptable.

-   Form fields have clear labels and inline validation --- never show
    all errors on submit.

**10.4 Tracking & Analytics**

-   Google Analytics 4 installed on all pages.

-   Meta Pixel installed on all pages. Standard events: PageView, Lead,
    ViewContent.

-   Google Ads conversion tracking: fire on /thank-you page.

-   Custom events tracked: Calculator Started, Calculator Step
    Completed, Calculator Result Viewed, WhatsApp Button Clicked, Quote
    Form Submitted.

-   Google Tag Manager used to manage all tracking tags.

-   A/B testing capability on hero headline and CTA copy via GTM or
    dedicated tool (e.g., VWO, Google Optimize).

**11. Feature Priority Matrix --- v1.0 Scope**

  -----------------------------------------------------------------------------
  **Feature**            **Description**                         **Priority**
  ---------------------- --------------------------------------- --------------
  **Landing Page**       Full conversion-optimised home page     **P0**
                         with all sections defined in §6         

  **Solar Calculator**   Full 7-step interactive calculator with **P0**
                         calculation engine and results page     

  **Lead Capture Form**  Calculator result + contact form        **P0**
                         integration with email notification to  
                         sales team                              

  **WhatsApp             Floating button + pre-filled spec       **P0**
  Integration**          message on results page                 

  **Mobile               Pixel-perfect on iOS and Android, all   **P0**
  Responsiveness**       screen sizes                            

  **SEO Foundation**     Meta tags, schema, sitemap, robots.txt, **P0**
                         SSR                                     

  **Analytics & Pixels** GA4, Meta Pixel, GTM, conversion        **P0**
                         tracking                                

  **Services Page**      Individual service detail pages         **P1**

  **About Page**         Brand story, team, certifications       **P1**

  **Testimonials /       Project photos, client reviews          **P1**
  Gallery**                                                      

  **FAQ Page**           Pre-purchase objection handling         **P1**

  **Blog (CMS)**         Minimum 5 seed articles at launch for   **P1**
                         SEO                                     

  **Shareable Results**  Generate shareable link or PDF from     **P2**
                         calculator results                      

  **ROI                  Fuel spend → savings comparison widget  **P2**
  Mini-Calculator**      on landing page                         

  **Admin Price Table    Non-technical interface to update       **P2**
  UI**                   pricing config                          

  **CRM Integration**    Auto-create leads in HubSpot / Zoho /   **P3**
                         Pipedrive                               

  **Client Portal**      Order tracking, warranty docs, service  **P3**
                         history                                 

  **E-commerce           Online deposit or payment for           **P3**
  Checkout**             installation booking                    
  -----------------------------------------------------------------------------

**12. Design Aesthetics & Visual Identity**

The Wine Press Solar Services application follows a **modern, minimalist,
and flat design philosophy**. The interface focuses on clarity,
typography, and functional spacing to build trust and convey
professionalism.

**12.1 Visual Style Constraints**

-   **Flat UI**: No drop shadows, outer glows, or elevated surface
    effects. Depth is communicated through subtle colour shifts rather
    than shadows.

-   **No Glassmorphism**: Avoid background blurs, frosted glass effects,
    or semi-transparent overlays.

-   **No Gradients**: Use solid, high-quality colours only. Do not apply
    linear or radial gradients to buttons, backgrounds, or cards.

-   **Rounded Edges**: All container and element corners (buttons,
    cards, inputs) are capped at a maximum of **8px** border radius for
    a crisp, structured look.

-   **Typography**: Clean, sans-serif fonts (e.g., Inter or Outfit) with
    generous leading for readability.

**12.2 Theme Support**

The application must support both **Light** and **Dark** modes
natively. A high-visibility theme switch must be accessible in the main
navigation.

**12.3 Color Palettes**

**Light Theme**

-   **Background**: #FFFFFF (Pure White)
-   **Surface**: #F8F9FA (Off-white for cards/sections)
-   **Primary Text**: #1A1A1B (Charcoal)
-   **Secondary Text**: #64748B (Slate Gray)
-   **Primary Action**: #F59E0B (Solar Amber)
-   **Success/Growth**: #10B981 (Emerald Green)

**Dark Theme**

-   **Background**: #0F172A (Deep Slate)
-   **Surface**: #1E293B (Slate-800 for cards/sections)
-   **Primary Text**: #F8FAFC (Slate-50)
-   **Secondary Text**: #94A3B8 (Slate-400)
-   **Primary Action**: #FBBF24 (Bright Amber)
-   **Success/Growth**: #34D399 (Bright Emerald)

**13. Recommended Technology Stack**

The following stack is recommended to satisfy the SEO, performance, and
scalability requirements of v1.0:

  --------------- -------------------------------------------------------
  **Framework**   Next.js 14+ (React) --- SSR/SSG for full SEO control,
                  fast page loads, and excellent developer ecosystem.

  **Styling**     Tailwind CSS --- utility-first, consistent design
                  system, small bundle size. Use `next-themes` for
                  dark/light mode orchestration.

  **CMS (Blog)**  Sanity.io or Contentlayer --- headless CMS for blog
                  content, editable by non-technical team.

  **Form          React Hook Form + server-side API route --- lead data
  Handling**      sent to email (Resend/SendGrid) and optionally to a CRM
                  webhook.

  **Calculator    Pure JavaScript (no external dependencies) ---
  Engine**        client-side only. Data config in a JSON file.

  **Analytics**   Google Tag Manager (container) → GA4 + Meta Pixel +
                  Google Ads.

  **Hosting**     Vercel (recommended for Next.js) or Railway ---
                  automatic preview deployments, edge caching, global
                  CDN.

  **Domain /      Managed via Cloudflare for performance, DDoS
  DNS**           protection, and DNS management.

  **WhatsApp      wa.me deep links for v1.0. WhatsApp Business API for
  API**           v2.0 if automated responses are needed.

  **Version       GitHub --- with branch protection and staging
  Control**       environment workflow.
  --------------- -------------------------------------------------------

**14. Non-Functional Requirements**

**14.1 Performance**

-   Lighthouse Performance Score ≥ 90 on mobile.

-   Time to Interactive (TTI) \< 3.5 seconds on simulated 4G.

-   Page weight \< 500KB for above-fold critical path.

**14.2 Accessibility**

-   WCAG 2.1 AA compliance for all interactive elements.

-   All images have alt text. All form fields have labels.

-   Keyboard navigable throughout.

-   Colour contrast ratios ≥ 4.5:1 for body text.

**14.3 Security**

-   HTTPS enforced. HSTS header set.

-   Lead form protected against spam with reCAPTCHA v3.

-   No sensitive data stored client-side.

-   Environment variables used for all API keys and secrets.

**14.4 Browser / Device Support**

-   Chrome, Safari, Firefox, Edge --- latest 2 major versions.

-   iOS Safari 15+ and Android Chrome --- primary mobile targets.

-   Calculator must be fully functional on 4G with no Wi-Fi dependency.

**15. Suggested Development Timeline**

  ----------------------------------------------------------------------------
  **Phase**       **Duration**    **Deliverables**
  --------------- --------------- --------------------------------------------
  **1 ---         **Week 1**      Project setup, design system, brand assets,
  Foundation**                    content collection (copy, photos,
                                  testimonials).

  **2 --- Core    **Weeks 2--3**  Landing page (all sections), services page,
  Build**                         about page, navigation, footer, WhatsApp
                                  integration.

  **3 ---         **Weeks 3--4**  Full calculator flow (Steps 1--7),
  Calculator**                    calculation engine, results page, lead
                                  capture form.

  **4 --- SEO &   **Week 5**      Schema markup, meta tags, sitemap, GA4, Meta
  Analytics**                     Pixel, GTM events, Lighthouse audit & fixes.

  **5 --- QA &    **Week 6**      Cross-browser testing, mobile QA,
  Launch**                        performance optimisation, staging review,
                                  go-live.

  **6 ---         **Weeks 7--8**  Blog seed articles (×5), A/B test setup on
  Post-Launch**                   hero, CRO review after first week of traffic
                                  data.
  ----------------------------------------------------------------------------

**16. Open Questions & Dependencies**

The following items require input from the Wine Press team before or
during development:

  ------------------------------------------------------------------------------
  **\#**   **Question**                       **Why It Matters**
  -------- ---------------------------------- ----------------------------------
  **1**    What is the preferred domain name? Required for DNS setup, canonical
                                              tags, and brand consistency.

  **2**    Which brands/products does Wine    Needed for pricing table and
           Press primarily supply and         equipment recommendation logic.
           install?                           

  **3**    What is the current price range    Needed to seed the pricing engine
           (min--max) for a 5kVA system with  with realistic ranges.
           4 x 200Ah batteries?               

  **4**    What geographic areas does Wine    Affects PSH lookup table and sales
           Press currently serve?             territory routing.

  **5**    Is there an existing CRM, or will  Determines lead delivery mechanism
           leads be managed via email and     for v1.0.
           WhatsApp for now?                  

  **6**    Do you offer any financing or      High-impact CRO element if
           instalment payment options?        available.

  **7**    Who will write and supply the      Content is the single
           testimonials, project photos, and  longest-lead-time item in the
           blog content?                      project.

  **8**    What is the primary WhatsApp       Required to implement WhatsApp
           business number for the floating   CTAs.
           button and pre-filled links?       
  ------------------------------------------------------------------------------

**17. Appendix --- Glossary**

  --------------- -------------------------------------------------------
  **CTA**         Call to Action --- a button, link, or prompt designed
                  to drive a specific user behaviour.

  **CRO**         Conversion Rate Optimisation --- the practice of
                  increasing the percentage of users who complete a
                  desired action.

  **kVA**         Kilovolt-ampere --- the unit used to measure inverter
                  capacity. Approx. equal to kW at unity power factor.

  **kWh**         Kilowatt-hour --- the unit of energy. A 100W device
                  running for 10 hours consumes 1 kWh.

  **LFP**         Lithium Iron Phosphate --- a type of lithium battery
                  preferred for solar storage due to safety and
                  longevity.

  **PSH**         Peak Sun Hours --- the number of hours per day during
                  which solar irradiance averages 1000 W/m². Used to size
                  solar arrays.

  **SSR**         Server-Side Rendering --- pages are rendered on the
                  server before being sent to the browser, ensuring
                  search engine crawlability.

  **P0 / P1 / P2  Priority levels. P0 = must-have for launch. P1 =
  / P3**          important, launch or shortly after. P2 = next
                  iteration. P3 = future roadmap.
  --------------- -------------------------------------------------------

*End of Document*
