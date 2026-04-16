import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ConsultationProvider } from "@/contexts/ConsultationContext";
import { ConsultationModal } from "@/components/modals/ConsultationModal";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { StickyCtaBar } from "@/components/ui/StickyCtaBar";
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

export const metadata: Metadata = {
  title: {
    default: "CuraBotics AI — Global Healthcare Technology Solutions & Procurement",
    template: "%s | CuraBotics AI",
  },
  description:
    "CuraBotics AI — Global healthcare technology solutions, medical equipment procurement, AI automation, and robotics integration. Connecting healthcare buyers with trusted manufacturers worldwide.",
  keywords: [
    "CuraBotics",
    "AI",
    "Medical Equipment",
    "Healthcare Procurement",
    "Medical Robotics",
    "Healthcare Automation",
    "Medical Technology",
  ],
  authors: [{ name: "CuraBotics AI" }],
  icons: {
    icon: "/logo/favicon.png",
    apple: "/logo/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CuraBotics AI",
    images: [{ url: "/logo/curabotics-logo.png" }],
  },
  robots: {
    index: true,
    follow: true,
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
