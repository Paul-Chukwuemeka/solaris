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
  Home,
  Building2,
  ShoppingBag,
  HelpCircle,
  Fan,
  AirVent,
  Microwave,
  Coffee,
  WashingMachine,
  Droplets,
  Laptop,
  Monitor,
  Wifi,
  Printer,
  Cctv,
  Speaker,
  Plug,
  BatteryCharging,
  Copy,
  Check,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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

type InstallationContext = "home" | "office" | "shop" | "other";

const INSTALLATION_CONTEXTS: {
  id: InstallationContext;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}[] = [
  {
    id: "home",
    label: "Home / Residence",
    sublabel: "Apartment, bungalow, duplex, or estate",
    icon: Home,
  },
  {
    id: "office",
    label: "Office / Business",
    sublabel: "Corporate office, co-working, or workspace",
    icon: Building2,
  },
  {
    id: "shop",
    label: "Shop / Retail",
    sublabel: "Store, pharmacy, supermarket, or kiosk",
    icon: ShoppingBag,
  },
  {
    id: "other",
    label: "Other / Not Sure",
    sublabel: "Farm, school, place of worship, or mixed use",
    icon: HelpCircle,
  },
];

const CONTEXT_COPY: Record<InstallationContext, { heading: string; sub: string }> = {
  home: {
    heading: "What appliances are you powering?",
    sub: "Select everything you want to run on solar at home.",
  },
  office: {
    heading: "What office equipment needs power?",
    sub: "Select all equipment that should run on solar in your workspace.",
  },
  shop: {
    heading: "What does your business need to power?",
    sub: "Select all equipment and appliances in your shop or store.",
  },
  other: {
    heading: "What are we powering?",
    sub: "Select all appliances and equipment that need solar power.",
  },
};

const HOW_DID_YOU_HEAR_OPTIONS = [
  "Google Search",
  "Facebook / Instagram Ad",
  "WhatsApp",
  "Referral from a Friend",
  "Roadside Billboard",
  "Other",
];

interface PresetAppliance {
  name: string;
  watts: number;
  icon: React.ElementType;
}

interface PresetCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  appliances: PresetAppliance[];
}

const PRESET_CATEGORIES: PresetCategory[] = [
  {
    id: "lighting",
    label: "Lighting",
    icon: Lightbulb,
    appliances: [
      { name: "LED Bulb", watts: 10, icon: Lightbulb },
      { name: "Fluorescent Tube", watts: 36, icon: Lightbulb },
      { name: "Security / Flood Light", watts: 30, icon: Lightbulb },
    ],
  },
  {
    id: "cooling",
    label: "Cooling",
    icon: Fan,
    appliances: [
      { name: "Ceiling Fan", watts: 75, icon: Fan },
      { name: "Standing Fan", watts: 60, icon: Wind },
      { name: "AC (1HP Inverter)", watts: 800, icon: AirVent },
      { name: "AC (1.5HP Inverter)", watts: 1200, icon: AirVent },
      { name: "AC (2HP Inverter)", watts: 1500, icon: AirVent },
    ],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    icon: Microwave,
    appliances: [
      { name: "Fridge (Inverter)", watts: 150, icon: Refrigerator },
      { name: "Chest Freezer", watts: 200, icon: Refrigerator },
      { name: "Microwave", watts: 1000, icon: Microwave },
      { name: "Electric Kettle", watts: 1500, icon: Coffee },
      { name: "Blender", watts: 400, icon: Zap },
    ],
  },
  {
    id: "entertainment",
    label: "Entertainment",
    icon: Tv,
    appliances: [
      { name: "LED TV 43\"", watts: 80, icon: Tv },
      { name: "LED TV 55\"", watts: 120, icon: Tv },
      { name: "DSTV Decoder", watts: 25, icon: Tv },
      { name: "Home Theatre", watts: 150, icon: Speaker },
      { name: "CCTV System", watts: 50, icon: Cctv },
    ],
  },
  {
    id: "computing",
    label: "Computing",
    icon: Laptop,
    appliances: [
      { name: "Laptop", watts: 65, icon: Laptop },
      { name: "Desktop PC", watts: 250, icon: Monitor },
      { name: "Wi-Fi Router", watts: 15, icon: Wifi },
      { name: "Network Switch", watts: 20, icon: Wifi },
    ],
  },
  {
    id: "water",
    label: "Water / Utility",
    icon: Droplets,
    appliances: [
      { name: "Water Pump (0.5HP)", watts: 375, icon: Droplets },
      { name: "Water Pump (1HP)", watts: 750, icon: Droplets },
      { name: "Washing Machine", watts: 500, icon: WashingMachine },
      { name: "Water Dispenser", watts: 100, icon: Droplets },
    ],
  },
  {
    id: "office",
    label: "Office / Shop",
    icon: Printer,
    appliances: [
      { name: "Printer / Copier", watts: 400, icon: Printer },
      { name: "POS Terminal", watts: 30, icon: Plug },
      { name: "Cash Register", watts: 20, icon: Plug },
      { name: "Hair Dryer", watts: 1800, icon: Wind },
    ],
  },
];

