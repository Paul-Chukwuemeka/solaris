import React from "react";
import { Star, Quote, MapPin } from "lucide-react";

export default function SocialProof() {
  const testimonials = [
    {
      name: "Tunde Williams",
      location: "Ikeja, Lagos",
      text: "Since Wine Press installed my 5kVA system, my petrol generator hasn't come on once. The peace of mind is worth every Naira.",
      rating: 5,
    },
    {
      name: "Aisha Mohammed",
      location: "Maitama, Abuja",
      text: "Very professional team. They handled the roof installation and rewiring perfectly. Highly recommended for any homeowner.",
      rating: 5,
    },
  ];

  const projects = [
    {
      title: "Commercial Office Park",
      location: "Lekki Phase 1",
      size: "20kVA Hybrid",
      image: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?q=80&w=2070&auto=format&fit=crop",
      alt: "20kVA hybrid solar installation for commercial office park — Wine Press Solar Services project",
    },
    {
      title: "Residential Duplex",
      location: "Surulere",
      size: "3.5kVA Inverter",
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2058&auto=format&fit=crop",
      alt: "3.5kVA solar inverter system installed on residential duplex by Wine Press Solar Services",
    },
    {
      title: "Retail Pharmacy",
      location: "Gwarimpa",
      size: "7.5kVA System",
      image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2070&auto=format&fit=crop",
      alt: "7.5kVA solar power system for retail pharmacy — Wine Press Solar commercial installation Nigeria",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-primary font-black tracking-widest uppercase text-xs mb-4 italic">Proof of Excellence</h3>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground leading-tight">
              Trusted by Hundreds of <br />
              <span className="text-primary">Solar-Powered Nigerians.</span>
            </h2>
          </div>
          <p className="text-secondary-text max-w-sm text-sm font-medium">
            Solid installations that deliver power independence across residential and commercial sectors.
          </p>
        </div>

        {/* Project Gallery - Flat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-24 border border-border">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative aspect-[4/5] overflow-hidden bg-surface">
              <img 
                src={project.image} 
                alt={project.alt}
                className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 border border-transparent group-hover:border-primary group-hover:border-8 transition-all pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-background border-t border-border transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-2">
                  <MapPin className="w-3 h-3" />
                  {project.location}
                </div>
                <h4 className="font-display font-bold text-xl mb-1 text-foreground">{project.title}</h4>
                <p className="text-secondary-text text-[10px] uppercase font-black">{project.size}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials - Structured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-surface border border-border p-10 rounded-[8px] relative overflow-hidden">
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-border rotate-12" />
              <div className="flex gap-1 mb-8 relative z-10">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground font-medium text-lg leading-relaxed mb-10 relative z-10">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 pt-8 border-t border-border relative z-10">
                <div className="w-10 h-10 bg-primary flex items-center justify-center font-black text-background rounded-[4px] text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-black text-foreground text-sm leading-none mb-1 uppercase tracking-wider">{t.name}</h5>
                  <p className="text-secondary-text text-[10px] font-bold uppercase tracking-widest">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
