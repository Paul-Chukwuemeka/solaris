import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ArrowRight, CheckCircle, ArrowLeft, Clock, ShieldCheck, Users } from "lucide-react";
import WhatsAppLink from "@/components/WhatsAppLink";

export const metadata: Metadata = {
  title: "Solar System Installation",
  description:
    "Professional solar system installation for homes and businesses across Nigeria. Wine Press Solar Services provides certified engineering teams, 2-year workmanship warranty, and post-install commissioning.",
  alternates: { canonical: "https://winepresssolar.com/services/installation" },
  openGraph: {
    url: "https://winepresssolar.com/services/installation",
    title: "Solar System Installation",
    description:
      "Certified solar installation teams, roof assessment, electrical integration, and a 2-year workmanship warranty — serving Enugu, Lagos, Abuja and all of Nigeria.",
  },
};

const process = [
  {
    step: "01",
    title: "Site Survey",
    desc: "Our engineer visits your location to assess roof structure, available space, shading, and electrical panel capacity. Usually takes 1–2 hours.",
  },
  {
    step: "02",
    title: "System Design",
    desc: "We produce a technical layout — panel placement, cable routing, battery bank sizing, and inverter configuration — optimised for your specific load and roof.",
  },
  {
    step: "03",
    title: "Quotation",
    desc: "You receive a fixed-price, itemised quote. No hidden costs. Equipment, labour, and warranty all included.",
  },
  {
    step: "04",
    title: "Installation",
    desc: "Our team arrives with all equipment and completes the physical installation — panels, racking, inverter, battery bank, and AC/DC cabling. Typically 1–3 days.",
  },
  {
    step: "05",
    title: "Commissioning & Handover",
    desc: "We power up, test every component, verify output, and walk you through operating your new system with confidence.",
  },
];

const included = [
  "Pre-installation roof and structural assessment",
  "Panel mounting on pitched or flat roofs",
  "Inverter and battery bank wiring and installation",
  "AC circuit integration and safety disconnect",
  "System commissioning and performance verification",
  "Owner training and user manual",
  "2-year workmanship warranty",
];

const stats = [
  { icon: Clock, value: "1–3 days", label: "Typical installation time" },
  { icon: ShieldCheck, value: "2 years", label: "Workmanship warranty" },
  { icon: Users, value: "450+", label: "Systems installed" },
];

export default function InstallationPage() {
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
              <Zap size={26} />
            </div>
            <p className="text-primary font-black tracking-widest uppercase text-xs mb-4">Professional Installation</p>
            <h1 className="font-display font-black text-5xl md:text-6xl text-foreground leading-none tracking-tighter mb-6">
              Expert Installation.
            </h1>
            <p className="text-secondary-text text-base font-medium leading-relaxed max-w-xl">
              A solar system is only as good as its installation. Our certified engineering team handles every project — from roof assessment to final commissioning — with zero shortcuts and a 2-year workmanship guarantee.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:w-64 shrink-0">
            <Link href="/calculator" className="btn-flat btn-primary h-14 px-8 text-xs uppercase tracking-widest justify-center">
              Size My System <ArrowRight className="w-4 h-4" />
            </Link>
            <WhatsAppLink source="installation-hero" className="btn-flat btn-outline h-14 px-8 text-xs uppercase tracking-widest justify-center" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-surface border border-border rounded-[8px] p-8 flex items-center gap-6">
              <div className="w-12 h-12 border border-primary rounded-[4px] flex items-center justify-center text-primary shrink-0">
                <Icon size={22} />
              </div>
              <div>
                <p className="font-display font-black text-2xl text-foreground tracking-tighter">{value}</p>
                <p className="text-secondary-text text-[11px] font-bold uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tighter mb-10">Our Installation Process</h2>
        <div className="space-y-4">
          {process.map((step) => (
            <div key={step.step} className="flex gap-8 bg-surface border border-border rounded-[8px] p-8 hover:border-primary transition-colors duration-300">
              <span className="font-display font-black text-4xl text-primary leading-none tracking-tighter shrink-0">{step.step}</span>
              <div>
                <h3 className="font-display font-black text-lg text-foreground uppercase tracking-tighter mb-2">{step.title}</h3>
                <p className="text-secondary-text text-sm font-medium leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-surface border border-border rounded-[8px] p-10 md:p-14">
          <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tighter mb-8">What's Included</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {included.map((point) => (
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
            <h3 className="font-display font-black text-2xl text-foreground uppercase tracking-tighter mb-2">Book a Site Survey</h3>
            <p className="text-secondary-text text-sm font-medium">Speak with our team to schedule a free, no-obligation site visit.</p>
          </div>
          <div className="flex gap-4">
            <WhatsAppLink source="installation-cta" className="btn-flat btn-primary h-14 px-10 text-xs uppercase tracking-widest" />
          </div>
        </div>
      </section>
    </main>
  );
}
