"use client";

/**
 * Universal Analytics Tracking Helper
 * Tracks custom events to either Google Analytics (gtag.js) if present,
 * or logs them to a custom backend/console for metrics.
 */

type EventNames = 
  | "newsletter_signup" 
  | "consultation_submit" 
  | "button_click" 
  | "popup_impression" 
  | "sticky_cta_click"
  | "page_view";

interface EventData {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

export const trackEvent = (eventName: EventNames, data?: EventData) => {
  // Check if standard analytics exists in browser environment
  if (typeof window !== "undefined") {
    
    // Google Analytics fallback (if user installed gtag)
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", eventName, {
        event_category: data?.category || "general",
        event_label: data?.label,
        value: data?.value,
        ...data,
      });
    }

    // Custom dataLayer (GTM or custom system)
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: eventName,
      ...data,
      timestamp: new Date().toISOString(),
    });

    // In a real environment, you might also POST this to a custom DB or telemetry endpoint here.
    if (process.env.NODE_ENV !== "production") {
      console.log(`📊 [Analytics] ${eventName}`, data || {});
    }
  }
};
