import React from "react";
import Link from "next/link";
import { Calculator, MessageSquare, Wrench, ShieldCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Calculator,
    title: "Size Your System",
    desc: "Use our free solar calculator to enter your appliances and get an instant, engineer-validated system recommendation — panels, battery, inverter, and cost estimate — in under 3 minutes.",
    cta: { label: "Open Calculator", href: "/calculator" },
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Get Your Quote",
    desc: "Our team reviews your calculator output, conducts a free site survey, and delivers a fixed-price quote with no hidden charges. You know the exact cost before we touch a single cable.",
    cta: { label: "Contact Us", href: "/contact" },
  },
  {
    number: "03",
    icon: Wrench,
    title: "Professional Installation",
    desc: "Certified field engineers handle everything — roof mounting, battery wiring, inverter commissioning, and load transfer. Most homes are done in 1–3 days. You get a full commissioning handover.",
    cta: { label: "Our Process", href: "/services/installation" },
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Ongoing Support",
    desc: "Your system comes with a 2-year workmanship warranty and access to our maintenance plans. We monitor performance, respond to faults fast, and keep your power running year after year.",
    cta: { label: "Maintenance Plans", href: "/services/maintenance" },
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <p className="text-primary font-black tracking-widest uppercase text-xs mb-4">The Process</p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-tight tracking-tighter">
              From Calculator to{" "}
              <span className="text-primary italic">Clean Power</span>
              <br />in 4 Steps.
            </h2>
          </div>
          <p className="text-secondary-text max-w-sm text-sm font-medium mb-2">
            A structured, transparent process — no guesswork, no surprise invoices, no downtime.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative bg-background border border-border rounded-[8px] p-10 flex flex-col hover:border-primary transition-colors duration-300 overflow-hidden"
              >
                {/* Large step number watermark */}
                <span className="absolute top-4 right-6 font-display font-black text-7xl text-border/50 leading-none select-none group-hover:text-primary/10 transition-colors duration-300">
                  {step.number}
                </span>

                {/* Connector line between steps (desktop) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[3.25rem] -right-[0.6rem] w-5 h-px bg-border z-10" />
                )}

                <div className="w-12 h-12 border-2 border-primary rounded-[4px] flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-background transition-colors duration-300 relative z-10 shrink-0">
                  <Icon size={22} />
                </div>

                <h3 className="font-display font-black text-lg text-foreground uppercase tracking-tighter mb-4 relative z-10">
                  {step.title}
                </h3>

                <p className="text-secondary-text text-sm font-medium leading-relaxed flex-1 relative z-10">
                  {step.desc}
                </p>

                <Link
                  href={step.cta.href}
                  className="inline-flex items-center gap-2 mt-8 text-[10px] font-black uppercase tracking-widest text-primary hover:text-foreground transition-colors relative z-10"
                >
                  {step.cta.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-8 bg-background border border-border rounded-[8px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-black text-foreground text-sm uppercase tracking-widest">Ready to start?</p>
            <p className="text-secondary-text text-sm font-medium mt-1">Your system estimate takes less than 3 minutes.</p>
          </div>
          <Link href="/calculator" className="btn-flat btn-primary h-12 px-8 text-xs uppercase tracking-widest shrink-0">
            Calculate My System <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
