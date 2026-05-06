import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Free Solar System Calculator",
  description:
    "Calculate the exact solar system you need for your home or business in Nigeria. Get an instant estimate for panels, inverter size, battery capacity, and total cost — in under 2 minutes.",
  alternates: { canonical: "https://winepresssolar.com/calculator" },
  openGraph: {
    url: "https://winepresssolar.com/calculator",
    title: "Free Solar System Calculator | Wine Press Solar Services",
    description:
      "Size your solar system in minutes. Select your appliances, region, and battery preference — get an instant cost estimate and book a professional audit.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
