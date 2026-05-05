import React from "react";
import Link from "next/link";
import { Calculator, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-20 bg-background overflow-hidden border-b border-border">
      {/* Structural Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-surface border border-border px-3 py-1.5 rounded-[8px] mb-8">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span className="text-[10px] font-black tracking-widest uppercase text-foreground">Installing across Lagos & Abuja</span>
          </div>

          <h1 className="font-display font-black text-5xl md:text-7xl text-foreground leading-[1.1] mb-8">
            Stop Paying for <br />
            <span className="text-primary italic underline decoration-border underline-offset-8">Generator Fuel.</span> <br />
            Go Solar Today.
          </h1>

          <p className="text-secondary-text text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
            Wine Press Solar provides structured, reliable energy solutions for Nigerian homes and businesses. 
            High-efficiency equipment, professional installation, and absolute energy security.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/calculator"
              className="btn-flat btn-primary text-sm uppercase tracking-widest px-10 h-14"
            >
              <Calculator className="w-5 h-5" />
              Calculate My Solar Cost
            </Link>
            <a
              href="#services"
              className="btn-flat btn-outline text-sm uppercase tracking-widest px-10 h-14"
            >
              Our Services
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4 pt-10 border-t border-border">
            {[
              "2-Year Warranty",
              "Expert Installation",
              "24/7 Support",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-foreground text-[10px] font-black uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-success" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual - Flat UI Version */}
        <div className="relative hidden lg:block">
          <div className="bg-surface border-2 border-border p-3 rounded-[8px] transform rotate-2">
             <div className="aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-[4px] relative overflow-hidden grayscale-[0.2] hover:grayscale-0 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop" 
                  alt="Solar Installation" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-[12px] border-surface pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-background border border-border p-5 rounded-[8px]">
                    <p className="text-foreground font-black text-xl mb-1 leading-none uppercase tracking-tighter">Premium 5.5kVA System</p>
                    <p className="text-secondary-text text-[10px] font-bold uppercase tracking-widest">Lekki, Lagos Installation</p>
                  </div>
                </div>
             </div>
          </div>
          {/* Accent block */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary -z-10 rounded-[8px]"></div>
        </div>
      </div>
    </section>
  );
}
