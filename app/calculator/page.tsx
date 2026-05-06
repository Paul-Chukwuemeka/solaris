"use client";

import React, { useState, useEffect } from "react";
import {
  Calculator,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Tv,
  Wind,
  Refrigerator,
  Plus,
  Minus,
  MapPin,
  CheckCircle2,
  Zap,
  MessageCircle,
  X,
  Loader2,
  User,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  calculateSystem,
  LoadItem,
  CalculationResult,
} from "@/lib/solar-engine";
import pricingConfig from "@/lib/pricing-config.json";
import {
  trackCalculatorStarted,
  trackCalculatorStepCompleted,
  trackCalculatorResultViewed,
  trackQuoteFormSubmitted,
  trackWhatsAppButtonClicked,
} from "@/lib/analytics";

const HOW_DID_YOU_HEAR_OPTIONS = [
  "Google Search",
  "Facebook / Instagram Ad",
  "WhatsApp",
  "Referral from a Friend",
  "Roadside Billboard",
  "Other",
];

const PRESET_LOADS = [
  { name: "LED Bulbs", watts: 10, icon: Lightbulb },
  { name: "Smart TV", watts: 100, icon: Tv },
  { name: "Standing Fan", watts: 60, icon: Wind },
  { name: "Fridge (Inverter)", watts: 150, icon: Refrigerator },
  { name: "AC (1HP Inverter)", watts: 800, icon: Wind },
];

