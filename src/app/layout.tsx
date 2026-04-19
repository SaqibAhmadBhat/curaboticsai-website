import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ConsultationProvider } from "@/contexts/ConsultationContext";
import { ConsultationModal } from "@/components/modals/ConsultationModal";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { StickyCtaBar } from "@/components/ui/StickyCtaBar";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/* ─────────────────────────────────────────────
   Root Metadata — SEO-optimised for CuraBotics AI
   ───────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://curaboticsai.com"),

  title: {
    default:
      "CuraBotics AI | Global Healthcare Technology, Medical Equipment & AI Solutions",
    template: "%s | CuraBotics AI — Healthcare Technology",
  },

  description:
    "CuraBotics AI is a global healthcare technology company specialising in medical equipment procurement, AI-powered hospital automation, robotics integration, and strategic innovation for modern healthcare systems worldwide.",

  keywords: [
    "CuraBotics AI",
    "curaboticsai",
    "curaboticsai.com",
    "medical equipment procurement",
    "healthcare technology company",
    "healthcare robotics",
    "hospital AI solutions",
    "AI healthcare automation",
    "medical technology",
    "healthcare innovation",
    "medical device sourcing",
    "hospital robotics integration",
    "global healthcare solutions",
    "healthcare startup",
    "medical automation systems",
  ],

  authors: [{ name: "CuraBotics AI", url: "https://curaboticsai.com" }],
  creator: "CuraBotics AI",
  publisher: "CuraBotics AI",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://curaboticsai.com",
  },

  icons: {
    icon: "/logo/favicon.png",
    apple: "/logo/favicon.png",
  },

  openGraph: {
    title: "CuraBotics AI — Global Healthcare Technology & AI Solutions",
    description:
      "Leading healthcare technology company providing medical equipment procurement, AI automation, robotics integration, and strategic hospital innovation worldwide.",
    url: "https://curaboticsai.com",
    siteName: "CuraBotics AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo/curabotics-logo.png",
        width: 1200,
        height: 630,
        alt: "CuraBotics AI — Healthcare Technology & AI Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CuraBotics AI — Healthcare Technology & AI Solutions",
    description:
      "Global healthcare technology company — medical equipment procurement, AI automation, robotics, and hospital innovation.",
    images: ["/logo/curabotics-logo.png"],
    creator: "@CuraBoticsAI",
  },

  verification: {
    // Populate these after setting up Google Search Console & Bing Webmaster Tools
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
    // yandex: "YOUR_YANDEX_VERIFICATION_CODE",
  },

  category: "Healthcare Technology",

  other: {
    "geo.region": "DE",
    "geo.placename": "Germany",
    "og:locale:alternate": "de_DE",
    "application-name": "CuraBotics AI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans">
        {/* Structured Data — JSON-LD for search engines */}
        <JsonLd />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <ConsultationProvider>
              {children}
              <ConsultationModal />
              <FloatingWhatsApp />
              <StickyCtaBar />
            </ConsultationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}