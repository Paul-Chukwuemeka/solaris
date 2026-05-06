import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";
import WhatsAppLink from "@/components/WhatsAppLink";

export const metadata: Metadata = {
  title: "Solar Panel & Equipment Sales",
  description:
    "Buy top-tier monocrystalline solar panels, lithium batteries, hybrid inverters and accessories in Nigeria. Wine Press Solar Services supplies premium equipment to homes and businesses in Enugu, Lagos, Abuja and beyond.",
  alternates: { canonical: "https://winepresssolar.com/services/solar-sales" },
  openGraph: {
    url: "https://winepresssolar.com/services/solar-sales",
    title: "Solar Panel & Equipment Sales",
    description:
      "Premium solar panels, deep-cycle batteries, and hybrid inverters — sourced from globally trusted brands and delivered to your site across Nigeria.",
  },
};

const equipment = [
  {
    category: "Solar Panels",
    desc: "Monocrystalline PERC panels from 400W to 600W per unit — built for Nigerian sun intensity and humidity.",
    specs: ["Efficiency: 20–22%", "Warranty: 25 years power output", "Brands: Jinko, LONGi, Canadian Solar"],
  },
  {
    category: "Batteries",
    desc: "Lithium iron phosphate (LiFePO4) and AGM gel deep-cycle storage — scalable from home to commercial.",
    specs: ["Lithium: 200Ah, 5000+ cycles", "Gel: 100–200Ah, maintenance-free", "Brands: Felicity, Felicity Lithium, generic LFP"],
  },
  {
    category: "Hybrid Inverters",
    desc: "Grid-tie, off-grid, and hybrid inverters that seamlessly switch between solar, battery, and grid/generator.",
    specs: ["Range: 1kVA – 20kVA", "Pure sine wave output", "Brands: Growatt, Victron, Voltronic"],
  },
  {
    category: "Charge Controllers",
    desc: "MPPT charge controllers that extract maximum power from your panels in all weather conditions.",
    specs: ["MPPT efficiency: 98%+", "Range: 20A – 100A", "Smart display with battery health tracking"],
  },
  {
    category: "Accessories & Cabling",
    desc: "Solar-rated DC cables, MC4 connectors, breakers, combiner boxes, and mounting rails.",
    specs: ["UV-rated 4mm² and 6mm² DC cable", "Stainless steel mounting hardware", "Pre-crimped MC4 connectors"],
  },
];

const whyBuyFromUs = [
  "Genuine equipment — we source directly from manufacturers and authorised distributors",
  "Technical advice included — our engineers help you select the right spec before you buy",
  "Nationwide delivery via insured logistics partners",
  "Equipment compatible with our installation and maintenance services",
  "Post-sales support if you have a DIY installer or want our team to do it",
];

export default function SolarSalesPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Link href="/services" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary-text hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> All Services
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-start gap-12">
          <div className="flex-1">
            <div className="w-14 h-14 border-2 border-primary rounded-[4px] flex items-center justify-center text-primary mb-8">
              <ShoppingBag size={26} />
            </div>
            <p className="text-primary font-black tracking-widest uppercase text-xs mb-4">Solar Equipment</p>
            <h1 className="font-display font-black text-5xl md:text-6xl text-foreground leading-none tracking-tighter mb-6">
              Solar Sales.
            </h1>
            <p className="text-secondary-text text-base font-medium leading-relaxed max-w-xl">
              We source and supply world-class solar panels, deep-cycle batteries, and hybrid inverters — genuine, warranted equipment delivered to your location across Nigeria. No grey market imports. No compromises.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:w-64 shrink-0">
            <Link href="/calculator" className="btn-flat btn-primary h-14 px-8 text-xs uppercase tracking-widest justify-center">
              Size My System <ArrowRight className="w-4 h-4" />
            </Link>
            <WhatsAppLink source="solar-sales-hero" className="btn-flat btn-outline h-14 px-8 text-xs uppercase tracking-widest justify-center" />
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tighter mb-8">What We Supply</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {equipment.map((item) => (
            <div key={item.category} className="bg-surface border border-border rounded-[8px] p-8 hover:border-primary transition-colors duration-300">
              <h3 className="font-display font-black text-lg text-foreground uppercase tracking-tighter mb-3">{item.category}</h3>
              <p className="text-secondary-text text-sm font-medium leading-relaxed mb-5">{item.desc}</p>
              <ul className="space-y-1.5">
                {item.specs.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-[11px] text-foreground font-bold">
                    <span className="text-primary mt-0.5 flex-shrink-0">—</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-surface border border-border rounded-[8px] p-10 md:p-14">
          <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tighter mb-8">Why Buy From Wine Press?</h2>
          <ul className="space-y-4">
            {whyBuyFromUs.map((point) => (
              <li key={point} className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground font-medium leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="border-t border-border pt-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-black text-2xl text-foreground uppercase tracking-tighter mb-2">Ready to Order?</h3>
            <p className="text-secondary-text text-sm font-medium">Tell us your system spec and we'll prepare a formal quote within 24 hours.</p>
          </div>
          <div className="flex gap-4">
            <WhatsAppLink source="solar-sales-cta" className="btn-flat btn-primary h-14 px-10 text-xs uppercase tracking-widest" />
          </div>
        </div>
      </section>
    </main>
  );
}
