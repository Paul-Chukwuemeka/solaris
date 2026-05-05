import React from "react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display font-black text-5xl text-foreground mb-8 uppercase tracking-tighter">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none text-secondary-text font-medium leading-relaxed">
          <p className="mb-6">At Wine Press Solar Services, we take your privacy seriously. This policy explains how we collect and use your data when you use our solar calculator.</p>
          <h2 className="text-foreground font-black text-xl uppercase tracking-wider mt-12 mb-4">Data Collection</h2>
          <p className="mb-6">We collect your appliance selections and regional data solely to provide you with an accurate solar system recommendation.</p>
          <h2 className="text-foreground font-black text-xl uppercase tracking-wider mt-12 mb-4">Contact Information</h2>
          <p className="mb-6">If you choose to share your results with us via WhatsApp, your phone number and system specifications will be used only for providing a formal quote.</p>
        </div>
      </div>
    </main>
  );
}
