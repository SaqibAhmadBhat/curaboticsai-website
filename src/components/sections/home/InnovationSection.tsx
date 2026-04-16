"use client";

import { motion } from "framer-motion";
import { Cpu, Crosshair, Building2, TrendingUp, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

const innovationIcons = [Cpu, Crosshair, Building2, TrendingUp, Sparkles];

export function InnovationSection() {
  const { t } = useLanguage();

  const innovations = Array.from({ length: 5 }, (_, i) => ({
    title: t(`innovation.n${i + 1}Title`),
    description: t(`innovation.n${i + 1}Desc`),
    icon: innovationIcons[i],
  }));

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="innovation">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 dark:invert" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <Container className="relative z-10">
        <div className="flex flex-col md:text-center items-start md:items-center gap-4 mb-16 mx-auto max-w-3xl">
          <div className="w-16 h-1 bg-primary mb-2" />
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight">{t("innovation.title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("innovation.desc")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovations.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className={`p-8 rounded-2xl border border-border/50 bg-muted/20 backdrop-blur-sm hover:border-primary/30 hover:bg-muted/40 transition-all duration-300 group ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}>
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-5"><item.icon size={26} /></div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
