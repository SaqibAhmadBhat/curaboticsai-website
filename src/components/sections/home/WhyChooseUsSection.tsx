"use client";

import { motion } from "framer-motion";
import { Globe, Headphones, Cpu, ShoppingBag, Wrench, Rocket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";
import { TiltCard } from "@/components/ui/TiltCard";

const featureIcons = [Globe, Headphones, Cpu, ShoppingBag, Wrench, Rocket];

export function WhyChooseUsSection() {
  const { t } = useLanguage();

  const features = Array.from({ length: 6 }, (_, i) => ({
    title: t(`why.f${i + 1}Title`),
    description: t(`why.f${i + 1}Desc`),
    icon: featureIcons[i],
  }));

  return (
    <section className="py-32 bg-muted/5 relative overflow-hidden" id="why-choose-us">
      <Container>
        <div className="flex flex-col md:text-center items-start md:items-center gap-4 mb-16 mx-auto max-w-3xl">
          <div className="w-16 h-1 bg-primary mb-2" />
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight">{t("why.title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("why.desc")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className="h-full">
              <TiltCard className="h-full">
                <div className="flex flex-col gap-4 p-8 rounded-2xl border border-border/50 bg-background hover:border-primary/40 hover:shadow-[0_8px_40px_rgba(26,115,181,0.08)] transition-all duration-300 group h-full">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"><feature.icon size={26} /></div>
                  <h3 className="text-xl font-heading font-bold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
