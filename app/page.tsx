import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import SocialProof from "@/components/home/SocialProof";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import About from "@/components/home/About";
import ROI from "@/components/home/ROI";
import { HelpCircle, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import WhatsAppLink from "@/components/WhatsAppLink";

export const metadata: Metadata = {
  title: "Winepress Solar Services | Solar Energy Solutions in Enugu, Nigeria",
  description:
    "Winepress Solar Solution Services — Enugu's trusted solar company. We design, supply, install and maintain solar systems for homes and businesses across Nigeria. Get a free instant quote with our solar calculator.",
  alternates: { canonical: "https://winepresssolar.com" },
  openGraph: {
    url: "https://winepresssolar.com",
    title:
      "Winepress Solar Solution Services | Solar Energy Solutions in Enugu, Nigeria",
    description:
      "Enugu's trusted solar company. Solar panels, inverters, batteries — professionally installed. Use our free solar calculator to size your system in minutes.",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Winepress Solar Solution Services",
  alternateName: "Winepress Solar Solution services",
  description:
    "Winepress Solar Service designs, supplies, installs and maintains solar power systems for homes and businesses across Nigeria, headquartered in Enugu.",
  url: "https://winepresssolar.com",
  telephone: "+2349166301384",
  email: "hello@winepresssolar.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "God's Power Plaza, Dustbin, Alaba International Market",
    addressLocality: "Lagos",
    addressRegion: "Lagos State",
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.335,
    longitude: 7.4999,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  priceRange: "₦₦₦",
  currenciesAccepted: "NGN",
  paymentAccepted: "Cash, Bank Transfer",
  areaServed: ["Enugu", "Lagos", "Abuja", "Port Harcourt", "Nigeria"],
  hasMap: "https://maps.google.com/?q=POWA+Plaza+Enugu",
  sameAs: ["https://www.facebook.com/winepresssolar"],
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Winepress Solar Solution Services",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Solar Panel Sales",
        description:
          "Top-tier monocrystalline panels, deep-cycle batteries, and hybrid inverters from world-class brands.",
        provider: {
          "@type": "LocalBusiness",
          name: "Winepress Solar Services",
        },
        areaServed: "Nigeria",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Solar System Installation",
        description:
          "Professional solar system installation with 2-year workmanship warranty for homes and businesses.",
        provider: {
          "@type": "LocalBusiness",
          name: "Winepress Solar Services",
        },
        areaServed: "Nigeria",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Solar Maintenance & Repair",
        description:
          "Routine system health checks and fast repair services to keep your solar power running smoothly.",
        provider: {
          "@type": "LocalBusiness",
          name: "Winepress Solar Services",
        },
        areaServed: "Nigeria",
      },
    },
  ],
};

export default function Home() {
  const faqs = [
    {
      q: "How long does a typical solar installation take?",
      a: "Most residential installations are completed within 1–3 business days, depending on the system size and roof complexity.",
    },
    {
      q: "Can solar power really run my AC and Fridge?",
      a: "Yes! Our hybrid systems are designed to handle high-draw appliances like ACs and fridges. The calculator will help you determine the exact size you need.",
    },
    {
      q: "Do you offer warranty on installations?",
      a: "Absolutely. We provide a 2-year workmanship warranty on all installations, and our equipment carries manufacturer warranties up to 25 years.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <SocialProof />
      <Services />
      <HowItWorks />
      <ROI />
      <About />

      {/* FAQ Section - Flat UI */}
      <section id="faq" className="py-24 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex p-3 bg-background border border-border rounded-[8px] mb-6">
              <HelpCircle className="text-primary w-6 h-6" />
            </div>
            <h2 className="font-display font-black text-4xl text-foreground uppercase tracking-tighter">
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-background border border-border rounded-[8px] cursor-pointer overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 font-black text-foreground text-sm uppercase tracking-widest list-none group-hover:bg-surface transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform text-primary" />
                </summary>
                <div className="px-6 pb-6 pt-0 animate-fade-in">
                  <div className="h-px bg-border mb-6"></div>
                  <p className="text-secondary-text text-sm leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Flat UI */}
      <section className="py-32 bg-background text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="font-display font-black text-4xl md:text-7xl text-foreground mb-8 leading-none tracking-tighter">
            Ready to Build Your <br />
            <span className="text-primary italic underline decoration-border underline-offset-4">
              Energy Future?
            </span>
          </h2>
          <p className="text-secondary-text text-lg mb-16 max-w-2xl mx-auto font-medium">
            Join 450+ Nigerians who have already eliminated their dependency on
            the grid and petrol generators. Structured plans, fixed costs,
            absolute reliability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/calculator"
              className="btn-flat btn-primary h-16 px-12 text-sm uppercase tracking-widest"
            >
              Get Your Solar Plan
              <ArrowRight className="w-5 h-5" />
            </Link>
            <WhatsAppLink
              source="home-cta"
              className="btn-flat btn-outline h-16 px-12 text-sm uppercase tracking-widest"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
