import type { Metadata } from "next";
import Link from "next/link";
import { Star, Quote, MapPin, ArrowRight, Zap } from "lucide-react";
import WhatsAppLink from "@/components/WhatsAppLink";

export const metadata: Metadata = {
  title: "Projects & Reviews",
  description:
    "Browse Wine Press Solar Services' completed solar installations across Nigeria — commercial, residential, and industrial. Read verified client reviews from Enugu, Lagos, Abuja, Port Harcourt and beyond.",
  alternates: { canonical: "https://winepresssolar.com/projects" },
  openGraph: {
    url: "https://winepresssolar.com/projects",
    title: "Solar Projects & Client Reviews | Wine Press Solar Services",
    description:
      "450+ completed solar installations across Nigeria. See our project gallery and read verified client reviews from homes and businesses we've powered.",
  },
};

const projects = [
  {
    title: "Commercial Office Park",
    location: "Lekki Phase 1, Lagos",
    size: "20kVA Hybrid",
    type: "Commercial",
    desc: "Full hybrid solar system with grid-tie capability for a 6-floor office complex. Eliminated 80% of diesel generator dependency.",
    image: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?q=80&w=2070&auto=format&fit=crop",
    alt: "20kVA hybrid solar installation for commercial office park — Wine Press Solar Services project in Lagos",
  },
  {
    title: "Residential Duplex",
    location: "Surulere, Lagos",
    size: "3.5kVA Inverter",
    type: "Residential",
    desc: "Off-grid solar system with lithium battery bank for a family home. Powers AC, fridge, lighting, and security systems 24/7.",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2058&auto=format&fit=crop",
    alt: "3.5kVA solar inverter system installed on residential duplex by Wine Press Solar Services",
  },
  {
    title: "Retail Pharmacy",
    location: "Gwarimpa, Abuja",
    size: "7.5kVA System",
    type: "Commercial",
    desc: "Hybrid solar system with priority load management ensuring refrigeration and critical medical equipment never loses power.",
    image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2070&auto=format&fit=crop",
    alt: "7.5kVA solar power system for retail pharmacy — Wine Press Solar commercial installation Nigeria",
  },
  {
    title: "Private School Campus",
    location: "Enugu GRA, Enugu",
    size: "15kVA Off-Grid",
    type: "Institutional",
    desc: "Large off-grid solar array powering classrooms, admin block, and canteen. Replaced a diesel generator that was running 10 hours daily.",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=2000&auto=format&fit=crop",
    alt: "15kVA off-grid solar installation for private school campus in Enugu by Wine Press Solar",
  },
  {
    title: "4-Bedroom Bungalow",
    location: "Trans-Ekulu, Enugu",
    size: "5kVA Hybrid",
    type: "Residential",
    desc: "Hybrid system with 2-day battery autonomy. Client has not paid a DISCOM bill or bought petrol since installation.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop",
    alt: "5kVA hybrid solar system for 4-bedroom bungalow in Enugu — Wine Press Solar Services",
  },
  {
    title: "Restaurant & Event Centre",
    location: "Port Harcourt",
    size: "10kVA Hybrid",
    type: "Commercial",
    desc: "High-demand commercial system designed for industrial freezers, sound equipment, and full event lighting loads.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop",
    alt: "10kVA hybrid solar installation for restaurant and event centre in Port Harcourt by Wine Press Solar",
  },
  {
    title: "Gated Estate — 12 Units",
    location: "Asaba, Delta State",
    size: "3–5kVA per Unit",
    type: "Estate",
    desc: "Individual solar systems for each unit in a gated estate. Centralised monitoring with remote inverter diagnostics for estate management.",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop",
    alt: "Individual solar systems for 12-unit gated estate in Asaba Delta State by Wine Press Solar",
  },
  {
    title: "Hair Salon & Barbing Shop",
    location: "New Haven, Enugu",
    size: "2kVA Backup",
    type: "SME",
    desc: "Compact solar backup system to keep hairdryers, clippers, and fans running during NEPA outages — zero business disruption.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2000&auto=format&fit=crop",
    alt: "2kVA solar backup system for hair salon in Enugu by Wine Press Solar Services",
  },
  {
    title: "Medical Diagnostic Centre",
    location: "Independence Layout, Enugu",
    size: "12kVA Hybrid",
    type: "Healthcare",
    desc: "Mission-critical solar system with dual-inverter redundancy for a diagnostic lab. Ultrasound, X-ray, and laboratory equipment on clean uninterrupted power.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    alt: "12kVA hybrid solar system for medical diagnostic centre in Enugu by Wine Press Solar Services",
  },
];

