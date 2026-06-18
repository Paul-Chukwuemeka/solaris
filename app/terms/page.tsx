import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Winepress Solar Services' website, solar calculator, and services.",
  alternates: { canonical: "https://winepresssolar.com/terms" },
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display font-black text-5xl text-foreground mb-8 uppercase tracking-tighter">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none text-secondary-text font-medium leading-relaxed">
          <p className="mb-6">By using the Winepress Solar Calculator, you agree to these terms.</p>
          <h2 className="text-foreground font-black text-xl uppercase tracking-wider mt-12 mb-4">Calculator Accuracy</h2>
          <p className="mb-6">The results provided by the calculator are estimates based on your input. A professional on-site audit is required for a final technical specification and binding quote.</p>
          <h2 className="text-foreground font-black text-xl uppercase tracking-wider mt-12 mb-4">Warranty</h2>
          <p className="mb-6">System warranties are provided on a per-contract basis and are subject to equipment manufacturer terms.</p>
        </div>
      </div>
    </main>
  );
}
