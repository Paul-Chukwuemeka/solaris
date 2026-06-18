import type { Metadata } from "next";
import Link from "next/link";
import { PenTool as Tool, ArrowRight, CheckCircle, ArrowLeft, Wifi, Calendar, Zap } from "lucide-react";
import WhatsAppLink from "@/components/WhatsAppLink";

export const metadata: Metadata = {
  title: "Solar Maintenance & Repair",
  description:
    "Keep your solar system running at peak efficiency with Winepress Solar Services. We offer scheduled maintenance plans, remote monitoring, panel cleaning, and emergency repairs across Nigeria.",
  alternates: { canonical: "https://winepresssolar.com/services/maintenance" },
  openGraph: {
    url: "https://winepresssolar.com/services/maintenance",
    title: "Solar Maintenance & Repair",
    description:
      "Scheduled health checks, remote inverter monitoring, panel cleaning, and 24-hour emergency callout — keep your solar investment performing for decades.",
  },
};

const plans = [
  {
    name: "Basic Check-Up",
    freq: "Once a year",
    price: "From ₦25,000",
    features: [
      "Full system visual inspection",
      "Panel output voltage test",
      "Battery health assessment",
      "Inverter diagnostic check",
      "Written service report",
    ],
  },
  {
    name: "Pro Care Plan",
    freq: "Every 6 months",
    price: "From ₦45,000 / year",
    features: [
      "Everything in Basic",
      "Panel cleaning (wet wash)",
      "Cable and connector integrity test",
      "Remote monitoring setup",
      "Priority response (48 hrs)",
    ],
    highlight: true,
  },
  {
    name: "Premium Cover",
    freq: "Quarterly",
    price: "From ₦80,000 / year",
    features: [
      "Everything in Pro Care",
      "4 scheduled visits per year",
      "Emergency callout within 24 hrs",
      "Minor parts included (fuses, MC4s)",
      "Annual performance certificate",
    ],
  },
];

const repairServices = [
  {
    icon: Zap,
    title: "Inverter Repair & Replacement",
    desc: "Fault diagnosis, firmware updates, component-level repair, or full unit swap.",
  },
  {
    icon: Calendar,
    title: "Battery Desulphation & Replacement",
    desc: "Capacity testing, desulphation for gel batteries, and safe swap-out of degraded cells.",
  },
  {
    icon: Wifi,
    title: "Remote Monitoring Setup",
    desc: "WiFi or GSM-based remote visibility of your inverter — track output, battery SOC, and faults from anywhere.",
  },
  {
    icon: Tool,
    title: "Cable & Electrical Repairs",
    desc: "Re-termination of corroded lugs, MC4 replacement, breaker faults, and earth continuity testing.",
  },
];

export default function MaintenancePage() {
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
              <Tool size={26} />
            </div>
            <p className="text-primary font-black tracking-widest uppercase text-xs mb-4">Maintenance & Repair</p>
            <h1 className="font-display font-black text-5xl md:text-6xl text-foreground leading-none tracking-tighter mb-6">
              Keep It Running,<br />Always.
            </h1>
            <p className="text-secondary-text text-base font-medium leading-relaxed max-w-xl">
              Solar systems degrade silently — dust-clogged panels, loose connections, and ageing batteries all quietly steal your output. Our maintenance plans keep your investment performing at specification, year after year.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:w-64 shrink-0">
            <WhatsAppLink source="maintenance-hero" className="btn-flat btn-primary h-14 px-8 text-xs uppercase tracking-widest justify-center" />
            <Link href="/services" className="btn-flat btn-outline h-14 px-8 text-xs uppercase tracking-widest justify-center">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tighter mb-10">Service Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[8px] p-8 flex flex-col border transition-colors duration-300 ${
                plan.highlight
                  ? "bg-primary text-background border-primary"
                  : "bg-surface border-border hover:border-primary"
              }`}
            >
              {plan.highlight && (
                <span className="text-[9px] font-black uppercase tracking-widest bg-background text-primary px-3 py-1 rounded-[4px] mb-6 self-start">
                  Most Popular
                </span>
              )}
              <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${plan.highlight ? "text-background/70" : "text-secondary-text"}`}>
                {plan.freq}
              </p>
              <h3 className={`font-display font-black text-xl uppercase tracking-tighter mb-1 ${plan.highlight ? "text-background" : "text-foreground"}`}>
                {plan.name}
              </h3>
              <p className={`font-black text-lg mb-6 ${plan.highlight ? "text-background" : "text-primary"}`}>{plan.price}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm font-medium">
                    <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-background" : "text-primary"}`} />
                    <span className={plan.highlight ? "text-background/90" : "text-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <WhatsAppLink
                  source={`maintenance-plan-${plan.name.toLowerCase().replace(/\s/g, "-")}`}
                  className={`btn-flat h-12 px-8 text-xs uppercase tracking-widest justify-center w-full ${
                    plan.highlight ? "bg-background text-primary hover:bg-surface" : "btn-outline"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Repair Services */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tighter mb-8">Ad-hoc Repairs</h2>
        <p className="text-secondary-text text-sm font-medium mb-8 max-w-2xl">
          Not on a plan? We handle one-off faults and repairs for any solar system — not just ones we installed.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {repairServices.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-surface border border-border rounded-[8px] p-8 flex gap-6 hover:border-primary transition-colors duration-300">
              <div className="w-11 h-11 border border-primary rounded-[4px] flex items-center justify-center text-primary shrink-0">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="font-display font-black text-base text-foreground uppercase tracking-tighter mb-2">{title}</h3>
                <p className="text-secondary-text text-sm font-medium leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="border-t border-border pt-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-black text-2xl text-foreground uppercase tracking-tighter mb-2">Book a Service Visit</h3>
            <p className="text-secondary-text text-sm font-medium">Emergency or scheduled — our team responds fast. Message us to get started.</p>
          </div>
          <div className="flex gap-4">
            <WhatsAppLink source="maintenance-cta" className="btn-flat btn-primary h-14 px-10 text-xs uppercase tracking-widest" />
          </div>
        </div>
      </section>
    </main>
  );
}