const AUTONOMY_OPTIONS = [
  {
    id: "6h",
    label: "6 Hours",
    sublabel: "Essential backup — lights, phone, fan",
    days: 0.25,
    icon: "⚡",
  },
  {
    id: "12h",
    label: "12 Hours",
    sublabel: "Half-day comfort — TV, fridge, basics",
    days: 0.5,
    icon: "🌗",
  },
  {
    id: "24h",
    label: "24 Hours",
    sublabel: "Full-day independence — all appliances",
    days: 1,
    icon: "☀️",
  },
  {
    id: "full",
    label: "Full Independence",
    sublabel: "2 days backup — generator-free living",
    days: 2,
    icon: "🏆",
  },
];

const BUDGET_OPTIONS = [
  { id: "under-500k", label: "Under ₦500k", sublabel: "Entry-level — small solar generators", tier: 1 },
  { id: "500k-1m", label: "₦500k – ₦1M", sublabel: "Basic home backup — essential appliances", tier: 2 },
  { id: "1m-2.5m", label: "₦1M – ₦2.5M", sublabel: "Mid-range — full home coverage", tier: 3 },
  { id: "2.5m-5m", label: "₦2.5M – ₦5M", sublabel: "Premium — inverter AC, full independence", tier: 4 },
  { id: "5m-plus", label: "₦5M+", sublabel: "Commercial grade — high capacity & autonomy", tier: 5 },
  { id: "flexible", label: "Flexible", sublabel: "Open budget — I want the best fit for my needs", tier: 0 },
];