const testimonials = [
  {
    name: "Tunde Williams",
    location: "Ikeja, Lagos",
    role: "Homeowner — 5kVA Hybrid",
    text: "Since Wine Press installed my 5kVA system, my petrol generator hasn't come on once. The peace of mind is worth every Naira. The team was professional, fast, and genuinely knowledgeable.",
    rating: 5,
  },
  {
    name: "Aisha Mohammed",
    location: "Maitama, Abuja",
    role: "Homeowner — 3.5kVA System",
    text: "Very professional team. They handled the roof installation and rewiring perfectly. The site survey was thorough and the quote was exactly what we paid — no hidden costs.",
    rating: 5,
  },
  {
    name: "Engr. Emeka Obi",
    location: "Enugu GRA",
    role: "Business Owner — 10kVA Commercial",
    text: "My pharmacy now runs 24/7 on solar. The inverter monitoring app gives me real-time visibility and I have not had a single power-related incident since installation.",
    rating: 5,
  },
  {
    name: "Mrs. Chidinma Eze",
    location: "Trans-Ekulu, Enugu",
    role: "Homeowner — 3kVA Off-Grid",
    text: "I was sceptical at first but the system sizing was spot on. My generator has been off for 8 months. Wine Press even followed up 3 months after installation to check performance.",
    rating: 5,
  },
  {
    name: "Kola Adeyemi",
    location: "Surulere, Lagos",
    role: "Estate Developer — Multi-Unit",
    text: "We installed 12 individual systems across our estate. The coordination was excellent and they trained our estate manager on remote monitoring. Outstanding project delivery.",
    rating: 5,
  },
  {
    name: "Dr. Ngozi Nnaji",
    location: "Independence Layout, Enugu",
    role: "Clinic Owner — 8kVA Medical",
    text: "Reliable power for medical equipment is non-negotiable. Wine Press understood our load requirements and designed a redundant system. 14 months in and zero failures.",
    rating: 5,
  },
];

const typeColors: Record<string, string> = {
  Residential: "bg-primary/10 text-primary",
  Commercial: "bg-surface text-foreground border border-border",
  Institutional: "bg-surface text-foreground border border-border",
  Estate: "bg-surface text-foreground border border-border",
  SME: "bg-surface text-foreground border border-border",
  Healthcare: "bg-surface text-foreground border border-border",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <p className="text-primary font-black tracking-widest uppercase text-xs mb-4">Proof of Excellence</p>
        <h1 className="font-display font-black text-5xl md:text-7xl text-foreground leading-none tracking-tighter mb-8 max-w-4xl">
          450+ Systems.<br />
          <span className="text-primary italic">Real Results.</span>
        </h1>
        <p className="text-secondary-text max-w-2xl text-base font-medium leading-relaxed mb-10">
          From single-room backups to full commercial estates — browse our completed solar installations across Nigeria and read verified reviews from clients who've permanently exited the generator economy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/calculator" className="btn-flat btn-primary h-14 px-10 text-xs uppercase tracking-widest">
            Get My System Spec <ArrowRight className="w-4 h-4" />
          </Link>
          <WhatsAppLink source="projects-hero" className="btn-flat btn-outline h-14 px-10 text-xs uppercase tracking-widest" />
        </div>
      </section>

      {/* Stats strip */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "450+", label: "Systems Installed" },
            { value: "12", label: "States Covered" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "3+", label: "Years in Operation" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-surface border border-border rounded-[8px] p-6 text-center">
              <p className="font-display font-black text-3xl text-foreground tracking-tighter">{value}</p>
              <p className="text-secondary-text text-[10px] font-black uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Gallery */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex items-end justify-between mb-10 gap-6">
          <h2 className="font-display font-black text-3xl text-foreground uppercase tracking-tighter">Project Gallery</h2>
          <p className="text-secondary-text text-sm font-medium text-right max-w-xs hidden md:block">
            Residential, commercial, institutional — we engineer the right system for every context.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden bg-surface border border-border rounded-[8px] hover:border-primary transition-colors duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-[4px] ${typeColors[project.type] ?? "bg-surface text-foreground border border-border"}`}>
                    {project.type}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {project.size}
                  </span>
                </div>
                <h3 className="font-display font-black text-base text-foreground uppercase tracking-tighter mb-1">{project.title}</h3>
                <p className="text-secondary-text text-[10px] font-black uppercase tracking-widest flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3" /> {project.location}
                </p>
                <p className="text-secondary-text text-xs font-medium leading-relaxed">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="font-display font-black text-3xl text-foreground uppercase tracking-tighter mb-10">Client Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-surface border border-border rounded-[8px] p-8 relative overflow-hidden flex flex-col">
              <Quote className="absolute -top-3 -right-3 w-20 h-20 text-border rotate-12" />
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground font-medium text-sm leading-relaxed mb-6 relative z-10 flex-1">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-6 border-t border-border relative z-10">
                <div className="w-9 h-9 bg-primary flex items-center justify-center font-black text-background rounded-[4px] text-xs shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-foreground text-xs leading-none mb-1 uppercase tracking-wider">{t.name}</p>
                  <p className="text-secondary-text text-[9px] font-bold uppercase tracking-widest">{t.location}</p>
                  <p className="text-primary text-[9px] font-black uppercase tracking-widest mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-surface border border-border rounded-[8px] p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h3 className="font-display font-black text-2xl md:text-3xl text-foreground uppercase tracking-tighter mb-3">
              Want Your Home on This List?
            </h3>
            <p className="text-secondary-text text-sm font-medium max-w-lg">
              Use our free calculator to size your system in minutes, or speak with our team to begin your project.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/calculator" className="btn-flat btn-primary h-14 px-10 text-xs uppercase tracking-widest">
              Free Calculator <ArrowRight className="w-4 h-4" />
            </Link>
            <WhatsAppLink source="projects-cta" className="btn-flat btn-outline h-14 px-10 text-xs uppercase tracking-widest" />
          </div>
        </div>
      </section>

    </main>
  );
}
