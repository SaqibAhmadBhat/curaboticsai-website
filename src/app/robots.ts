import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        crawlDelay: 2,
      },
      {
        // Block AI Bots and Aggressive Scrapers
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Omigili",
          "OmigiliBot",
          "FacebookBot",
          "Bytespider",
        ],
        disallow: ["/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
    ],
    sitemap: "https://curaboticsai.com/sitemap.xml",
    host: "https://curaboticsai.com",
  };
}