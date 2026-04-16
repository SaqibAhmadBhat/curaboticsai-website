"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ScanLine, Activity, Zap, HeartPulse, ShieldCheck, Settings2, Crosshair, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConsultation } from "@/contexts/ConsultationContext";

const equipIcons = [ScanLine, Activity, Zap, HeartPulse, ShieldCheck, Settings2, Activity, Crosshair];
const equipImages = [
  "/images/equipment/mri-machine.png",
  "/images/equipment/ct-scan-machine.png",
  "/images/equipment/xray-machine.png",
  "/images/equipment/ultrasound-machine.png",
  "/images/equipment/ventilator-machine.png",
  "/images/equipment/dialysis-machine.png",
  "/images/equipment/patient-monitor.png",
  "/images/equipment/surgical-lights.png",
];

export function EquipmentShowcaseSection() {
  const { t } = useLanguage();
  const { openConsultation } = useConsultation();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const equipment = Array.from({ length: 8 }, (_, i) => ({
    title: t(`equipment.e${i + 1}Title`),
    description: t(`equipment.e${i + 1}Desc`),
    service: t(`equipment.e${i + 1}Service`),
    image: equipImages[i],
    icon: equipIcons[i],
  }));

  return (
    <section className="py-32 bg-muted/5 border-t border-border/50 relative overflow-hidden" id="equipment">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-3xl flex flex-col gap-4">
            <div className="w-16 h-1 bg-primary mb-2" />
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground">
              {t("equipment.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-blue-400">{t("equipment.titleGradient")}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t("equipment.desc")}</p>
          </div>
          <button onClick={openConsultation} className="hidden md:flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-bold hover:bg-primary transition-colors text-sm uppercase tracking-widest group">
            {t("equipment.cta")} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="flex items-center justify-between mb-8">
          <div className="hidden md:flex gap-3">
            <button onClick={scrollLeft} className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-background hover:bg-primary/10 hover:border-primary/30 transition-all shadow-sm text-foreground">
              <ChevronLeft size={20} />
            </button>
            <button onClick={scrollRight} className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-background hover:bg-primary/10 hover:border-primary/30 transition-all shadow-sm text-foreground">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div ref={carouselRef} className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scroll-smooth hide-scrollbar px-4 -mx-4 md:px-0 md:mx-0">
          {equipment.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.05 }} className="w-[280px] md:w-[320px] shrink-0 snap-start group flex flex-col rounded-2xl bg-background border border-border/50 overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,115,181,0.12)] shadow-soft relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative h-56 w-full overflow-hidden bg-muted/20">
                <Image src={item.image} alt={item.title} fill className="object-cover opacity-85 group-hover:scale-110 group-hover:opacity-100 transition-transform duration-[6s] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-lg"><item.icon size={18} /></div>
              </div>
              <div className="p-6 flex flex-col flex-1 relative z-10">
                <h3 className="text-lg font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{item.description}</p>
                <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                  <p className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">{item.service}</p>
                  <ArrowRight size={14} className="text-primary opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
