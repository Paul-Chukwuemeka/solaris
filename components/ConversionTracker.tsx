"use client";

import { useEffect } from "react";
import { trackLeadConversion } from "@/lib/analytics";

/**
 * Drop this into any server-rendered page to fire a conversion event once
 * on the client after hydration. Renders nothing visible.
 */
export default function ConversionTracker() {
  useEffect(() => {
    trackLeadConversion();
  }, []);

  return null;
}
