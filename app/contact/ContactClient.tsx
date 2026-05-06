"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Loader2,
  AlertCircle,
  Calculator,
} from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const SERVICES = [
  "Full Solar System (Panels + Inverter + Battery)",
  "Solar Panels Only",
  "Inverter + Battery Only",
  "Battery Upgrade / Replacement",
  "Maintenance & Repair",
  "Energy Audit",
  "Not Sure — Need Advice",
];

const SYSTEM_SIZES = [
  "Small (1–3kVA) — Basic home backup",
  "Medium (3–5kVA) — Home with AC",
  "Large (5–10kVA) — Large home / SME",
  "Commercial (10kVA+) — Office / industrial",
  "Not Sure",
];

const TIMELINES = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "Just researching for now",
];

type FieldErrors = Record<string, string[] | undefined>;

export default function ContactClient() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    systemSize: "",
    timeline: "",
    notes: "",
  });

  const set = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          city: form.city,
          source: "contact-page",
          notes: [
            form.service && `Service: ${form.service}`,
            form.systemSize && `System size: ${form.systemSize}`,
            form.timeline && `Timeline: ${form.timeline}`,
            form.notes,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors ?? {});
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <main className="min-h-screen bg-background pt-32 pb-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-[8px] mb-8">
            <CheckCircle className="w-8 h-8 text-background" />
          </div>
          <h1 className="font-display font-black text-4xl text-foreground uppercase tracking-tighter mb-4">
            Request Received!
          </h1>
          <p className="text-secondary-text text-base font-medium leading-relaxed mb-10 max-w-md mx-auto">
            Thank you, <span className="text-foreground font-black">{form.fullName}</span>. Our team will review your request and contact you on{" "}
            <span className="text-foreground font-black">{form.phone}</span> within 24 hours.
          </p>
          <div className="bg-surface border border-border rounded-[8px] p-8 mb-8 text-left space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-secondary-text">What happens next</p>
            {[
              "Our engineers review your requirements",
              "A consultant calls your WhatsApp within 24 hours",
              "You receive a fixed-price itemised quote",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="font-display font-black text-primary text-lg leading-none shrink-0 mt-0.5">0{i + 1}</span>
                <p className="text-sm text-foreground font-medium">{step}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2349166301384"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-flat btn-primary h-14 px-10 text-xs uppercase tracking-widest"
            >
              <MessageCircle className="w-4 h-4" /> Chat Now on WhatsApp
            </a>
            <Link href="/" className="btn-flat btn-outline h-14 px-10 text-xs uppercase tracking-widest">
              Back to Home <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <p className="text-primary font-black tracking-widest uppercase text-xs mb-4">Free Quote</p>
        <h1 className="font-display font-black text-5xl md:text-6xl text-foreground leading-none tracking-tighter mb-6 max-w-3xl">
          Let's Build Your<br />
          <span className="text-primary italic">Solar System.</span>
        </h1>
        <p className="text-secondary-text max-w-xl text-base font-medium leading-relaxed">
          Fill in the form and our engineers will review your requirements and send you a formal, fixed-price quote within 24 hours. No obligation, no hard sell.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">

          {/* Form */}
          <div className="bg-surface border border-border rounded-[8px] p-8 md:p-12">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">

              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary-text mb-2">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={set("fullName")}
                    placeholder="Chukwuemeka Obi"
                    required
                    className={`w-full h-12 px-4 bg-background border rounded-[8px] text-sm font-medium text-foreground placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-colors ${errors.fullName ? "border-red-500" : "border-border"}`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-[10px] font-bold mt-1">{errors.fullName[0]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary-text mb-2">
                    WhatsApp / Phone <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+234 816 000 0000"
                    required
                    className={`w-full h-12 px-4 bg-background border rounded-[8px] text-sm font-medium text-foreground placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-colors ${errors.phone ? "border-red-500" : "border-border"}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-[10px] font-bold mt-1">{errors.phone[0]}</p>
                  )}
                </div>
              </div>

              {/* Email + City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary-text mb-2">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    required
                    className={`w-full h-12 px-4 bg-background border rounded-[8px] text-sm font-medium text-foreground placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-colors ${errors.email ? "border-red-500" : "border-border"}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] font-bold mt-1">{errors.email[0]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary-text mb-2">
                    City / State <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={set("city")}
                    placeholder="Enugu, Lagos, Abuja…"
                    required
                    className={`w-full h-12 px-4 bg-background border rounded-[8px] text-sm font-medium text-foreground placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-colors ${errors.city ? "border-red-500" : "border-border"}`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-[10px] font-bold mt-1">{errors.city[0]}</p>
                  )}
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-secondary-text mb-2">
                  What do you need?
                </label>
                <select
                  value={form.service}
                  onChange={set("service")}
                  className="w-full h-12 px-4 bg-background border border-border rounded-[8px] text-sm font-medium text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="">Select a service…</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* System size + Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary-text mb-2">
                    Estimated System Size
                  </label>
                  <select
                    value={form.systemSize}
                    onChange={set("systemSize")}
                    className="w-full h-12 px-4 bg-background border border-border rounded-[8px] text-sm font-medium text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="">Select size…</option>
                    {SYSTEM_SIZES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-secondary-text mb-2">
                    Timeline
                  </label>
                  <select
                    value={form.timeline}
                    onChange={set("timeline")}
                    className="w-full h-12 px-4 bg-background border border-border rounded-[8px] text-sm font-medium text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="">Select timeline…</option>
                    {TIMELINES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-secondary-text mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={set("notes")}
                  rows={4}
                  placeholder="Tell us about your property, appliances, or any specific requirements…"
                  className="w-full px-4 py-3 bg-background border border-border rounded-[8px] text-sm font-medium text-foreground placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Error banner */}
              {formState === "error" && Object.keys(errors).length === 0 && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-[8px] px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <p className="text-red-500 text-sm font-medium">Something went wrong. Please try again or contact us on WhatsApp.</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="btn-flat btn-primary h-14 px-10 text-xs uppercase tracking-widest w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formState === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Get My Free Quote <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-secondary-text text-[10px] font-bold text-center uppercase tracking-widest">
                No spam. No obligation. Response within 24 hours.
              </p>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">

            {/* WhatsApp shortcut */}
            <div className="bg-primary rounded-[8px] p-8 text-background">
              <MessageCircle className="w-6 h-6 text-background/70 mb-4" />
              <h3 className="font-display font-black text-lg text-background tracking-tighter mb-2">
                Prefer to Chat Directly?
              </h3>
              <p className="text-background/80 text-sm font-medium leading-relaxed mb-6">
                Our team is on WhatsApp Monday–Saturday, 8am–6pm. Get a fast response right now.
              </p>
              <a
                href="https://wa.me/2349166301384"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-flat h-12 px-6 text-xs uppercase tracking-widest bg-background text-primary hover:bg-surface w-full justify-center"
              >
                <MessageCircle className="w-4 h-4" /> Open WhatsApp
              </a>
            </div>

            {/* Calculator CTA */}
            <div className="bg-surface border border-border rounded-[8px] p-8">
              <Calculator className="w-5 h-5 text-primary mb-4" />
              <h3 className="font-display font-black text-base text-foreground uppercase tracking-tighter mb-2">
                Know Your Spec First?
              </h3>
              <p className="text-secondary-text text-sm font-medium leading-relaxed mb-5">
                Use our free solar calculator to size your system before requesting a quote — you'll get a more accurate response faster.
              </p>
              <Link href="/calculator" className="btn-flat btn-outline h-11 px-6 text-xs uppercase tracking-widest w-full justify-center">
                Free Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Contact details */}
            <div className="bg-surface border border-border rounded-[8px] p-8 space-y-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary-text">Head Office</p>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 border border-primary rounded-[4px] flex items-center justify-center text-primary shrink-0">
                  <MapPin size={16} />
                </div>
                <p className="text-sm text-foreground font-medium leading-relaxed">
                  Shop 13, POWA Plaza,<br />By Ogui Police Station,<br />Enugu, Nigeria
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 border border-primary rounded-[4px] flex items-center justify-center text-primary shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <a href="tel:+2349166301384" className="text-sm text-foreground font-medium hover:text-primary transition-colors">
                    +234 916 630 1384
                  </a>
                  <p className="text-[10px] text-secondary-text font-bold mt-0.5 flex items-center gap-1">
                    <Clock size={10} /> Mon–Sat 8am–6pm
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 border border-primary rounded-[4px] flex items-center justify-center text-primary shrink-0">
                  <Mail size={16} />
                </div>
                <a href="mailto:hello@winepresssolar.com" className="text-sm text-foreground font-medium hover:text-primary transition-colors">
                  hello@winepresssolar.com
                </a>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}
