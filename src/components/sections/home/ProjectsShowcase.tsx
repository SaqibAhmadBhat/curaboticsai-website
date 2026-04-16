"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

export function ProjectsShowcase() {
  const { t } = useLanguage();

  const projects = Array.from({ length: 4 }, (_, i) => ({
    title: t(`projects.p${i + 1}Title`),
    category: t(`projects.p${i + 1}Cat`),
    summary: t(`projects.p${i + 1}Desc`),
  }));

  return (
    <section className="py-32 bg-background relative border-t border-border/50" id="projects">
      <Container>
        <div className="flex flex-col md:flex-row gap-8 justify-between items-end mb-16">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="w-16 h-1 bg-primary mb-2" />
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight">{t("projects.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("projects.desc")}</p>
          </div>
          <button className="hidden md:flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors uppercase tracking-widest text-sm bg-primary/10 px-6 py-3 rounded-full">
            {t("projects.cta")} <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-8 rounded-2xl border border-border/50 bg-background hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(26,115,181,0.06)] transition-all duration-300 group flex flex-col gap-4">
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest">{project.category}</span>
              <h3 className="text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.summary}</p>
              <div className="flex items-center gap-2 text-sm text-primary font-medium mt-auto pt-4">
                {t("projects.viewDetails")} <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
