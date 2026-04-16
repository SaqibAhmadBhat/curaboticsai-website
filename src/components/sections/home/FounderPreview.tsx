"use client";

import { motion } from "framer-motion";
import { Quote, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

export function FounderPreview() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-muted/5 relative overflow-hidden">
      <Container>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto rounded-3xl bg-background border border-border/50 p-8 md:p-16 shadow-soft flex flex-col items-center text-center relative"
        >
          <Quote className="absolute top-8 left-8 text-primary/10 w-16 h-16 rotate-180" />
          <Quote className="absolute bottom-8 right-8 text-primary/10 w-16 h-16" />
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center overflow-hidden border-4 border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-105 transition-transform duration-500">
              <Image 
                src="/images/founder_portrait.png"
                alt="Saqib Ahmad Bhat - Founder & CEO"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>
            
            <p className="text-lg md:text-xl lg:text-2xl font-heading font-medium leading-relaxed text-foreground italic">
              {t("founder.quote")}
            </p>
            
            <div className="flex flex-col gap-2 items-center">
              <h4 className="text-lg font-bold text-foreground">Saqib Ahmad Bhat</h4>
              <p className="text-sm font-medium text-primary uppercase tracking-widest">{t("founder.badge")}</p>
              <a
                href="https://saqibahmadbhat.github.io/Portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-primary/30 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                View Founder Portfolio <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
