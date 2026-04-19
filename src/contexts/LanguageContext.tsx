"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

type Locale = "en" | "de" | "es" | "ar" | "ur" | "hi" | "fr" | "zh";

const SUPPORTED_LOCALES: Locale[] = ["en", "de", "es", "ar", "ur", "hi", "fr", "zh"];
const RTL_LOCALES: Locale[] = ["ar", "ur"];
const STORAGE_KEY = "cb_locale";

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

/** Read saved locale from localStorage (SSR-safe) */
function getSavedLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale;
    if (saved && SUPPORTED_LOCALES.includes(saved)) return saved;
  } catch {}
  return "en";
}

/** Apply lang & dir attributes to <html> */
function applyHtmlAttributes(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.documentElement.dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Lazy-init locale from localStorage so the very first render uses the saved value
  const [locale, setLocaleState] = useState<Locale>(() => getSavedLocale());
  const [dictionary, setDictionary] = useState<Record<string, any>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const loadIdRef = useRef(0); // cancellation token for stale loads

  // Apply HTML attributes on mount + whenever locale changes
  useEffect(() => {
    applyHtmlAttributes(locale);
  }, [locale]);

  const setLocale = useCallback((lang: Locale) => {
    if (!SUPPORTED_LOCALES.includes(lang)) return;

    // Start fade-out immediately
    setIsTransitioning(true);

    // Update state synchronously — no setTimeout
    setLocaleState(lang);

    // Persist
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}

    // HTML attributes
    applyHtmlAttributes(lang);
  }, []);

  // Load dictionary whenever locale changes
  useEffect(() => {
    const id = ++loadIdRef.current;

    const loadDict = async () => {
      try {
        const dict = await import(`../i18n/locales/${locale}.json`);
        if (id !== loadIdRef.current) return; // stale
        setDictionary(dict.default);
        setIsLoaded(true);
        // Small delay so fade-in happens after dictionary is applied
        requestAnimationFrame(() => {
          if (id === loadIdRef.current) setIsTransitioning(false);
        });
      } catch (err) {
        console.error(`Failed to load ${locale} translations, falling back to English`, err);
        try {
          const dict = await import(`../i18n/locales/en.json`);
          if (id !== loadIdRef.current) return;
          setDictionary(dict.default);
          setIsLoaded(true);
          requestAnimationFrame(() => {
            if (id === loadIdRef.current) setIsTransitioning(false);
          });
        } catch {}
      }
    };

    loadDict();
  }, [locale]);

  // Nested key resolver: "hero.titleLine1" -> dictionary.hero.titleLine1
  const t = useCallback((key: string): string => {
    const keys = key.split(".");
    let value: any = dictionary;
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key; // fallback to key
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
