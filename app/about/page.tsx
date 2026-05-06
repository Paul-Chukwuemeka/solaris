import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Users,
  Heart,
  ShieldCheck,
  Zap,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import WhatsAppLink from "@/components/WhatsAppLink";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Wine Press Solar Services — Enugu's trusted solar company founded to eliminate the energy barrier for Nigerian homes and SMEs. Our mission, team, and values.",
  alternates: { canonical: "https://winepresssolar.com/about" },
  openGraph: {
    url: "https://winepresssolar.com/about",
    title: "About Wine Press Solar Services",
    description:
      "Founded in Enugu to bring structured, high-availability solar power to Nigerian households and businesses. 450+ installations, 12 states, 98% customer satisfaction.",
  },
};

const stats = [
  { value: "450+", label: "Systems Installed", icon: Zap },
  { value: "12", label: "States Covered", icon: MapPin },
  { value: "3+", label: "Years in Operation", icon: Award },
  { value: "98%", label: "Customer Satisfaction", icon: Heart },
];

const values = [
  {
    title: "Technical Honesty",
    desc: "We specify systems that match your actual load — not over-sized to inflate margins, not under-sized to win price comparisons. You get the truth upfront.",
    icon: ShieldCheck,
  },
  {
    title: "Engineering Precision",
    desc: "Every installation follows a documented process: site survey, technical design, fixed-price quote, certified installation, and commissioning handover.",
    icon: Zap,
  },
  {
    title: "Long-term Partnership",
    desc: "We don't disappear after installation day. Our maintenance plans, emergency callout, and remote monitoring keep us invested in your system's performance.",
    icon: Users,
  },
  {
    title: "Nigerian-First Design",
    desc: "Our system sizing accounts for Nigerian weather patterns, grid unreliability, generator cost baselines, and the appliances real Nigerian homes actually run.",
    icon: Heart,
  },
];

const certifications = [
  {
    name: "NABCEP-Aligned Installation Standards",
    body: "North American Board of Certified Energy Practitioners",
    note: "Our installation methodology follows NABCEP best practice for PV system design and safety.",
  },
  {
    name: "Manufacturer Authorised Installer",
    body: "Growatt & Victron Energy",
    note: "Certified to install, commission, and service inverter systems from these brands under warranty.",
  },
  {
    name: "Nigeria Electricity Regulatory Commission",
    body: "NERC",
    note: "Operating in compliance with NERC off-grid and embedded generation guidelines.",
  },
];

