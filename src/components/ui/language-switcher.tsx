"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "ar", name: "العربية" },
  { code: "ur", name: "اردو" },
  { code: "hi", name: "हिन्दी" },
  { code: "fr", name: "Français" },
  { code: "zh", name: "中文" },
] as const;

export function LanguageSwitcher() {
  const { locale, setLocale, isLoaded } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(l => l.code === locale)?.name || "English";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-foreground font-medium transition-colors border border-transparent hover:border-border min-w-[120px]"
        aria-label="Toggle language"
      >
        <Globe size={18} className="text-primary" />
        <span className="text-sm font-semibold">{currentLanguage}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(var(--primary),0.1)] py-2 z-50 overflow-hidden transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "px-4 py-2 text-sm text-left transition-colors flex items-center justify-between",
                  locale === lang.code 
                    ? "text-primary font-bold bg-primary/10" 
                    : "text-muted-foreground w-full hover:bg-muted/50"
                )}
              >
                {lang.name}
                {locale === lang.code && (
                  <motion.div 
                    layoutId="active-lang" 
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
