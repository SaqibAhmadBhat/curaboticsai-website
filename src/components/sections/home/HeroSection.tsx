"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Shield, Globe, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConsultation } from "@/contexts/ConsultationContext";

export function HeroSection() {
  const { t } = useLanguage();
  const { openConsultation } = useConsultation();

  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-16 lg:pt-44 lg:pb-28 min-h-[90svh] flex items-center">
      {/* Background Visual Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-10" />
      
      {/* Floating Glowing Blobs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0, -100, 0], 
          y: [0, -50, 100, 50, 0], 
          scale: [1, 1.2, 0.8, 1.1, 1] 
        }} 
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-20" 
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 0, 100, 0], 
          y: [0, 100, -50, 50, 0], 
          scale: [1, 0.9, 1.2, 0.9, 1] 
        }} 
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }} 
        className="absolute bottom-1/4 right-1/4 translate-x-1/4 translate-y-1/4 w-[700px] h-[700px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none opacity-40 dark:opacity-15" 
      />
      <motion.div 
        animate={{ 
          x: [0, 50, -50, 0], 
          y: [0, -100, 0, -50], 
        }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-green-500/5 blur-[150px] rounded-full pointer-events-none opacity-30 dark:opacity-10" 
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary w-fit border border-primary/20 backdrop-blur-md">
              <Globe size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">{t("hero.badge")}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1] max-w-full">
              {t("hero.titleLine1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-blue-400">{t("hero.titleGradient")}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <button onClick={openConsultation} className="btn-primary flex items-center justify-center gap-2 h-14 px-8 rounded-full text-base shadow-[0_0_40px_rgba(26,115,181,0.25)] hover:shadow-[0_0_60px_rgba(26,115,181,0.4)] pointer-events-auto">
                {t("hero.cta1")} <ArrowRight size={18} />
              </button>
              <Link href="#services" className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full text-base font-medium transition-colors hover:bg-muted border border-border shadow-soft glassmorphism pointer-events-auto">
                {t("hero.cta2")} <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="relative lg:h-[600px] h-[420px] w-full rounded-2xl md:rounded-3xl border border-white/20 dark:border-white/10 glassmorphism shadow-2xl mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden">
              <Image src="/images/hero_technology_montage.png" alt="CuraBotics Healthcare Technology" fill priority className="object-cover hover:scale-105 transition-transform duration-[12s] ease-out mix-blend-luminosity hover:mix-blend-normal opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="absolute top-8 -left-4 md:-left-10 glassmorphism border border-border/50 p-4 rounded-2xl flex items-center gap-3 shadow-xl bg-background/80">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Shield size={20} /></div>
              <div>
                <p className="font-heading font-black text-xl leading-none">{t("hero.stat1Value")}</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("hero.stat1Label")}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="absolute top-1/2 -right-4 md:-right-10 glassmorphism border border-border/50 p-4 rounded-2xl flex items-center gap-3 shadow-xl bg-background/80">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Zap size={20} /></div>
              <div>
                <p className="font-heading font-black text-xl leading-none">{t("hero.stat2Value")}</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("hero.stat2Label")}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 glassmorphism border border-border/50 p-4 rounded-2xl flex items-center gap-3 shadow-xl w-max bg-background/80">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Globe size={20} /></div>
              <div>
                <p className="font-heading font-black text-xl leading-none">{t("hero.stat3Value")}</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("hero.stat3Label")}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
