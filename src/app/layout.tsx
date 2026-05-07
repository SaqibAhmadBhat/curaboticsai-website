import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ConsultationProvider } from "@/contexts/ConsultationContext";
import { ConsultationModal } from "@/components/modals/ConsultationModal";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { StickyCta } from "@/components/ui/StickyCta";
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
    default: "CuraBotics AI | Healthcare AI & Medical Technology",
    template: "%s | CuraBotics AI",
  },

  description:
    "Global healthcare technology company specializing in AI automation, robotics, and medical equipment procurement solutions across India, Germany, and worldwide.",

  keywords: [
    "CuraBotics AI",
    "curaboticsai",
    "medical equipment procurement",
    "healthcare AI automation",
    "healthcare robotics",
    "hospital AI solutions",
    "medical technology company",
    "India Germany healthcare",
    "medical device sourcing",
    "hospital robotics integration",
    "AI healthcare automation",
    "healthcare startup",
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
    icon: [
      { url: "/logo/favicon.png", type: "image/png" },
    ],
    apple: "/logo/favicon.png",
    shortcut: "/logo/favicon.png",
  },

  openGraph: {
    title: "CuraBotics AI | Healthcare AI & Medical Technology",
    description:
      "Global healthcare technology company specializing in AI automation, robotics, and medical equipment procurement solutions across India, Germany, and worldwide.",
    url: "https://curaboticsai.com",
    siteName: "CuraBotics AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://curaboticsai.com/logo/curabotics-logo.png",
        width: 1200,
        height: 630,
        alt: "CuraBotics AI — Healthcare AI & Medical Technology",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CuraBotics AI | Healthcare AI & Medical Technology",
    description:
      "Global healthcare technology company — AI automation, robotics, and medical equipment procurement across India, Germany, and worldwide.",
    images: ["https://curaboticsai.com/logo/curabotics-logo.png"],
    creator: "@CuraBoticsAI",
    site: "@CuraBoticsAI",
  },

  verification: {
    google: "oLgOve0DTHASC8vm67Br_T7ppTQxqaVYE7xAc0MYZmA",
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
              <StickyCta />
            </ConsultationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}