export default function CalculatorPage() {
  const [step, setStep] = useState(1);
  const [region, setRegion] =
    useState<keyof typeof pricingConfig.regions>("enugu");
  const [batteryType, setBatteryType] = useState<"lithium" | "tubular">(
    "lithium",
  );
  const [systemPreference, setSystemPreference] = useState<
    "custom" | "generator"
  >("custom");
  const [selectedGenerator, setSelectedGenerator] = useState<string | null>(
    null,
  );
  const [showPathModal, setShowPathModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [loads, setLoads] = useState<LoadItem[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    source: "",
    notes: "",
  });
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Fire once on mount
  useEffect(() => {
    trackCalculatorStarted();
  }, []);

  // Auto-select recommended generator when load changes or step changes
  useEffect(() => {
    if (systemPreference === "generator" && step === 3) {
      const dailyWh = loads.reduce(
        (sum, item) => sum + item.watts * item.quantity * item.hours,
        0,
      );
      const recommendedGen = pricingConfig.equipment.solar_generators
        .slice()
        .sort((a, b) => a.max_wh - b.max_wh)
        .find((g) => g.max_wh >= dailyWh);

      if (recommendedGen && !selectedGenerator) {
        setSelectedGenerator(recommendedGen.name);
      }
    }
  }, [step, systemPreference, loads, selectedGenerator]);

  // Auto-recalculate when loads change on the results page
  useEffect(() => {
    if (step === 4) {
      const res = calculateSystem({
        loads,
        region,
        batteryType,
        systemTypePreference: systemPreference,
        selectedGeneratorName: selectedGenerator || undefined,
        systemVoltage: 48,
        batteryAutonomyDays: 1,
      });
      setResult(res);
    }
  }, [loads, region, batteryType, systemPreference, selectedGenerator, step]);

  const addLoad = (preset: (typeof PRESET_LOADS)[0]) => {
    const existing = loads.find((l) => l.name === preset.name);
    if (existing) {
      setLoads(
        loads.map((l) =>
          l.name === preset.name ? { ...l, quantity: l.quantity + 1 } : l,
        ),
      );
    } else {
      setLoads([
        ...loads,
        {
          id: preset.name,
          name: preset.name,
          watts: preset.watts,
          quantity: 1,
          hours: 8,
        },
      ]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setLoads(
      loads
        .map((l) => {
          if (l.id === id) {
            const newQty = Math.max(0, l.quantity + delta);
            return { ...l, quantity: newQty };
          }
          return l;
        })
        .filter((l) => l.quantity > 0),
    );
  };

  const updateHours = (id: string, hours: number) => {
    setLoads(loads.map((l) => (l.id === id ? { ...l, hours } : l)));
  };

  const validateLeadForm = () => {
    const errors: Record<string, string> = {};
    if (!leadForm.fullName.trim()) errors.fullName = "Name is required";
    if (!leadForm.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^(\+?234|0)[789]\d{9}$/.test(leadForm.phone.replace(/\s/g, "")))
      errors.phone = "Enter a valid Nigerian phone number";
    if (!leadForm.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email))
      errors.email = "Enter a valid email address";
    if (!leadForm.city.trim()) errors.city = "City / state is required";
    setLeadErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLeadForm() || !result) return;
    setIsSubmitting(true);
    try {
      const regionLabel =
        pricingConfig.regions[region as keyof typeof pricingConfig.regions]
          ?.label ?? region;
      const systemSpec =
        result.systemType === "generator"
          ? {
              type: "Portable Solar Generator",
              model: result.generatorName,
              dailyEnergyKwh: (result.dailyEnergyWh / 1000).toFixed(2),
              estimatedCostMin: result.estimatedCost.min,
              estimatedCostMax: result.estimatedCost.max,
            }
          : {
              type: "Custom Solar Installation",
              region: regionLabel,
              batteryType,
              dailyEnergyKwh: (result.dailyEnergyWh / 1000).toFixed(2),
              inverterKva: result.inverterKva,
              panelWatts: result.panelWattsRequired,
              batteryAh: result.batteryAhRequired,
              estimatedCostMin: result.estimatedCost.min,
              estimatedCostMax: result.estimatedCost.max,
            };

      const payload = {
        ...leadForm,
        region: regionLabel,
        systemSpec,
        loads: loads.map((l) => ({
          name: l.name,
          watts: l.watts,
          quantity: l.quantity,
          hours: l.hours,
        })),
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");
      trackQuoteFormSubmitted({
        region: pricingConfig.regions[region as keyof typeof pricingConfig.regions]?.label ?? region,
        systemType: result.systemType,
      });
      router.push("/thank-you");
    } catch {
      setLeadErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalculate = () => {
    const res = calculateSystem({
      loads,
      region,
      batteryType,
      systemTypePreference: systemPreference,
      selectedGeneratorName: selectedGenerator || undefined,
      systemVoltage: 48,
      batteryAutonomyDays: 1,
    });
    setResult(res);
    trackCalculatorStepCompleted(3, "Battery / System Preference Set");
    trackCalculatorResultViewed({
      region: pricingConfig.regions[region as keyof typeof pricingConfig.regions]?.label ?? region,
      systemType: res.systemType,
      dailyKwh: parseFloat((res.dailyEnergyWh / 1000).toFixed(2)),
      estimatedCostMin: res.estimatedCost.min,
      estimatedCostMax: res.estimatedCost.max,
    });
    setStep(4);
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar - Flat */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-[2px] transition-colors ${step >= s ? "bg-primary" : "bg-surface border border-border"}`}
            />
          ))}
        </div>

        {step === 1 && (
          <section className="animate-fade-in">
            <h1 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4 uppercase tracking-tighter">
              Where is the installation?
            </h1>
            <p className="text-secondary-text mb-12 font-medium">
              Solar performance depends on your local sun hours (PSH).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {Object.entries(pricingConfig.regions).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setRegion(key as keyof typeof pricingConfig.regions)}
                  className={`p-6 text-left border-2 rounded-[8px] transition-all flex justify-between items-center relative ${
                    region === key
                      ? "border-primary bg-surface"
                      : "border-border bg-background hover:bg-surface"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-black text-foreground uppercase tracking-wider">
                        {data.label}
                      </p>
                      {key === "enugu" && (
                        <span className="text-[8px] font-black uppercase tracking-widest bg-primary text-background px-2 py-0.5 rounded-[4px]">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-secondary-text font-bold">
                      Avg. {data.psh} Peak Sun Hours
                    </p>
                  </div>
                  <MapPin
                    className={region === key ? "text-primary" : "text-border"}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                trackCalculatorStepCompleted(1, "Region Selected");
                setStep(2);
              }}
              className="btn-flat btn-primary h-14 px-10 w-full sm:w-auto"
            >
              Continue to Load Setup
              <ArrowRight className="w-5 h-5" />
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="animate-fade-in">
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4 uppercase tracking-tighter">
              What are we powering?
            </h2>
            <p className="text-secondary-text mb-12 font-medium">
              Select common appliances to build your energy profile.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
              {PRESET_LOADS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => addLoad(p)}
                  className="p-4 bg-surface border border-border rounded-[8px] flex flex-col items-center gap-3 hover:border-primary transition-colors group"
                >
                  <p.icon className="w-6 h-6 text-secondary-text group-hover:text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-center">
                    {p.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="bg-surface border border-border rounded-[8px] p-8 mb-12">
              <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-primary">
                Your Energy List
              </h3>
              {loads.length === 0 ? (
                <p className="text-center py-10 text-secondary-text text-sm italic">
                  No appliances added yet.
                </p>
              ) : (
                <div className="space-y-6">
                  {loads.map((l) => (
                    <div
                      key={l.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-black text-foreground uppercase tracking-wider text-sm">
                          {l.name}
                        </p>
                        <p className="text-[10px] text-secondary-text font-bold">
                          {l.watts}W each
                        </p>
                      </div>
                      <div className="flex items-center gap-10">
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-black uppercase tracking-[0.1em] text-secondary-text">
                            Runtime (Hrs)
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="24"
                            value={l.hours}
                            onChange={(e) =>
                              updateHours(l.id, parseInt(e.target.value))
                            }
                            className="w-32 accent-primary"
                          />
                          <span className="text-[10px] font-bold text-foreground">
                            {l.hours} Hours/Day
                          </span>
                        </div>
                        <div className="flex items-center gap-4 bg-background border border-border p-1 rounded-[4px]">
                          <button
                            onClick={() => updateQuantity(l.id, -1)}
                            className="p-2 hover:text-primary"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-black text-sm min-w-[20px] text-center">
                            {l.quantity}
                          </span>
                          <button
                            onClick={() => addLoad(l as any)}
                            className="p-2 hover:text-primary"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setStep(1)}
                className="btn-flat btn-outline h-14 px-8"
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <button
                onClick={() => {
                  trackCalculatorStepCompleted(2, "Loads Configured");
                  const dailyWh = loads.reduce(
                    (sum, item) =>
                      sum + item.watts * item.quantity * item.hours,
                    0,
                  );
                  if (dailyWh > 0 && dailyWh < 2500) {
                    setShowPathModal(true);
                  } else {
                    setSystemPreference("custom");
                    setStep(3);
                  }
                }}
                disabled={loads.length === 0}
                className="btn-flat btn-primary h-14 px-10 flex-1 disabled:opacity-50"
              >
                Continue to System Specs
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        )}

        {/* Path Selection Modal */}
        {showPathModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in">
            <div className="bg-background max-w-2xl w-full p-10 md:p-16 border-4 border-primary rounded-[8px] relative shadow-xl">
              <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4 uppercase tracking-tighter">
                Choose Your Path
              </h2>
              <p className="text-secondary-text mb-12 font-medium">
                Your load is light enough for two different solutions. Which
                fits you best?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <button
                  onClick={() => {
                    setSystemPreference("generator");
                    setShowPathModal(false);
                    setStep(3);
                  }}
                  className="p-8 text-left border-2 border-border hover:border-primary transition-all group"
                >
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full mb-6 group-hover:bg-primary transition-colors">
                    <Zap className="text-primary group-hover:text-foreground" />
                  </div>
                  <h4 className="font-black uppercase tracking-tight text-xl mb-2">
                    Portable Station
                  </h4>
                  <p className="text-xs text-secondary-text font-bold uppercase tracking-widest leading-relaxed">
                    Fast, No-Install, Budget Friendly
                  </p>
                </button>

                <button
                  onClick={() => {
                    setSystemPreference("custom");
                    setShowPathModal(false);
                    setStep(3);
                  }}
                  className="p-8 text-left border-2 border-border hover:border-primary transition-all group"
                >
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full mb-6 group-hover:bg-primary transition-colors">
                    <CheckCircle2 className="text-primary group-hover:text-foreground" />
                  </div>
                  <h4 className="font-black uppercase tracking-tight text-xl mb-2">
                    Custom Install
                  </h4>
                  <p className="text-xs text-secondary-text font-bold uppercase tracking-widest leading-relaxed">
                    Full Home Backup, High Capacity
                  </p>
                </button>
              </div>

              <button
                onClick={() => setShowPathModal(false)}
                className="text-[10px] font-black uppercase tracking-widest text-secondary-text hover:text-foreground"
              >
                Go Back to Load List
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <section className="animate-fade-in max-w-4xl">
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4 uppercase tracking-tighter">
              {systemPreference === "generator"
                ? "Your Portable Station"
                : "Battery Preference"}
            </h2>
            <p className="text-secondary-text mb-12 font-medium">
              {systemPreference === "generator"
                ? "Based on your loads, we have highlighted the ideal match. Feel free to upgrade for more capacity."
                : "Lithium is more efficient and lasts longer; Tubular is more budget-friendly."}
            </p>

            {systemPreference === "custom" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <button
                  onClick={() => setBatteryType("lithium")}
                  className={`p-10 text-left border-4 rounded-[8px] transition-all relative ${
                    batteryType === "lithium"
                      ? "border-primary bg-surface"
                      : "border-border bg-background"
                  }`}
                >
                  <Zap
                    className={`w-8 h-8 mb-6 ${batteryType === "lithium" ? "text-primary" : "text-border"}`}
                  />
                  <h3 className="font-black text-xl text-foreground uppercase tracking-tighter mb-2">
                    Lithium (LFP)
                  </h3>
                  <p className="text-sm text-secondary-text leading-relaxed">
                    80% Depth of Discharge. 10+ years lifespan. Fast charging.
                    Premium efficiency.
                  </p>
                  {batteryType === "lithium" && (
                    <div className="absolute top-4 right-4 text-primary">
                      <CheckCircle2 />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setBatteryType("tubular")}
                  className={`p-10 text-left border-4 rounded-[8px] transition-all relative ${
                    batteryType === "tubular"
                      ? "border-primary bg-surface"
                      : "border-border bg-background"
                  }`}
                >
                  <Zap
                    className={`w-8 h-8 mb-6 ${batteryType === "tubular" ? "text-primary" : "text-border"}`}
                  />
                  <h3 className="font-black text-xl text-foreground uppercase tracking-tighter mb-2">
                    Tubular (Gel)
                  </h3>
                  <p className="text-sm text-secondary-text leading-relaxed">
                    50% Depth of Discharge. 3-5 years lifespan. Bulkier but
                    cost-effective for simple loads.
                  </p>
                  {batteryType === "tubular" && (
                    <div className="absolute top-4 right-4 text-primary">
                      <CheckCircle2 />
                    </div>
                  )}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in">
                {pricingConfig.equipment.solar_generators.map((gen) => {
                  const dailyWh = loads.reduce(
                    (sum, item) =>
                      sum + item.watts * item.quantity * item.hours,
                    0,
                  );
                  const recommendedGen =
                    pricingConfig.equipment.solar_generators
                      .slice()
                      .sort((a, b) => a.max_wh - b.max_wh)
                      .find((g) => g.max_wh >= dailyWh);

                  const isRecommended = recommendedGen?.name === gen.name;
                  const isSelected =
                    selectedGenerator === gen.name ||
                    (!selectedGenerator && isRecommended);

                  return (
                    <button
                      key={gen.name}
                      onClick={() => setSelectedGenerator(gen.name)}
                      className={`p-8 text-left border-4 rounded-[8px] transition-all flex flex-col relative group ${
                        isSelected
                          ? "border-primary bg-surface scale-[1.02] z-10 shadow-xl"
                          : "border-border bg-background opacity-60 hover:opacity-100"
                      }`}
                    >
                      {isRecommended && (
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-[#1A1A1B] text-[10px] font-black px-4 py-1 uppercase tracking-widest rounded-full">
                          Recommended
                        </span>
                      )}
                      {isSelected && !isRecommended && (
                        <div className="absolute top-4 right-4 text-primary">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}
                      <h3 className="font-display font-black text-2xl text-foreground mb-1 uppercase tracking-tighter">
                        {gen.name}
                      </h3>
                      <p className="text-[10px] font-black text-secondary-text uppercase tracking-widest mb-6">
                        {gen.label}
                      </p>

                      <div className="mt-auto pt-6 border-t border-border/50 w-full">
                        <div className="mb-4">
                          <p className="text-[10px] font-black text-secondary-text uppercase tracking-widest mb-1">
                            Capacity
                          </p>
                          <p className="text-sm font-bold text-foreground">
                            Up to {gen.max_wh}Wh Daily
                          </p>
                        </div>
                        <p className="text-[10px] font-black text-secondary-text uppercase tracking-widest mb-1">
                          Price
                        </p>
                        <p className="font-display font-black text-2xl text-primary tracking-tighter">
                          ₦{gen.cost.toLocaleString()}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setStep(2)}
                className="btn-flat btn-outline h-14 px-8"
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <button
                onClick={handleCalculate}
                className="btn-flat btn-primary h-14 px-10 flex-1"
              >
                {systemPreference === "generator"
                  ? "View Final Report"
                  : "Calculate My System"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        )}

        {step === 4 && result && (
          <section className="animate-fade-in max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                  <div>
                    <h2 className="font-display font-black text-5xl md:text-6xl text-foreground mb-2 uppercase tracking-tighter">
                      {result.systemType === "generator"
                        ? "Solar Station"
                        : "System Design"}
                    </h2>
                    <p className="text-secondary-text font-bold uppercase tracking-[0.3em] text-[10px]">
                      {result.systemType === "generator"
                        ? `Recommended Model: ${result.generatorName}`
                        : `Based on ${region} Solar Calibration`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mb-12">
                  <div className="bg-surface p-8">
                    <p className="text-secondary-text text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                      Daily Energy
                    </p>
                    <p className="font-display font-black text-5xl text-foreground tracking-tighter">
                      {(result.dailyEnergyWh / 1000).toFixed(1)}
                      <span className="text-xl ml-1 text-secondary-text">
                        kWh
                      </span>
                    </p>
                  </div>
                  <div className="bg-surface p-8">
                    <p className="text-secondary-text text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                      Recommended Output
                    </p>
                    <p className="font-display font-black text-5xl text-foreground tracking-tighter">
                      {result.systemType === "generator"
                        ? "Portable"
                        : `${result.inverterKva}kVA`}
                    </p>
                  </div>
                </div>

                <div className="bg-background border-4 border-primary p-12 mb-12 relative overflow-hidden">
                  <p className="text-secondary-text text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    Est. Total Investment
                  </p>
                  <p className="font-display font-black text-5xl text-foreground tracking-tighter mb-4">
                    ₦{(result.estimatedCost.min / 1000000).toFixed(1)}M - ₦
                    {(result.estimatedCost.max / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-8">
                    (₦{Math.round(result.estimatedCost.min).toLocaleString()} -
                    ₦{Math.round(result.estimatedCost.max).toLocaleString()})
                  </p>
                  <Calculator className="absolute -bottom-10 -right-10 w-64 h-64 text-foreground/5" />
                  <div className="relative z-10 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setShowLeadModal(true)}
                      className="flex-1 py-6 bg-primary text-[#1A1A1B] font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3"
                    >
                      Get My Exact Quote <ArrowRight className="w-4 h-4" />
                    </button>
                    {result && (
                      <a
                        href={`https://wa.me/2349166301384?text=${encodeURIComponent(
                          `Hi Wine Press Solar! I just used your calculator and got a system recommendation:\n\n` +
                          `📍 Region: ${pricingConfig.regions[region as keyof typeof pricingConfig.regions]?.label}\n` +
                          (result.systemType === "generator"
                            ? `⚡ System: Portable Solar Generator\n🔋 Model: ${result.generatorName}\n`
                            : `⚡ System: Custom Solar Installation\n🔆 Solar Array: ${result.panelWattsRequired}W\n🔋 Battery: ${result.batteryAhRequired}Ah (${batteryType})\n🔌 Inverter: ${result.inverterKva}kVA\n`) +
                          `📊 Daily Load: ${(result.dailyEnergyWh / 1000).toFixed(1)} kWh\n` +
                          `💰 Est. Cost: ₦${Math.round(result.estimatedCost.min).toLocaleString()} – ₦${Math.round(result.estimatedCost.max).toLocaleString()}\n\n` +
                          `I'd like to discuss a quote. Can you help?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppButtonClicked("calculator-results")}
                        className="py-6 px-8 border-2 border-primary text-primary font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-[#1A1A1B] transition-all flex items-center justify-center gap-3"
                      >
                        <MessageCircle className="w-4 h-4" /> Talk to an Expert
                      </a>
                    )}
                  </div>
                  <p className="relative z-10 mt-4 text-[9px] text-secondary-text font-bold uppercase tracking-widest">
                    * This is an indicative estimate. Final pricing depends on site survey, equipment availability, and current market rates.
                  </p>
                </div>

                <div className="bg-background border border-border p-10">
                  <h3 className="font-black text-xs uppercase tracking-[0.4em] text-primary mb-10">
                    System Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      {result.systemType === "custom" && (
                        <>
                          <div className="flex justify-between items-center border-b border-border pb-4">
                            <span className="text-xs font-bold text-secondary-text uppercase tracking-widest">
                              Solar Array
                            </span>
                            <span className="font-black text-foreground text-sm">
                              {result.panelWattsRequired} Watts
                            </span>
                          </div>
                          <div className="flex justify-between items-center border-b border-border pb-4">
                            <span className="text-xs font-bold text-secondary-text uppercase tracking-widest">
                              Storage Bank
                            </span>
                            <span className="font-black text-foreground text-sm">
                              {result.batteryAhRequired} Ah
                            </span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between items-center border-b border-border pb-4">
                        <span className="text-xs font-bold text-secondary-text uppercase tracking-widest">
                          Technology
                        </span>
                        <span className="font-black text-foreground text-sm uppercase">
                          {result.systemType === "generator"
                            ? "Lithium-Ion"
                            : batteryType}
                        </span>
                      </div>
                    </div>
                    <div className="bg-surface p-6 rounded-[8px]">
                      <h4 className="font-black text-[9px] uppercase tracking-widest text-secondary-text mb-4">
                        {result.systemType === "generator"
                          ? "Included Components"
                          : "Cost Breakdown"}
                      </h4>
                      <div className="space-y-2">
                        {result.systemType === "custom" ? (
                          <>
                            <div className="flex justify-between text-[10px] font-bold text-foreground">
                              <span>Panels & Racking</span>
                              <span>
                                ₦
                                {Math.round(
                                  result.breakdown.panels,
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-foreground">
                              <span>Battery Bank</span>
                              <span>
                                ₦
                                {Math.round(
                                  result.breakdown.batteries,
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-foreground">
                              <span>Inverter & Gear</span>
                              <span>
                                ₦
                                {Math.round(
                                  result.breakdown.inverter,
                                ).toLocaleString()}
                              </span>
                            </div>
                          </>
                        ) : (
                          <p className="text-[10px] font-bold text-foreground uppercase tracking-wider leading-relaxed">
                            Includes Internal Inverter, BMS, MPPT Controller,
                            and Installation Kit.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => setStep(3)}
                    className="btn-flat btn-outline h-14 px-8"
                  >
                    <ArrowLeft className="w-5 h-5" /> Back
                  </button>
                </div>
              </div>

              {/* Refinement Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-surface border-2 border-border p-8 rounded-[8px] sticky top-32">
                  <h3 className="font-display font-black text-xl text-foreground mb-6 uppercase tracking-tighter">
                    Refine Your Loads
                  </h3>
                  <p className="text-[10px] text-secondary-text font-bold mb-8 leading-relaxed uppercase tracking-wider">
                    Adjust runtime or quantity to see real-time price updates.
                  </p>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {loads.map((load) => {
                      const Icon =
                        PRESET_LOADS.find((p) => p.name === load.name)?.icon ||
                        Zap;
                      return (
                        <div
                          key={load.id}
                          className="p-4 border border-border bg-background rounded-[4px] group"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground flex items-center gap-2">
                              <Icon className="w-3 h-3 text-primary" />
                              {load.name}
                            </span>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(load.id, -1)}
                                className="w-6 h-6 border border-border flex items-center justify-center hover:border-primary text-secondary-text hover:text-primary transition-colors font-bold"
                              >
                                -
                              </button>
                              <span className="text-xs font-black w-4 text-center">
                                {load.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(load.id, 1)}
                                className="w-6 h-6 border border-border flex items-center justify-center hover:border-primary text-secondary-text hover:text-primary transition-colors font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] font-black text-secondary-text uppercase tracking-widest">
                                Daily Usage
                              </span>
                              <span className="text-[10px] font-black text-primary">
                                {load.hours} Hours
                              </span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="24"
                              value={load.hours}
                              onChange={(e) =>
                                updateHours(load.id, parseInt(e.target.value))
                              }
                              className="w-full accent-primary h-1 bg-surface rounded-full appearance-none cursor-pointer"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full mt-8 py-4 border border-border text-[10px] font-black uppercase tracking-widest hover:bg-background transition-colors"
                  >
                    Add More Appliances
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Lead Capture Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 animate-fade-in">
          <div className="bg-background w-full max-w-2xl border-2 border-border rounded-[8px] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-8 border-b border-border">
              <div>
                <h2 className="font-display font-black text-2xl text-foreground uppercase tracking-tighter mb-1">
                  Get Your Exact Quote
                </h2>
                <p className="text-secondary-text text-xs font-bold">
                  Our team will review your system spec and contact you within 24 hours.
                </p>
              </div>
              <button
                onClick={() => { setShowLeadModal(false); setLeadErrors({}); }}
                className="p-2 border border-border rounded-[8px] hover:bg-surface transition-colors ml-4 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* System Spec Summary */}
            {result && (
              <div className="mx-8 mt-6 p-4 bg-surface border border-border rounded-[8px]">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-3">
                  Your System Spec (auto-attached)
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                  <div className="text-[10px] text-secondary-text font-bold">Daily Load</div>
                  <div className="text-[10px] text-foreground font-black">{(result.dailyEnergyWh / 1000).toFixed(1)} kWh</div>
                  {result.systemType === "custom" ? (
                    <>
                      <div className="text-[10px] text-secondary-text font-bold">Inverter</div>
                      <div className="text-[10px] text-foreground font-black">{result.inverterKva} kVA</div>
                      <div className="text-[10px] text-secondary-text font-bold">Solar Array</div>
                      <div className="text-[10px] text-foreground font-black">{result.panelWattsRequired}W</div>
                      <div className="text-[10px] text-secondary-text font-bold">Battery</div>
                      <div className="text-[10px] text-foreground font-black">{result.batteryAhRequired}Ah ({batteryType})</div>
                    </>
                  ) : (
                    <>
                      <div className="text-[10px] text-secondary-text font-bold">System</div>
                      <div className="text-[10px] text-foreground font-black">{result.generatorName}</div>
                    </>
                  )}
                  <div className="text-[10px] text-secondary-text font-bold">Est. Cost</div>
                  <div className="text-[10px] text-primary font-black">
                    ₦{Math.round(result.estimatedCost.min).toLocaleString()} – ₦{Math.round(result.estimatedCost.max).toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLeadSubmit} noValidate className="p-8 space-y-5">
              {leadErrors.form && (
                <div className="p-4 border border-red-400 bg-red-50 dark:bg-red-900/20 rounded-[8px] text-red-600 dark:text-red-400 text-xs font-bold">
                  {leadErrors.form}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary-text flex items-center gap-2">
                    <User className="w-3 h-3" /> Full Name *
                  </label>
                  <input
                    type="text"
                    value={leadForm.fullName}
                    onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                    placeholder="e.g. Tunde Williams"
                    className={`w-full h-12 px-4 bg-surface border rounded-[8px] text-sm font-medium text-foreground placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-colors ${leadErrors.fullName ? "border-red-400" : "border-border"}`}
                  />
                  {leadErrors.fullName && <p className="text-red-500 text-[9px] font-bold">{leadErrors.fullName}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary-text flex items-center gap-2">
                    <Phone className="w-3 h-3" /> WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="e.g. 08012345678"
                    className={`w-full h-12 px-4 bg-surface border rounded-[8px] text-sm font-medium text-foreground placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-colors ${leadErrors.phone ? "border-red-400" : "border-border"}`}
                  />
                  {leadErrors.phone && <p className="text-red-500 text-[9px] font-bold">{leadErrors.phone}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary-text flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email Address *
                  </label>
                  <input
                    type="email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    placeholder="e.g. tunde@gmail.com"
                    className={`w-full h-12 px-4 bg-surface border rounded-[8px] text-sm font-medium text-foreground placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-colors ${leadErrors.email ? "border-red-400" : "border-border"}`}
                  />
                  {leadErrors.email && <p className="text-red-500 text-[9px] font-bold">{leadErrors.email}</p>}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary-text flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> City / State *
                  </label>
                  <input
                    type="text"
                    value={leadForm.city}
                    onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                    placeholder="e.g. Ikeja, Lagos"
                    className={`w-full h-12 px-4 bg-surface border rounded-[8px] text-sm font-medium text-foreground placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-colors ${leadErrors.city ? "border-red-400" : "border-border"}`}
                  />
                  {leadErrors.city && <p className="text-red-500 text-[9px] font-bold">{leadErrors.city}</p>}
                </div>
              </div>

              {/* How did you hear */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary-text">
                  How did you hear about us? (Optional)
                </label>
                <div className="relative">
                  <select
                    value={leadForm.source}
                    onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })}
                    className="w-full h-12 px-4 pr-10 bg-surface border border-border rounded-[8px] text-sm font-medium text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="">Select an option...</option>
                    {HOW_DID_YOU_HEAR_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text pointer-events-none" />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary-text">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={leadForm.notes}
                  onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                  placeholder="e.g. I'd like installation in 2 weeks, or I have questions about financing..."
                  rows={3}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-[8px] text-sm font-medium text-foreground placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn-flat btn-primary h-14 text-xs uppercase tracking-widest disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4" /> Send My Quote Request</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowLeadModal(false); setLeadErrors({}); }}
                  className="btn-flat btn-outline h-14 px-8 text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>

              <p className="text-[9px] text-secondary-text font-bold text-center leading-relaxed">
                By submitting, you agree to be contacted by Wine Press Solar Services. We never share your data with third parties.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
