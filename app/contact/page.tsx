import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Get a Free Solar Quote",
  description:
    "Contact Wine Press Solar Services for a free, no-obligation solar system quote. Fill in the form and our team will respond within 24 hours — or chat directly on WhatsApp.",
  alternates: { canonical: "https://winepresssolar.com/contact" },
  openGraph: {
    url: "https://winepresssolar.com/contact",
    title: "Contact Wine Press Solar Services | Free Solar Quote",
    description:
      "Get a free solar system quote for your home or business. Our engineers respond within 24 hours.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
