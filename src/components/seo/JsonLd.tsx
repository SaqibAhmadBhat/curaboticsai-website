/**
 * JsonLd — Structured Data for CuraBotics AI
 *
 * Renders Organization, WebSite, WebPage, and ProfessionalService
 * JSON-LD schemas into the page head for rich-snippet eligibility.
 */

const SITE_URL = "https://curaboticsai.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "CuraBotics AI",
  alternateName: ["CuraBotics", "CuraBoticsAI"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo/curabotics-logo.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/logo/curabotics-logo.png`,
  description:
    "CuraBotics AI is a global healthcare technology company providing medical equipment procurement, AI-powered hospital automation, robotics integration, and strategic innovation for modern healthcare systems worldwide.",
  foundingDate: "2024",
  sameAs: [
    "https://www.linkedin.com/company/curaboticsai",
    // Add more social profiles as they are created
    // "https://twitter.com/CuraBoticsAI",
    // "https://www.facebook.com/CuraBoticsAI",
    // "https://github.com/CuraBoticsAI",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "er.swt.saqibahmad@gmail.com",
      telephone: "+91-7006557535",
      contactType: "customer service",
      availableLanguage: ["English", "German", "Hindi"],
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
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "CuraBotics AI",
  alternateName: "CuraBotics AI Official Website",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  description:
    "Official website of CuraBotics AI — global healthcare technology, medical equipment procurement, AI automation, and robotics solutions.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "CuraBotics AI — Global Healthcare Technology & AI Solutions",
  description:
    "CuraBotics AI provides global healthcare technology solutions, medical equipment procurement, AI-powered automation, robotics integration, and strategic hospital innovation.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo/curabotics-logo.png`,
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#service`,
  name: "CuraBotics AI",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/curabotics-logo.png`,
  image: `${SITE_URL}/logo/curabotics-logo.png`,
  description:
    "Professional healthcare technology services including medical equipment procurement, AI automation, robotics integration, and hospital innovation consulting.",
  priceRange: "$$$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "DE",
  },
  telephone: "+91-7006557535",
  email: "er.swt.saqibahmad@gmail.com",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 51.1657,
      longitude: 10.4515,
    },
    geoRadius: "10000",
  },
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

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
    </>
  );
}
