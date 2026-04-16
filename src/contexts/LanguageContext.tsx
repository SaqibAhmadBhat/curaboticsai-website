"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Locale = "en" | "de" | "es" | "ar" | "ur" | "hi" | "fr" | "zh";

interface LanguageContextType {
  locale: Locale;
  setLocale: (lang: Locale) => void;
  t: (key: string) => string;
  isLoaded: boolean;
}

const defaultContext: LanguageContextType = {
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
  isLoaded: false,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

const RTL_LOCALES: Locale[] = ["ar", "ur"];

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [dictionary, setDictionary] = useState<Record<string, any>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize lang from localStorage (SSR-safe)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cb_locale") as Locale;
      const finalLocale = (saved && ["en", "de", "es", "ar", "ur", "hi", "fr", "zh"].includes(saved)) ? saved : "en";
      setLocaleState(finalLocale);
      document.documentElement.lang = finalLocale;
      document.documentElement.dir = RTL_LOCALES.includes(finalLocale) ? "rtl" : "ltr";
    } catch {
      // localStorage not available (SSR)
    }
  }, []);

  const setLocale = useCallback((lang: Locale) => {
    // Smooth fade transition
    setIsTransitioning(true);
    setTimeout(() => {
      setLocaleState(lang);
      try { localStorage.setItem("cb_locale", lang); } catch {}
      document.documentElement.lang = lang;
      document.documentElement.dir = RTL_LOCALES.includes(lang) ? "rtl" : "ltr";
    }, 150); // Small delay for fade-out
  }, []);

  // Load dictionary on locale change
  useEffect(() => {
    let active = true;
    const loadDict = async () => {
      try {
        const dict = await import(`../i18n/locales/${locale}.json`);
        if (active) {
          setDictionary(dict.default);
          setIsLoaded(true);
          // Fade back in after dictionary is loaded
          setTimeout(() => setIsTransitioning(false), 50);
        }
      } catch (err) {
        console.error(`Failed to load ${locale} translations, falling back to English`, err);
        try {
          const dict = await import(`../i18n/locales/en.json`);
          if (active) {
            setDictionary(dict.default);
            setIsLoaded(true);
            setTimeout(() => setIsTransitioning(false), 50);
          }
        } catch {}
      }
    };

    loadDict();
    return () => { active = false; };
  }, [locale]);

  // Handle nested keys: "hero.titleLine1" -> dictionary.hero.titleLine1
  const t = useCallback((key: string): string => {
    const keys = key.split(".");
    let value: any = dictionary;
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key; // return key as fallback
      }
    }
    return typeof value === "string" ? value : key;
  }, [dictionary]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isLoaded }}>
      <div
        className="transition-opacity duration-200 ease-in-out"
        style={{ opacity: isTransitioning ? 0.3 : 1 }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
