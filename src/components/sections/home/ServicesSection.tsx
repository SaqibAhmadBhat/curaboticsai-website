"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Globe, Cpu, Wrench, Settings, Building2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";
import { TiltCard } from "@/components/ui/TiltCard";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const solutionIcons = [ShoppingBag, Globe, Cpu, Settings, Wrench, Building2];

export function ServicesSection() {
  const { t } = useLanguage();

  const solutions = Array.from({ length: 6 }, (_, i) => ({
    title: t(`services.s${i + 1}Title`),
    description: t(`services.s${i + 1}Desc`),
    icon: solutionIcons[i],
  }));

  return (
    <section className="py-32 bg-background relative" id="services">
      <Container>
        <div className="flex flex-col md:text-center items-start md:items-center gap-4 mb-16 mx-auto max-w-3xl">
          <div className="w-16 h-1 bg-primary mb-2" />
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight">{t("services.title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("services.description")}</p>
        </div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <TiltCard className="h-full">
                <div className="p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/40 hover:shadow-[0_8px_40px_rgba(26,115,181,0.08)] transition-all duration-300 flex flex-col gap-5 group h-full">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <solution.icon size={26} />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">{solution.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{solution.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
