import React from "react";
import { Zap, ShieldCheck, PenTool as Tool, ShoppingBag } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Solar Sales",
      desc: "Top-tier monocrystalline panels, deep-cycle batteries, and hybrid inverters from world-class brands.",
      icon: ShoppingBag,
    },
    {
      title: "Expert Installation",
      desc: "Professional engineering team ensuring optimal panel placement and safe electrical integration.",
      icon: Zap,
    },
    {
      title: "Maintenance & Repair",
      desc: "Routine system health checks and fast repair services to keep your power running smoothly.",
      icon: Tool,
    },
    {
      title: "Energy Audit",
      desc: "Detailed analysis of your energy consumption to design the perfectly sized system for your needs.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="services" className="py-24 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h3 className="text-primary font-black tracking-widest uppercase text-xs mb-4">Precision Engineering</h3>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-tight">
              Full-Spectrum <span className="text-primary italic">Solar Services.</span>
            </h2>
          </div>
          <p className="text-secondary-text max-w-sm mb-2 text-sm font-medium">
            Professional energy security for your home and business, delivered with technical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => (
            <div key={idx} className="group bg-background p-10 rounded-[8px] border border-border hover:border-primary transition-colors duration-300">
              <div className="w-12 h-12 border-2 border-primary rounded-[4px] flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-background transition-colors">
                <service.icon size={24} />
              </div>
              <h4 className="font-display font-black text-lg mb-4 text-foreground uppercase tracking-tighter">{service.title}</h4>
              <p className="text-secondary-text text-sm leading-relaxed font-medium">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
