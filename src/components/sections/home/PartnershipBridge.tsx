"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Factory, HeartPulse } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

export function PartnershipBridge() {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="partnership-bridge">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 dark:invert" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(var(--primary))]/10 rounded-full blur-[120px]" />
      <Container className="relative z-10">
        <div className="flex flex-col md:text-center items-start md:items-center gap-4 mb-20 mx-auto max-w-3xl">
          <div className="w-16 h-1 bg-primary mb-2" />
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight">
            {t("bridge.title1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-blue-300">{t("bridge.titleGradient")}</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("bridge.desc")}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col gap-6 p-8 rounded-2xl border border-border/50 bg-muted/20 backdrop-blur-sm">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400"><Factory size={28} /></div>
            <h3 className="text-2xl font-heading font-bold text-foreground">{t("bridge.mfgTitle")}</h3>
            <ul className="flex flex-col gap-3 text-muted-foreground text-sm">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />{t("bridge.mfg1")}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />{t("bridge.mfg2")}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />{t("bridge.mfg3")}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />{t("bridge.mfg4")}</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col items-center gap-6 p-8 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm text-center relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest">{t("bridge.badge")}</div>
            <Image src="/logo/curabotics-logo.png" alt="CuraBotics AI" width={96} height={48} className="h-12 w-auto object-contain dark:brightness-0 dark:invert mt-4" />
            <p className="text-foreground text-sm leading-relaxed">{t("bridge.bridgeDesc")}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest font-mono mt-2">
              <span>{t("bridge.step1")}</span><ArrowRight size={12} /><span>{t("bridge.step2")}</span><ArrowRight size={12} /><span>{t("bridge.step3")}</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-col gap-6 p-8 rounded-2xl border border-border/50 bg-muted/20 backdrop-blur-sm">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400"><HeartPulse size={28} /></div>
            <h3 className="text-2xl font-heading font-bold text-foreground">{t("bridge.buyerTitle")}</h3>
            <ul className="flex flex-col gap-3 text-muted-foreground text-sm">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />{t("bridge.buyer1")}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />{t("bridge.buyer2")}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />{t("bridge.buyer3")}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />{t("bridge.buyer4")}</li>
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
