/**
 * JsonLd — Structured Data for CuraBotics AI
 *
 * Injects Organization, WebSite, WebPage, ProfessionalService,
 * and BreadcrumbList JSON-LD schemas for rich-snippet eligibility.
 */

const SITE_URL = "https://curaboticsai.com";
const LOGO_URL = `${SITE_URL}/logo/curabotics-logo.png`;

/* ── Organization ──────────────────────────────────────────────────── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "CuraBotics AI",
  alternateName: ["CuraBotics", "CuraBoticsAI"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: LOGO_URL,
    contentUrl: LOGO_URL,
    width: 512,
    height: 512,
    caption: "CuraBotics AI",
  },
  image: LOGO_URL,
  description:
    "CuraBotics AI is a global healthcare technology company providing AI automation, medical equipment procurement, robotics integration, and strategic innovation for modern healthcare systems worldwide.",
  foundingDate: "2024",
  email: "er.swt.saqibahmad@gmail.com",
  telephone: "+91-7006557535",
  sameAs: [
    "https://www.linkedin.com/company/curaboticsai",
    // "https://twitter.com/CuraBoticsAI",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "er.swt.saqibahmad@gmail.com",
      telephone: "+91-7006557535",
      contactType: "customer service",
      areaServed: ["IN", "DE", "AE", "US", "GB"],
      availableLanguage: ["English", "German", "Hindi", "Arabic"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "DE",
  },
  knowsAbout: [
    "Medical Equipment Procurement",
    "Healthcare Robotics",
    "AI-Powered Hospital Automation",
    "Medical Technology Solutions",
    "Healthcare Innovation",
    "Medical Device Sourcing",
    "Hospital Infrastructure Consulting",
  ],
};

/* ── WebSite ────────────────────────────────────────────────────────── */
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "CuraBotics AI",
  alternateName: "CuraBotics AI — Healthcare Technology",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
  description:
    "Official website of CuraBotics AI — global healthcare technology, AI automation, medical equipment procurement, and robotics solutions.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/* ── WebPage (Homepage) ─────────────────────────────────────────────── */
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "CuraBotics AI | Healthcare AI & Medical Technology",
  description:
    "Global healthcare technology company specializing in AI automation, robotics, and medical equipment procurement solutions across India, Germany, and worldwide.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 1200,
    height: 630,
  },
};

/* ── ProfessionalService ────────────────────────────────────────────── */
const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#service`,
  name: "CuraBotics AI",
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  description:
    "Professional healthcare technology services: medical equipment procurement, AI automation, robotics integration, and hospital innovation consulting.",
  priceRange: "$$$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "DE",
  },
  telephone: "+91-7006557535",
  email: "er.swt.saqibahmad@gmail.com",
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "United States" },
  ],
  serviceType: [
    "Medical Equipment Procurement",
    "Healthcare AI Automation",
    "Robotics Integration",
    "Hospital Infrastructure Consulting",
    "Healthcare Technology Solutions",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Healthcare Technology Solutions",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Medical Equipment Procurement",
          description:
            "End-to-end medical equipment sourcing, procurement, and delivery for hospitals and healthcare facilities worldwide.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Healthcare Automation",
          description:
            "AI-powered automation solutions for hospital workflows, diagnostics, and patient management systems.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Healthcare Robotics Integration",
          description:
            "Surgical robotics, service robotics, and automated systems integration for modern healthcare facilities.",
        },
      },
    ],
  },
};

/* ── BreadcrumbList ─────────────────────────────────────────────────── */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: `${SITE_URL}/about`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Services",
      item: `${SITE_URL}/services`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact",
      item: `${SITE_URL}/contact`,
    },
  ],
};

export function JsonLd() {
  const schemas = [
    organizationSchema,
    webSiteSchema,
    webPageSchema,
    professionalServiceSchema,
    breadcrumbSchema,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