export default function CalculatorClient() {
  const [step, setStep] = useState(0);
  const [installationContext, setInstallationContext] = useState<InstallationContext | null>(null);
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
  const [activeCategory, setActiveCategory] = useState<string>(PRESET_CATEGORIES[0].id);
  const [customName, setCustomName] = useState("");
  const [customWatts, setCustomWatts] = useState("");
  const [autonomyDays, setAutonomyDays] = useState<number>(1);
  const [budgetRange, setBudgetRange] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fire once on mount
  useEffect(() => {
    trackCalculatorStarted();
  }, []);

  // Hydrate from ?share= query param
  useEffect(() => {
    const encoded = searchParams.get("share");
    if (!encoded) return;
    try {
      const snapshot = JSON.parse(atob(encoded));
      if (snapshot.result) {
        setResult(snapshot.result);
        if (snapshot.region) setRegion(snapshot.region);
        if (snapshot.batteryType) setBatteryType(snapshot.batteryType);
        if (snapshot.autonomyDays) setAutonomyDays(snapshot.autonomyDays);
        if (snapshot.budgetRange) setBudgetRange(snapshot.budgetRange);
        setStep(6);
      }
    } catch {
      // malformed share param — silently ignore, start fresh
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-select recommended generator when load changes or step changes
  useEffect(() => {
    if (systemPreference !== "generator" || step !== 3) return;

    const dailyWh = loads.reduce(
      (sum, item) => sum + item.watts * item.quantity * item.hours,
      0,
    );
    const recommendedGen = pricingConfig.equipment.solar_generators
      .slice()
      .sort((a, b) => a.max_wh - b.max_wh)
      .find((g) => g.max_wh >= dailyWh);

    if (recommendedGen && !selectedGenerator) {
      const id = setTimeout(() => setSelectedGenerator(recommendedGen.name), 0);
      return () => clearTimeout(id);
    }
  }, [step, systemPreference, loads, selectedGenerator]);

  // Auto-recalculate when loads change on the results page
  useEffect(() => {
    if (step !== 6) return;
    const id = setTimeout(() => {
      const res = calculateSystem({
        loads,
        region,
        batteryType,
        systemTypePreference: systemPreference,
        selectedGeneratorName: selectedGenerator || undefined,
        systemVoltage: 48,
        batteryAutonomyDays: autonomyDays,
      });
      setResult(res);
    }, 0);
    return () => clearTimeout(id);
  }, [loads, region, batteryType, systemPreference, selectedGenerator, autonomyDays, step]);

  const addLoad = (preset: PresetAppliance) => {
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

  const addCustomLoad = () => {
    const watts = parseInt(customWatts);
    if (!customName.trim() || isNaN(watts) || watts <= 0) return;
    const name = customName.trim();
    const existing = loads.find((l) => l.name === name);
    if (existing) {
      setLoads(loads.map((l) => l.name === name ? { ...l, quantity: l.quantity + 1 } : l));
    } else {
      setLoads([...loads, { id: name, name, watts, quantity: 1, hours: 8 }]);
    }
    setCustomName("");
    setCustomWatts("");
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
        installationContext: installationContext ?? "other",
        region: regionLabel,
        budgetRange: BUDGET_OPTIONS.find((o) => o.id === budgetRange)?.label ?? "Not specified",
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
      batteryAutonomyDays: autonomyDays,
    });
    setResult(res);
    trackCalculatorStepCompleted(6, "System Calculated");
    trackCalculatorResultViewed({
      region: pricingConfig.regions[region as keyof typeof pricingConfig.regions]?.label ?? region,
      systemType: res.systemType,
      dailyKwh: parseFloat((res.dailyEnergyWh / 1000).toFixed(2)),
      estimatedCostMin: res.estimatedCost.min,
      estimatedCostMax: res.estimatedCost.max,
    });
    setStep(6);
  };

  const handleStartOver = () => {
    setStep(0);
    setInstallationContext(null);
    setRegion("enugu");
    setBatteryType("lithium");
    setSystemPreference("custom");
    setSelectedGenerator(null);
    setLoads([]);
    setResult(null);
    setAutonomyDays(1);
    setBudgetRange(null);
    setActiveCategory(PRESET_CATEGORIES[0].id);
    setCustomName("");
    setCustomWatts("");
    setCopied(false);
    // Remove share param from URL without a full page reload
    window.history.replaceState({}, "", "/calculator");
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar - 7 steps (0-6, results is step 6) */}
        <div className="flex gap-2 mb-12">
          {[0, 1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-[2px] transition-colors ${step > s ? "bg-primary" : step === s ? "bg-primary/60" : "bg-surface border border-border"}`}
            />
          ))}
        </div>

        {step === 0 && (
          <section className="animate-fade-in">
            <h1 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4 uppercase tracking-tighter">
              What are we installing for?
            </h1>
            <p className="text-secondary-text mb-12 font-medium">
              This helps us tailor your appliance list and system recommendation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {INSTALLATION_CONTEXTS.map(({ id, label, sublabel, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setInstallationContext(id);
                    trackCalculatorStepCompleted(0, `Context: ${label}`);
                    setStep(1);
                  }}
                  className={`p-8 text-left border-2 rounded-[8px] transition-all group hover:border-primary hover:bg-surface ${
                    installationContext === id
                      ? "border-primary bg-surface"
                      : "border-border bg-background"
                  }`}
                >
                  <div className="w-12 h-12 border-2 border-primary rounded-[4px] flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-background transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="font-black text-foreground uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-xs text-secondary-text font-bold">{sublabel}</p>
                </button>
              ))}
            </div>
          </section>
        )}

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
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="animate-fade-in">
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4 uppercase tracking-tighter">
              {installationContext ? CONTEXT_COPY[installationContext].heading : "What are we powering?"}
            </h2>
            <p className="text-secondary-text mb-12 font-medium">
              {installationContext ? CONTEXT_COPY[installationContext].sub : "Select common appliances to build your energy profile."}
            </p>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {PRESET_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-[8px] text-[10px] font-black uppercase tracking-widest border transition-colors ${
                      activeCategory === cat.id
                        ? "bg-primary text-background border-primary"
                        : "bg-background border-border text-secondary-text hover:border-primary hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Appliance grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {PRESET_CATEGORIES.find((c) => c.id === activeCategory)?.appliances.map((p) => {
                const Icon = p.icon;
                const isAdded = loads.some((l) => l.name === p.name);
                return (
                  <button
                    key={p.name}
                    onClick={() => addLoad(p)}
                    className={`p-4 text-left border rounded-[8px] flex flex-col gap-2 transition-colors group ${
                      isAdded
                        ? "border-primary bg-surface"
                        : "border-border bg-background hover:border-primary hover:bg-surface"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isAdded ? "text-primary" : "text-secondary-text group-hover:text-primary"}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-tight">
                      {p.name}
                    </span>
                    <span className="text-[9px] font-bold text-secondary-text">{p.watts}W</span>
                  </button>
                );
              })}
            </div>

            {/* Custom appliance entry */}
            <div className="border border-dashed border-border rounded-[8px] p-6 mb-10">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary-text mb-4">
                Add a custom appliance
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCustomLoad()}
                  placeholder="Appliance name (e.g. Fish Pond Pump)"
                  className="flex-1 h-11 px-4 bg-background border border-border rounded-[8px] text-sm font-medium text-foreground placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-colors"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={customWatts}
                    onChange={(e) => setCustomWatts(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomLoad()}
                    placeholder="Watts"
                    min="1"
                    className="w-28 h-11 px-4 bg-background border border-border rounded-[8px] text-sm font-medium text-foreground placeholder:text-secondary-text/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    onClick={addCustomLoad}
                    disabled={!customName.trim() || !customWatts || parseInt(customWatts) <= 0}
                    className="h-11 px-5 bg-primary text-background font-black text-[10px] uppercase tracking-widest rounded-[8px] hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
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
                          <label className="text-[9px] font-black uppercase tracking-widest text-secondary-text">
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
                            onClick={() => updateQuantity(l.id, 1)}
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
                onClick={() => {
                  trackCalculatorStepCompleted(3, "Battery Type Set");
                  if (systemPreference === "generator") {
                    setStep(5);
                  } else {
                    setStep(4);
                  }
                }}
                className="btn-flat btn-primary h-14 px-10 flex-1"
              >
                {systemPreference === "generator"
                  ? "Continue"
                  : "Set Backup Duration"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        )}

        {step === 4 && systemPreference === "custom" && (
          <section className="animate-fade-in max-w-4xl">
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4 uppercase tracking-tighter">
              How Long Should Your Battery Last?
            </h2>
            <p className="text-secondary-text mb-12 font-medium">
              Choose your backup duration. Longer autonomy means more battery storage — and a bigger but more resilient system.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {AUTONOMY_OPTIONS.map((opt) => {
                const isSelected = autonomyDays === opt.days;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setAutonomyDays(opt.days)}
                    className={`p-8 text-left border-4 rounded-[8px] transition-all relative group ${
                      isSelected
                        ? "border-primary bg-surface"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-3xl">{opt.icon}</span>
                      <div>
                        <h3 className="font-black text-xl text-foreground uppercase tracking-tighter">
                          {opt.label}
                        </h3>
                        <p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest">
                          {opt.days < 1
                            ? `${opt.days * 24}h autonomy`
                            : `${opt.days === 1 ? "1 day" : `${opt.days} days`} autonomy`}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-secondary-text leading-relaxed">
                      {opt.sublabel}
                    </p>
                    {isSelected && (
                      <div className="absolute top-4 right-4 text-primary">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="bg-surface border border-border rounded-[8px] p-6 mb-10 flex items-start gap-4">
              <BatteryCharging className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-secondary-text font-medium leading-relaxed">
                <span className="text-foreground font-bold">How it works: </span>
                Your battery bank is sized to power your selected appliances for the chosen duration with no solar input (e.g. at night or on cloudy days). More autonomy = more batteries = higher upfront cost but greater energy independence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setStep(3)}
                className="btn-flat btn-outline h-14 px-8"
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <button
                onClick={() => {
                  trackCalculatorStepCompleted(4, `Autonomy: ${AUTONOMY_OPTIONS.find((o) => o.days === autonomyDays)?.label ?? autonomyDays}`);
                  setStep(5);
                }}
                className="btn-flat btn-primary h-14 px-10 flex-1"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        )}

        {step === 5 && (
          <section className="animate-fade-in max-w-4xl">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-display font-black text-4xl md:text-5xl text-foreground uppercase tracking-tighter">
                What&apos;s Your Budget?
              </h2>
              <button
                onClick={() => {
                  trackCalculatorStepCompleted(5, "Budget: Skipped");
                  handleCalculate();
                }}
                className="text-[10px] font-black uppercase tracking-widest text-secondary-text hover:text-foreground transition-colors shrink-0 mt-2"
              >
                Skip →
              </button>
            </div>
            <p className="text-secondary-text mb-12 font-medium">
              This helps us match you to the right system tier and flag your lead for our team. You can skip this step.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {BUDGET_OPTIONS.map((opt) => {
                const isSelected = budgetRange === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setBudgetRange(isSelected ? null : opt.id)}
                    className={`p-8 text-left border-4 rounded-[8px] transition-all relative group ${
                      isSelected
                        ? "border-primary bg-surface"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <h3 className="font-black text-xl text-foreground uppercase tracking-tighter mb-1">
                      {opt.label}
                    </h3>
                    <p className="text-xs text-secondary-text font-medium leading-relaxed">
                      {opt.sublabel}
                    </p>
                    {isSelected && (
                      <div className="absolute top-4 right-4 text-primary">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setStep(4)}
                className="btn-flat btn-outline h-14 px-8"
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <button
                onClick={() => {
                  trackCalculatorStepCompleted(5, `Budget: ${BUDGET_OPTIONS.find((o) => o.id === budgetRange)?.label ?? "Not Selected"}`);
                  handleCalculate();
                }}
                className="btn-flat btn-primary h-14 px-10 flex-1"
              >
                Calculate My System <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        )}

        {step === 6 && result && (
          <section className="animate-fade-in max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                {(() => {
                  const buildShareUrl = () => {
                    const snapshot = { result, region, batteryType, autonomyDays, budgetRange };
                    const encoded = btoa(JSON.stringify(snapshot));
                    return `${window.location.origin}/calculator?share=${encoded}`;
                  };
                  const handleCopy = () => {
                    navigator.clipboard.writeText(buildShareUrl()).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2500);
                    });
                  };
                  return (
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
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-2 h-10 px-5 border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                        copied
                          ? "border-primary bg-primary text-[#1A1A1B]"
                          : "border-border text-secondary-text hover:border-primary hover:text-foreground"
                      }`}
                      title="Copy shareable link"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied!" : "Copy Link"}
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 h-10 px-5 border-2 border-border text-secondary-text text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-foreground transition-all"
                      title="Print this result"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print
                    </button>
                  </div>
                </div>
                  );
                })()}

                {(() => {
                  const PANEL_WATTS = 500;
                  const BATTERY_AH = 200;
                  const panelCount = result.systemType === "custom" ? Math.ceil(result.panelWattsRequired / PANEL_WATTS) : 0;
                  const batteryCount = result.systemType === "custom" ? Math.ceil(result.batteryAhRequired / BATTERY_AH) : 0;
                  return (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border mb-12">
                      <div className="bg-surface p-6">
                        <p className="text-secondary-text text-[10px] font-black uppercase tracking-[0.2em] mb-3">Daily Energy</p>
                        <p className="font-display font-black text-4xl text-foreground tracking-tighter">
                          {(result.dailyEnergyWh / 1000).toFixed(1)}
                          <span className="text-base ml-1 text-secondary-text">kWh</span>
                        </p>
                      </div>
                      <div className="bg-surface p-6">
                        <p className="text-secondary-text text-[10px] font-black uppercase tracking-[0.2em] mb-3">Inverter</p>
                        <p className="font-display font-black text-4xl text-foreground tracking-tighter">
                          {result.systemType === "generator" ? "Portable" : `${result.inverterKva}kVA`}
                        </p>
                      </div>
                      {result.systemType === "custom" && (
                        <>
                          <div className="bg-surface p-6">
                            <p className="text-secondary-text text-[10px] font-black uppercase tracking-[0.2em] mb-3">Solar Panels</p>
                            <p className="font-display font-black text-4xl text-foreground tracking-tighter">
                              {panelCount}
                              <span className="text-base ml-1 text-secondary-text">× {PANEL_WATTS}W</span>
                            </p>
                          </div>
                          <div className="bg-surface p-6">
                            <p className="text-secondary-text text-[10px] font-black uppercase tracking-[0.2em] mb-3">Batteries</p>
                            <p className="font-display font-black text-4xl text-foreground tracking-tighter">
                              {batteryCount}
                              <span className="text-base ml-1 text-secondary-text">× {BATTERY_AH}Ah</span>
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })()}

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
                          `Hi Winepress Solar! I just used your calculator and got a system recommendation:\n\n` +
                          (result.systemType === "generator"
                            ? `⚡ System: Portable Solar Generator\n🔋 Model: ${result.generatorName}\n`
                            : `⚡ System: Custom Solar Installation\n` +
                              `🔆 Solar Array: ${result.panelWattsRequired}W (${Math.ceil(result.panelWattsRequired / 500)} × 500W panels)\n` +
                              `🔋 Battery: ${result.batteryAhRequired}Ah ${batteryType} (${Math.ceil(result.batteryAhRequired / 200)} × 200Ah units)\n` +
                              `🔌 Inverter: ${result.inverterKva}kVA\n` +
                              `⏱ Backup Duration: ${AUTONOMY_OPTIONS.find((o) => o.days === autonomyDays)?.label ?? `${autonomyDays}d`}\n`) +
                          `📊 Daily Load: ${(result.dailyEnergyWh / 1000).toFixed(1)} kWh\n` +
                          `📍 Region: ${pricingConfig.regions[region as keyof typeof pricingConfig.regions]?.label}\n` +
                          (budgetRange ? `💵 Budget: ${BUDGET_OPTIONS.find((o) => o.id === budgetRange)?.label}\n` : "") +
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

                {(() => {
                  const PANEL_WATTS = 500;
                  const BATTERY_AH = 200;
                  const panelCount = result.systemType === "custom" ? Math.ceil(result.panelWattsRequired / PANEL_WATTS) : 0;
                  const batteryCount = result.systemType === "custom" ? Math.ceil(result.batteryAhRequired / BATTERY_AH) : 0;
                  return (
                <div className="bg-background border border-border p-10">
                  <h3 className="font-black text-xs uppercase tracking-[0.4em] text-primary mb-10">
                    System Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      {result.systemType === "custom" && (
                        <>
                          <div className="flex justify-between items-start border-b border-border pb-4">
                            <span className="text-xs font-bold text-secondary-text uppercase tracking-widest">
                              Solar Array
                            </span>
                            <div className="text-right">
                              <span className="font-black text-foreground text-sm block">
                                {result.panelWattsRequired} Watts
                              </span>
                              <span className="text-[10px] text-primary font-bold">
                                {panelCount} × {PANEL_WATTS}W panel{panelCount !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-start border-b border-border pb-4">
                            <span className="text-xs font-bold text-secondary-text uppercase tracking-widest">
                              Battery Bank
                            </span>
                            <div className="text-right">
                              <span className="font-black text-foreground text-sm block">
                                {result.batteryAhRequired} Ah
                              </span>
                              <span className="text-[10px] text-primary font-bold">
                                {batteryCount} × {BATTERY_AH}Ah unit{batteryCount !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between items-center border-b border-border pb-4">
                        <span className="text-xs font-bold text-secondary-text uppercase tracking-widest">
                          Inverter
                        </span>
                        <span className="font-black text-foreground text-sm uppercase">
                          {result.systemType === "generator" ? "Built-in" : `${result.inverterKva} kVA`}
                        </span>
                      </div>
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
                      {result.systemType === "custom" && (
                        <div className="flex justify-between items-center border-b border-border pb-4">
                          <span className="text-xs font-bold text-secondary-text uppercase tracking-widest">
                            Backup Duration
                          </span>
                          <span className="font-black text-foreground text-sm">
                            {AUTONOMY_OPTIONS.find((o) => o.days === autonomyDays)?.label ?? `${autonomyDays}d`}
                          </span>
                        </div>
                      )}
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
                  );
                })()}

                <div className="mt-8 flex items-center gap-4 print:hidden">
                  <button
                    onClick={() => setStep(5)}
                    className="btn-flat btn-outline h-14 px-8"
                  >
                    <ArrowLeft className="w-5 h-5" /> Back
                  </button>
                  <button
                    onClick={handleStartOver}
                    className="text-[10px] font-black uppercase tracking-widest text-secondary-text hover:text-foreground transition-colors ml-2"
                  >
                    ↺ Start Over
                  </button>
                </div>

                {/* Print-only branding footer */}
                <div className="hidden print:block mt-12 pt-8 border-t border-border text-center">
                  <p className="font-display font-black text-xl uppercase tracking-tighter text-foreground mb-1">Winepress Solar Services</p>
                  <p className="text-xs text-secondary-text">Shop 13, POWA Plaza, By Ogui Police Station, Enugu, Nigeria</p>
                  <p className="text-xs text-secondary-text">+234 916 630 1384 · hello@winepresssolar.com · winepresssolar.com</p>
                  <p className="text-[9px] text-secondary-text mt-4">* This is an indicative estimate. Final pricing depends on site survey, equipment availability, and current market rates.</p>
                </div>
              </div>

              {/* Refinement Sidebar */}
              <div className="lg:col-span-1 print:hidden">
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
                        PRESET_CATEGORIES.flatMap((c) => c.appliances).find((p) => p.name === load.name)?.icon ||
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
                By submitting, you agree to be contacted by Winepress Solar Services. We never share your data with third parties.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
