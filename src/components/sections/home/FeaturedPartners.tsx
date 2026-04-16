"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

const partnerNames = [
  "Siemens Healthineers", "GE HealthCare", "Philips", "Stryker",
  "Medtronic", "Abbott", "Johnson & Johnson", "B. Braun",
  "Dräger", "Fujifilm", "Olympus", "Mindray",
];

export function FeaturedPartners() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-muted/5 border-t border-border/50 relative overflow-hidden" id="partners">
      <Container>
        <div className="flex flex-col md:text-center items-start md:items-center gap-4 mb-14 mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">{t("partners.badge")}</p>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground tracking-tight">{t("partners.title")}</h2>
          <p className="text-muted-foreground text-base leading-relaxed">{t("partners.desc")}</p>
        </div>
        <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...partnerNames, ...partnerNames].map((partner, i) => (
              <div 
                key={i} 
                className="flex shrink-0 items-center justify-center h-24 w-48 mx-4 rounded-xl border border-border/50 bg-background/50 hover:bg-background shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-xl font-black tracking-tighter text-muted-foreground/60 grayscale group-hover:grayscale-0 group-hover:text-primary transition-all duration-500">
                  {partner}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 text-center">
          <p className="text-xs text-muted-foreground/60 uppercase tracking-widest">{t("partners.more")}</p>
        </div>
      </Container>
    </section>
  );
}
