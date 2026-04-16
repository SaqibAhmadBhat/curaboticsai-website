interface SEOHeadProps {
  title: string;
  description: string;
  ogImage?: string;
}

/** @deprecated Use Next.js Metadata API in page files instead */
export function SEOHead({ title, description, ogImage }: SEOHeadProps) {
  return null; // Metadata is handled via Next.js generateMetadata / metadata export
}
