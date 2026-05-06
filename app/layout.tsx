import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const SITE_URL = "https://winepresssolar.com";
const SITE_NAME = "Wine Press Solar Services";
const DEFAULT_DESCRIPTION =
  "Stop paying for generator fuel. Go solar today with Wine Press Solar Services — Enugu's trusted provider of high-quality solar sales, installation, and maintenance across Nigeria.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Smart Solar Energy Solutions in Nigeria`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "solar energy Nigeria",
    "solar installation Enugu",
    "solar panels Nigeria",
    "inverter Nigeria",
    "solar power Nigeria",
    "solar calculator Nigeria",
    "Wine Press Solar",
    "solar company Enugu",
    "how many solar panels Nigeria",
    "solar inverter price Nigeria 2026",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Smart Solar Energy Solutions in Nigeria`,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Wine Press Solar Services — Reliable Solar Energy in Nigeria" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Smart Solar Energy Solutions in Nigeria`,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {gtmId && (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        )}
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <ThemeProvider attribute="data-theme" defaultTheme="light">
          <Navigation />
          {children}
          <Footer />
          <FloatingWhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
