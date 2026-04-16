"use client";

import { motion } from "framer-motion";
import { Building2, Stethoscope, ScanLine, FlaskConical, Landmark, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

const industryIcons = [Building2, Stethoscope, ScanLine, FlaskConical, Landmark, GraduationCap];
const accents = [
  "from-blue-500/20 to-blue-600/5",
  "from-teal-500/20 to-teal-600/5",
  "from-indigo-500/20 to-indigo-600/5",
  "from-purple-500/20 to-purple-600/5",
  "from-amber-500/20 to-amber-600/5",
  "from-rose-500/20 to-rose-600/5",
];

export function IndustriesSection() {
  const { t } = useLanguage();

  const industries = Array.from({ length: 6 }, (_, i) => ({
    title: t(`industries.i${i + 1}Title`),
    description: t(`industries.i${i + 1}Desc`),
    icon: industryIcons[i],
    accent: accents[i],
  }));

  return (
    <section className="py-32 bg-background border-t border-border/50 relative overflow-hidden" id="industries">
      <Container>
        <div className="flex flex-col md:text-center items-start md:items-center gap-4 mb-16 mx-auto max-w-3xl">
          <div className="w-16 h-1 bg-primary mb-2" />
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight">{t("industries.title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("industries.desc")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className="relative p-8 rounded-2xl border border-border/50 bg-background hover:border-primary/30 transition-all duration-300 group overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${industry.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"><industry.icon size={26} /></div>
                <h3 className="text-xl font-heading font-bold text-foreground">{industry.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{industry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
