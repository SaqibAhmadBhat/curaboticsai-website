"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { MessageSquare, Search, Globe, Handshake, Truck, HeartPulse } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const stepIcons = [MessageSquare, Search, Globe, Handshake, Truck, HeartPulse];

export function WorkflowSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = Array.from({ length: 6 }, (_, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: t(`workflow.w${i + 1}Title`),
    desc: t(`workflow.w${i + 1}Desc`),
    icon: stepIcons[i],
  }));

  return (
    <section className="py-32 bg-background border-t border-border/50 overflow-hidden relative" id="process">
      <Container>
        <div className="flex flex-col gap-4 max-w-3xl mb-24 md:text-center items-start md:items-center md:mx-auto">
          <div className="w-16 h-1 bg-primary mb-2" />
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight">{t("workflow.title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("workflow.description")}</p>
        </div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Animated Draw Line Background */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border/50 md:-translate-x-1/2 rounded-full" />
          
          {/* The Scroll Filling Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-blue-500 to-green-500 md:-translate-x-1/2 rounded-full origin-top z-0"
            style={{ scaleY: scrollYProgress }} 
          />

          <div className="flex flex-col gap-16 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Visual Empty Space or Content Left */}
                <div className="hidden md:block md:flex-1" />

                {/* Timeline Center Node */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-background border-4 border-border flex items-center justify-center shadow-lg"
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                    whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary))", color: "#fff" }}
                  >
                    <step.icon size={22} />
                  </motion.div>
                </motion.div>

                {/* Content Right/Left depending on index */}
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex-1 ml-24 md:ml-0 p-8 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-[0_10px_40px_rgba(26,115,181,0.1)] transition-all duration-300 w-full md:w-auto"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-black text-muted-foreground/20">{step.num}</span>
                    <h3 className="text-2xl font-heading font-bold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed">{step.desc}</p>
                </motion.div>
                
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
