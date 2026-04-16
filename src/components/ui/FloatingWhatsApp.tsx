"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function FloatingWhatsApp() {
  const { t } = useLanguage();
  const phoneNumber = "917006557535";
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex items-center justify-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.8 }}
            className="mr-4 px-4 py-2 rounded-xl bg-background border border-border shadow-soft text-sm font-medium text-foreground whitespace-nowrap hidden md:block"
          >
            {t("common.chatWithUs")}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.6)] transition-shadow duration-300 group"
        aria-label="Contact on WhatsApp"
      >
        {/* Ripple Effect Animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        
        <svg 
          viewBox="0 0 24 24" 
          className="h-8 w-8 fill-current relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 7.454c-1.893 0-3.748-.511-5.364-1.477l-.384-.228-3.991 1.046 1.065-3.892-.25-.397c-.961-1.528-1.467-3.298-1.467-5.115 0-5.385 4.383-9.769 9.77-9.769 2.61 0 5.064 1.015 6.91 2.862 1.847 1.847 2.862 4.3 2.862 6.907 0 5.386-4.383 9.77-9.77 9.77zm9.767-19.445C20.444 1.388 17.828.5 15.11.5 9.4 0 4.755 4.646 4.755 10.354c0 1.823.477 3.601 1.382 5.17l-1.468 5.358 5.485-1.439c1.511.824 3.204 1.26 4.945 1.26 5.71 0 10.355-4.646 10.355-10.354 0-2.768-1.08-5.37-3.047-7.337" />
        </svg>
      </motion.a>
    </div>
  );
}
