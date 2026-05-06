/**
 * Analytics helper — pushes typed events to GTM's dataLayer.
 * All functions are no-ops when GTM is not loaded (dev without GTM ID, or
 * before the GTM script fires), so they are safe to call unconditionally.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function push(event: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}

// ─── Calculator funnel events ─────────────────────────────────────────────────

export function trackCalculatorStarted(): void {
  push({ event: "CalculatorStarted" });
}

export function trackCalculatorStepCompleted(step: number, label: string): void {
  push({ event: "CalculatorStepCompleted", step, stepLabel: label });
}

export function trackCalculatorResultViewed(params: {
  region: string;
  systemType: string;
  dailyKwh: number;
  estimatedCostMin: number;
  estimatedCostMax: number;
}): void {
  push({ event: "CalculatorResultViewed", ...params });
}

// ─── Lead / conversion events ─────────────────────────────────────────────────

export function trackQuoteFormSubmitted(params: {
  region: string;
  systemType: string;
}): void {
  push({ event: "QuoteFormSubmitted", ...params });
}

export function trackLeadConversion(): void {
  // Fires on /thank-you — picked up by GA4 & Google Ads conversion tags in GTM
  push({ event: "Lead" });
}

// ─── Engagement events ────────────────────────────────────────────────────────

export function trackWhatsAppButtonClicked(source: string): void {
  push({ event: "WhatsAppButtonClicked", source });
}

export function trackViewContent(contentName: string): void {
  push({ event: "ViewContent", contentName });
}
