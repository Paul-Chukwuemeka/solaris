import Hero from "@/components/home/Hero";
import SocialProof from "@/components/home/SocialProof";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import ROI from "@/components/home/ROI";
import { HelpCircle, ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const faqs = [
    {
      q: "How long does a typical solar installation take?",
      a: "Most residential installations are completed within 1–3 business days, depending on the system size and roof complexity."
    },
    {
      q: "Can solar power really run my AC and Fridge?",
      a: "Yes! Our hybrid systems are designed to handle high-draw appliances like ACs and fridges. The calculator will help you determine the exact size you need."
    },
    {
      q: "Do you offer warranty on installations?",
      a: "Absolutely. We provide a 2-year workmanship warranty on all installations, and our equipment carries manufacturer warranties up to 25 years."
    }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Hero />
      <SocialProof />
      <Services />
      <ROI />
      <About />
      
      {/* FAQ Section - Flat UI */}
      <section id="faq" className="py-24 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex p-3 bg-background border border-border rounded-[8px] mb-6">
              <HelpCircle className="text-primary w-6 h-6" />
            </div>
            <h2 className="font-display font-black text-4xl text-foreground uppercase tracking-tighter">Common Questions</h2>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-background border border-border rounded-[8px] cursor-pointer overflow-hidden">
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
            <span className="text-primary italic underline decoration-border underline-offset-4">Energy Future?</span>
          </h2>
          <p className="text-secondary-text text-lg mb-16 max-w-2xl mx-auto font-medium">
            Join 450+ Nigerians who have already eliminated their dependency on the grid and petrol generators. 
            Structured plans, fixed costs, absolute reliability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/calculator" className="btn-flat btn-primary h-16 px-12 text-sm uppercase tracking-widest">
              Get Your Solar Plan
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="https://wa.me/2349166301384" className="btn-flat btn-outline h-16 px-12 text-sm uppercase tracking-widest">
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
