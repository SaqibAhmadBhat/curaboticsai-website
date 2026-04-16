"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MessageSquare, Phone, ArrowRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConsultation } from "@/contexts/ConsultationContext";
import { Container } from "@/components/ui/container";

export function StickyCtaBar() {
  const { t } = useLanguage();
  const { openConsultation } = useConsultation();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isDismissed) return;
    // Show bar after scrolling 600px
    if (latest > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[90] pb-6 px-4 pointer-events-none"
        >
          <Container className="max-w-5xl pointer-events-auto">
            <div className="glassmorphism border border-white/20 dark:border-white/10 p-4 md:p-6 rounded-2xl md:rounded-full bg-background/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 relative group">
              
              {/* Dismiss Button */}
              <button 
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => setIsDismissed(true), 500);
                }}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground shadow-sm transition-colors md:opacity-0 group-hover:opacity-100"
              >
                <X size={14} />
              </button>

              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <MessageSquare size={20} />
                </div>
                <p className="text-sm md:text-base font-medium text-foreground leading-tight max-w-md">
                  {t("ctaBar.text")}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={openConsultation} 
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground font-bold text-sm transition-all hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
                >
                  {t("ctaBar.btn1")}
                  <ArrowRight size={16} />
                </button>
                <a 
                  href="https://wa.me/917006557535" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-background border border-border text-foreground font-bold text-sm transition-all hover:bg-muted hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <Phone size={16} className="text-[#25D366]" />
                  {t("ctaBar.btn2")}
                </a>
              </div>

            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
