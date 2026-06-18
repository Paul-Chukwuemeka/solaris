"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { trackWhatsAppButtonClicked } from "@/lib/analytics";

interface WhatsAppLinkProps {
  source: string;
  className?: string;
  message?: string;
  children?: React.ReactNode;
}

export default function WhatsAppLink({
  source,
  className,
  message = "Hello Winepress Solar! I'm interested in getting a solar quote for my property.",
  children,
}: WhatsAppLinkProps) {
  const url = `https://wa.me/2349166301384?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppButtonClicked(source)}
      className={className}
    >
      {children ?? (
        <>
          <MessageCircle className="w-5 h-5" />
          Chat on WhatsApp
        </>
      )}
    </a>
  );
}
