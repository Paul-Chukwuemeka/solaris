"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { trackWhatsAppButtonClicked } from "@/lib/analytics";

export default function FloatingWhatsAppButton() {
  const phoneNumber = "2349166301384";
  const message = "Hello Wine Press Solar! I'm interested in getting a solar quote for my property.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppButtonClicked("floating-button")}
      className="fixed bottom-8 right-8 z-[60] group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative bg-[#25D366] text-white p-4 rounded-[8px] border-2 border-white/20 hover:scale-105 transition-transform duration-300 flex items-center justify-center">
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-full mr-4 bg-background border border-border text-foreground px-3 py-2 rounded-[4px] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with an expert
        </span>
      </div>
    </a>
  );
}
