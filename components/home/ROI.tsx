import React from "react";
import { TrendingDown, Fuel, Sun, Calculator } from "lucide-react";
import Link from "next/link";

export default function ROI() {
  return (
    <section className="py-24 bg-background border-b border-border relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h3 className="text-primary font-black tracking-widest uppercase text-xs mb-4">Financial ROI</h3>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-10 leading-tight">
            Stop Burning Your <br />
            <span className="text-primary italic underline decoration-border underline-offset-8">Profits in a Generator.</span>
          </h2>
          
          <div className="space-y-6 mb-16">
            <div className="flex gap-6 p-6 bg-surface border border-border rounded-[8px]">
              <Fuel className="text-primary w-6 h-6 shrink-0" />
              <div>
                <h4 className="text-foreground font-black text-sm uppercase tracking-wider mb-2">High Operating Costs</h4>
                <p className="text-secondary-text text-sm font-medium">Monthly petrol/diesel costs are rising. A generator is a liability, not an asset.</p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-surface border border-border rounded-[8px]">
              <TrendingDown className="text-success w-6 h-6 shrink-0" />
              <div>
                <h4 className="text-foreground font-black text-sm uppercase tracking-wider mb-2">24-Month Payback</h4>
                <p className="text-secondary-text text-sm font-medium">Most residential systems pay for themselves in 18–24 months through fuel savings.</p>
              </div>
            </div>
          </div>

          <Link
            href="/calculator"
            className="btn-flat btn-primary text-sm uppercase tracking-widest px-10 h-16 w-full sm:w-auto"
          >
            <Calculator className="w-6 h-6" />
            Check My Savings Potential
          </Link>
        </div>

        {/* Visual ROI Comparison - Flat UI Version */}
        <div className="bg-surface border-4 border-border p-12 rounded-[8px]">
          <div className="flex justify-between items-start mb-16">
             <h3 className="text-foreground font-display font-black text-2xl uppercase tracking-tighter">5-Year Energy Cost</h3>
             <div className="bg-primary text-background px-3 py-1 rounded-[4px] text-[10px] font-black uppercase tracking-widest">
               Analysis
             </div>
          </div>
          
          <div className="space-y-12">
            {/* Generator Bar */}
            <div>
              <div className="flex justify-between text-foreground text-xs font-black uppercase tracking-widest mb-4">
                <span className="flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-primary" /> Petrol Generator
                </span>
                <span className="text-primary">₦7.2M+</span>
              </div>
              <div className="w-full h-10 bg-background border-2 border-border p-1 rounded-[4px]">
                <div className="w-full h-full bg-primary rounded-[2px]"></div>
              </div>
              <p className="text-[10px] text-secondary-text mt-3 font-bold uppercase tracking-widest italic">Continuous: Fuel + Spares + Service</p>
            </div>

            {/* Solar Bar */}
            <div>
              <div className="flex justify-between text-foreground text-xs font-black uppercase tracking-widest mb-4">
                <span className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-success" /> Wine Press Solar
                </span>
                <span className="text-success">₦2.8M (Fixed)</span>
              </div>
              <div className="w-full h-10 bg-background border-2 border-border p-1 rounded-[4px]">
                <div className="w-[38%] h-full bg-success rounded-[2px]"></div>
              </div>
              <p className="text-[10px] text-success mt-3 font-bold uppercase tracking-widest italic">One-time Investment • Zero Fuel</p>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t-2 border-border flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <p className="text-secondary-text text-[10px] font-black uppercase tracking-widest mb-1">Projected Savings</p>
              <p className="text-primary font-display font-black text-5xl tracking-tighter">₦4.4M</p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-secondary-text text-[10px] font-black uppercase tracking-widest mb-1">Payback Period</p>
              <p className="text-success font-display font-black text-3xl tracking-tighter">19 MONTHS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
