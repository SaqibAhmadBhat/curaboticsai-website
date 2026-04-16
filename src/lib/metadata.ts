import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export function constructMetadata({
  title,
  description,
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name,
    description: description || SITE_CONFIG.description,
    openGraph: {
      title: title || SITE_CONFIG.name,
      description: description || SITE_CONFIG.description,
      images: image ? [{ url: image }] : [],
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: "summary_large_image",
      title: title || SITE_CONFIG.name,
      description: description || SITE_CONFIG.description,
      images: image ? [image] : [],
    },
    ...(noIndex && {
      robots: { index: false, follow: false },
    }),
  };
}