const team = [
  {
    name: "Chukwuemeka Paul",
    role: "Founder & Lead Engineer",
    bio: "Solar engineer with 5+ years designing and commissioning off-grid and hybrid systems across Nigeria. Passionate about making clean energy accessible to every Nigerian household.",
  },
  {
    name: "Installation Team",
    role: "Certified Field Engineers",
    bio: "A dedicated crew of trained solar technicians handling site surveys, panel mounting, electrical integration, and commissioning with a zero-compromise attitude to safety.",
  },
  {
    name: "Customer Success",
    role: "After-Sales & Support",
    bio: "From your first WhatsApp message to your annual system health check, our customer success team is on hand to ensure your solar investment keeps delivering.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <p className="text-primary font-black tracking-widest uppercase text-xs mb-4">Our Story</p>
        <h1 className="font-display font-black text-5xl md:text-7xl text-foreground leading-none tracking-tighter mb-8 max-w-4xl">
          Built for Nigeria.<br />
          <span className="text-primary italic">Powered by Purpose.</span>
        </h1>
        <p className="text-secondary-text max-w-2xl text-base font-medium leading-relaxed mb-10">
          Wine Press Solar Services was founded in Enugu with a single mission: eliminate the energy barrier holding back Nigerian households and SMEs. We provide structured, high-availability solar power solutions that serve as the foundation for growth — built on technical honesty and long-term partnership.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/calculator" className="btn-flat btn-primary h-14 px-10 text-xs uppercase tracking-widest">
            Calculate My System <ArrowRight className="w-4 h-4" />
          </Link>
          <WhatsAppLink source="about-hero" className="btn-flat btn-outline h-14 px-10 text-xs uppercase tracking-widest" />
        </div>
      </section>

      {/* Stats Strip */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="bg-surface border border-border rounded-[8px] p-8 flex flex-col items-start gap-4 hover:border-primary transition-colors duration-300">
              <div className="w-11 h-11 border border-primary rounded-[4px] flex items-center justify-center text-primary">
                <Icon size={20} />
              </div>
              <div>
                <p className="font-display font-black text-4xl text-foreground tracking-tighter leading-none">{value}</p>
                <p className="text-secondary-text text-[10px] font-black uppercase tracking-widest mt-1">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-foreground uppercase tracking-tighter mb-6">
              The Problem We Set Out to Solve
            </h2>
            <div className="space-y-5 text-secondary-text text-sm font-medium leading-relaxed">
              <p>
                Nigeria loses an estimated <strong className="text-foreground">₦38 trillion</strong> annually to unreliable power. For the average home or SME, this means thousands of naira spent monthly on petrol generators — money that buys noise, fumes, and a power source that fails exactly when it's most needed.
              </p>
              <p>
                Wine Press Solar Services was built to replace that dependency with something permanent. A properly designed solar system doesn't just cut electricity bills — it becomes the reliable infrastructure layer that everything else runs on.
              </p>
              <p>
                We started in Enugu because that's home. We've since expanded to 12 states across Nigeria, carrying the same standard of technical work and the same commitment to honest system sizing with us.
              </p>
              <p>
                Every installation we complete is a household or business that has permanently exited the generator economy. That's the mission, and we measure our success by it.
              </p>
            </div>
          </div>

          {/* Visual block */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-primary rounded-[8px] p-8 flex flex-col justify-end">
              <p className="text-background font-display font-black text-5xl mb-2 tracking-tighter">3+</p>
              <p className="text-background text-[10px] font-black uppercase tracking-widest leading-tight">Years of Solar Excellence</p>
            </div>
            <div className="aspect-square bg-surface border border-border rounded-[8px] overflow-hidden p-2">
              <img
                src="https://images.unsplash.com/photo-1624397648246-47ce3a4d8be0?q=80&w=800&auto=format&fit=crop"
                alt="Wine Press Solar technician at work on a Nigerian rooftop installation"
                className="w-full h-full object-cover rounded-[4px] grayscale"
              />
            </div>
            <div className="col-span-2 aspect-[2/1] bg-surface border border-border rounded-[8px] overflow-hidden p-2">
              <img
                src="https://images.unsplash.com/photo-1594398901394-4e34939a4fe0?q=80&w=1200&auto=format&fit=crop"
                alt="Monocrystalline solar panels installed on a rooftop in Nigeria"
                className="w-full h-full object-cover rounded-[4px] grayscale-[0.4] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="font-display font-black text-3xl text-foreground uppercase tracking-tighter mb-10">How We Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {values.map(({ title, desc, icon: Icon }) => (
            <div key={title} className="bg-surface border border-border rounded-[8px] p-8 flex gap-6 hover:border-primary transition-colors duration-300">
              <div className="w-11 h-11 border border-primary rounded-[4px] flex items-center justify-center text-primary shrink-0 mt-0.5">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="font-display font-black text-base text-foreground uppercase tracking-tighter mb-3">{title}</h3>
                <p className="text-secondary-text text-sm font-medium leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="font-display font-black text-3xl text-foreground uppercase tracking-tighter mb-10">The Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.map(({ name, role, bio }) => (
            <div key={name} className="bg-surface border border-border rounded-[8px] p-8 hover:border-primary transition-colors duration-300">
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-[4px] flex items-center justify-center text-primary font-display font-black text-xl mb-6">
                {name[0]}
              </div>
              <h3 className="font-display font-black text-base text-foreground uppercase tracking-tighter mb-1">{name}</h3>
              <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-4">{role}</p>
              <p className="text-secondary-text text-sm font-medium leading-relaxed">{bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="font-display font-black text-3xl text-foreground uppercase tracking-tighter mb-10">Standards & Certifications</h2>
        <div className="space-y-4">
          {certifications.map(({ name, body, note }) => (
            <div key={name} className="bg-surface border border-border rounded-[8px] p-8 flex flex-col md:flex-row md:items-center gap-6 hover:border-primary transition-colors duration-300">
              <div className="md:w-64 shrink-0">
                <ShieldCheck className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-display font-black text-sm text-foreground uppercase tracking-tighter">{name}</h3>
                <p className="text-primary text-[9px] font-black uppercase tracking-widest mt-1">{body}</p>
              </div>
              <div className="h-px md:h-12 md:w-px bg-border shrink-0" />
              <p className="text-secondary-text text-sm font-medium leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact block */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-surface border border-border rounded-[8px] p-10 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-primary rounded-[4px] flex items-center justify-center text-primary shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary-text mb-1">Head Office</p>
              <p className="text-sm text-foreground font-medium leading-relaxed">Shop 13, POWA Plaza,<br />By Ogui Police Station,<br />Enugu, Nigeria</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-primary rounded-[4px] flex items-center justify-center text-primary shrink-0">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary-text mb-1">Phone</p>
              <a href="tel:+2349166301384" className="text-sm text-foreground font-medium hover:text-primary transition-colors">+234 916 630 1384</a>
              <p className="text-[10px] text-secondary-text font-bold mt-1">Mon–Sat: 8am – 6pm</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-primary rounded-[4px] flex items-center justify-center text-primary shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary-text mb-1">Email</p>
              <a href="mailto:hello@winepresssolar.com" className="text-sm text-foreground font-medium hover:text-primary transition-colors">hello@winepresssolar.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="border-t border-border pt-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-black text-2xl text-foreground uppercase tracking-tighter mb-2">
              Ready to Go Solar?
            </h3>
            <p className="text-secondary-text text-sm font-medium">
              Use our free calculator to get an instant system estimate, or talk to our team directly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/calculator" className="btn-flat btn-primary h-14 px-10 text-xs uppercase tracking-widest">
              Free Calculator <ArrowRight className="w-4 h-4" />
            </Link>
            <WhatsAppLink source="about-cta" className="btn-flat btn-outline h-14 px-10 text-xs uppercase tracking-widest" />
          </div>
        </div>
      </section>

    </main>
  );
}
