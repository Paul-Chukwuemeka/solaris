import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, Zap, PenTool as Tool, ShieldCheck, ArrowRight } from "lucide-react";
import WhatsAppLink from "@/components/WhatsAppLink";

export const metadata: Metadata = {
  title: "Solar Services",
  description:
    "Explore Winepress Solar Services: solar panel sales, professional installation, repairs and maintenance, and energy audits for homes and businesses across Nigeria.",
  alternates: { canonical: "https://winepresssolar.com/services" },
  openGraph: {
    url: "https://winepresssolar.com/services",
    title: "Solar Services",
    description:
      "Full-spectrum solar services — sales, installation, maintenance and energy audits. Serving Enugu, Lagos, Abuja and all of Nigeria.",
  },
};

const services = [
  {
    slug: "solar-sales",
    title: "Solar Sales",
    tagline: "World-class equipment, expert guidance.",
    desc: "We source and supply top-tier monocrystalline panels, deep-cycle lithium and gel batteries, and hybrid inverters from globally trusted brands. Whether you know exactly what you need or need help specifying, we've got you.",
    icon: ShoppingBag,
    highlights: [
      "Monocrystalline panels (400W – 600W per panel)",
      "Lithium & gel deep-cycle batteries",
      "Hybrid and off-grid inverters",
      "Charge controllers and accessories",
    ],
  },
  {
    slug: "installation",
    title: "Expert Installation",
    tagline: "Precision engineering, zero compromise.",
    desc: "Our certified engineering team handles every installation with meticulous attention to safety, roof integrity, and electrical compliance. We optimise panel tilt and orientation for maximum Nigerian sunshine yield.",
    icon: Zap,
    highlights: [
      "Residential and commercial installs",
      "Roof structure assessment included",
      "2-year workmanship warranty",
      "Post-install commissioning and training",
    ],
  },
  {
    slug: "maintenance",
    title: "Maintenance & Repair",
    tagline: "Keep your power running, always.",
    desc: "Your solar investment deserves proactive care. We offer scheduled health checks, remote diagnostics, and rapid on-site repairs to ensure your system performs at peak efficiency year-round.",
    icon: Tool,
    highlights: [
      "Quarterly and annual service plans",
      "Remote inverter monitoring",
      "Panel cleaning and performance checks",
      "Emergency callout within 24 hours",
    ],
  },
  {
    slug: null,
    title: "Energy Audit",
    tagline: "Know before you invest.",
    desc: "A detailed analysis of your energy consumption patterns helps us design the perfectly sized system — no over-spending, no under-sizing. Includes a written report and system recommendation.",
    icon: ShieldCheck,
    highlights: [
      "Appliance load profiling",
      "Peak demand analysis",
      "Written specification report",
      "Sizing recommendation for solar + battery + inverter",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <p className="text-primary font-black tracking-widest uppercase text-xs mb-4">Full-Spectrum Solar</p>
        <h1 className="font-display font-black text-5xl md:text-7xl text-foreground leading-none tracking-tighter mb-8 max-w-4xl">
          Everything You Need,<br />
          <span className="text-primary italic">Under One Roof.</span>
        </h1>
        <p className="text-secondary-text max-w-2xl text-base font-medium leading-relaxed mb-10">
          From sourcing the best equipment to a fully commissioned system with ongoing maintenance — Winepress Solar Services is your single point of accountability for clean, reliable power.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/calculator" className="btn-flat btn-primary h-14 px-10 text-xs uppercase tracking-widest">
            Size My System <ArrowRight className="w-4 h-4" />
          </Link>
          <WhatsAppLink source="services-hero" className="btn-flat btn-outline h-14 px-10 text-xs uppercase tracking-widest" />
        </div>
      </section>

      {/* Service Cards */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-surface border border-border rounded-[8px] p-10 flex flex-col hover:border-primary transition-colors duration-300"
              >
                <div className="w-14 h-14 border-2 border-primary rounded-[4px] flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-background transition-colors">
                  <Icon size={26} />
                </div>
                <p className="text-primary text-[10px] font-black tracking-widest uppercase mb-2">{service.tagline}</p>
                <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tighter mb-4">{service.title}</h2>
                <p className="text-secondary-text text-sm leading-relaxed font-medium mb-8">{service.desc}</p>
                <ul className="space-y-2 mb-10">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-foreground font-medium">
                      <span className="text-primary mt-0.5 flex-shrink-0">—</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {service.slug ? (
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn-flat btn-outline h-12 px-8 text-xs uppercase tracking-widest"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <WhatsAppLink
                      source={`services-${service.title.toLowerCase().replace(/\s/g, "-")}`}
                      className="btn-flat btn-outline h-12 px-8 text-xs uppercase tracking-widest"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-surface border border-border rounded-[8px] p-12 text-center">
          <h3 className="font-display font-black text-3xl md:text-4xl text-foreground uppercase tracking-tighter mb-4">
            Not Sure Where to Start?
          </h3>
          <p className="text-secondary-text text-sm font-medium max-w-xl mx-auto mb-8">
            Use our free solar calculator to get an instant system recommendation and cost estimate tailored to your exact appliances and location.
          </p>
          <Link href="/calculator" className="btn-flat btn-primary h-14 px-12 text-xs uppercase tracking-widest inline-flex items-center gap-3">
            Run the Free Calculator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
