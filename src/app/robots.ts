import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/data/"],
      },
      {
        /* Block AI training scrapers */
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Omigili",
          "OmigiliBot",
          "Bytespider",
          "AhrefsBot",
          "SemrushBot",
          "DotBot",
        ],
        disallow: ["/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/data/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/data/"],
      },
    ],
    sitemap: "https://curaboticsai.com/sitemap.xml",
    host: "https://curaboticsai.com",
  };
}