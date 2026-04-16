"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export function TechnologyShowcase() {
  const { t } = useLanguage();

  const technologies = [
    {
      title: "Surgical Robotics",
      description: "Next-generation robotic surgical systems for minimally-invasive procedures, improving precision and patient recovery outcomes.",
      size: "large",
      image: "/images/equipment/surgical-lights.png",
    },
    {
      title: "Smart OT Integration",
      description: "Connected operating theatres with real-time data, AI-assisted workflows, and integrated monitoring systems.",
      size: "small",
      image: "/images/equipment/patient-monitor.png",
    },
    {
      title: "Future Medical Robotics",
      description: "Autonomous medical robots, rehabilitation systems, and AI-powered assistive technologies for modern healthcare.",
      size: "small",
      image: "/images/equipment/ventilator-machine.png",
    },
    {
      title: "Precision Healthcare Engineering",
      description: "Custom-engineered medical solutions combining advanced manufacturing, IoT sensors, and AI analytics.",
      size: "large",
      image: "/images/equipment/ct-scan-machine.png",
    }
  ];

  return (
    <section className="py-32 bg-background relative overflow-hidden border-t border-border/50">
      <Container>
        <div className="flex flex-col gap-4 mb-16 md:text-center items-center">
          <div className="w-12 h-1 bg-primary mb-2" />
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight">{t("tech.title")}</h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            {t("tech.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-border/50 bg-muted/20 transition-all duration-500 min-h-[400px] md:min-h-[500px] shadow-soft hover:shadow-xl",
                tech.size === "large" ? "md:col-span-2 lg:col-span-2" : "md:col-span-1 lg:col-span-1"
              )}
            >
              {/* Image Background */}
              <Image 
                src={tech.image} 
                alt={tech.title} 
                fill 
                className="object-cover transition-transform duration-[10s] group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
              />
              
              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex flex-col gap-3 z-10 group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                <div className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-md border border-border flex items-center justify-center mb-2 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500 text-foreground">
                  <ArrowUpRight strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white drop-shadow-md">{tech.title}</h3>
                <p className="text-white/80 max-w-xl text-sm md:text-base">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
