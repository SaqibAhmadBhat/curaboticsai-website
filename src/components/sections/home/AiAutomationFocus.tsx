"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

export function AiAutomationFocus() {
  const { t } = useLanguage();

  const automationPillars = [
    "Workflow Optimization",
    "Predictive Diagnostics Support",
    "Smart Hospital Systems",
    "Monitoring Automation",
    "Clinical Decision Support",
    "Real-Time Analytics"
  ];

  return (
    <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(to_bottom,white,transparent)] invert" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8 relative"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white w-fit border border-white/20 backdrop-blur-md">
              <span className="text-sm font-bold uppercase tracking-widest text-primary">{t("ai.title")}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-tight">
              {t("ai.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-primary">{t("ai.gradient")}</span>
            </h2>
            
            <p className="text-lg text-white/70 leading-relaxed max-w-xl">
              {t("ai.desc")}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {automationPillars.map((pillar, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={20} />
                  <span className="font-medium text-white/90">{pillar}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[650px] h-[400px] w-full rounded-3xl overflow-hidden glassmorphism border border-white/10 shadow-[0_0_100px_rgba(var(--primary),0.15)] bg-black/50"
          >
            <Image 
              src="/images/smart_hospital_dashboard.png"
              alt="AI Automation Dashboard"
              fill
              className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:scale-105 transition-all duration-[10s]"
            />
            {/* Edge lighting effect */}
            <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay pointer-events-none" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
