"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useConsultation } from "@/contexts/ConsultationContext";
import { trackEvent } from "@/lib/analytics";

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);
  const { openConsultation } = useConsultation();

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA only after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConsultationClick = () => {
    trackEvent("sticky_cta_click", { label: "book_consultation" });
    openConsultation();
  };

  const handleSubscribeClick = () => {
    trackEvent("sticky_cta_click", { label: "subscribe" });
    // Scroll to the bottom where the newsletter section is (approximately)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-full max-w-[400px] px-4"
        >
          <div className="bg-[hsl(var(--card))]/80 dark:bg-[#09090b]/80 backdrop-blur-xl border border-[hsl(var(--border))]/60 p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-between gap-2 overflow-hidden relative">
            <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />
            
            <button
              onClick={handleConsultationClick}
              className="flex-1 h-10 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-[0.98] transition-all"
            >
              <Calendar size={14} />
              <span>Book Consultation</span>
            </button>
            <button
              onClick={handleSubscribeClick}
              className="flex-1 h-10 flex items-center justify-center gap-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[hsl(var(--foreground))] text-sm font-medium active:scale-[0.98] transition-all"
            >
              <span>Subscribe</span>
              <ArrowRight size={14} className="opacity-70" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
