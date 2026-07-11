import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Emit a static robots.txt at build time (required by `output: export`).
export const dynamic = "force-static";

// Known AI crawlers / scrapers used for LLM training, retrieval-augmented
// answering and dataset harvesting. These are blocked outright while ordinary
// search-engine crawlers (Googlebot, Bingbot, DuckDuckBot, …) keep full
// access, so the site stays discoverable in search without feeding AI models.
//
// List curated from the community-maintained ai.robots.txt project and Dark
// Visitors. Well-behaved bots honour robots.txt; this is an opt-out signal,
// not an access control — see .well-known/tdmrep.json for the legal TDM
// reservation and the noai/noimageai meta tags in app/layout.tsx.
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "Claude-User",
  "Claude-SearchBot",
  // Google (Gemini/Vertex training — distinct from Googlebot search)
  "Google-Extended",
  "GoogleOther",
  "Google-CloudVertexBot",
  // Common Crawl (feeds many training datasets)
  "CCBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Meta
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  // Amazon / Apple
  "Amazonbot",
  "Applebot-Extended",
  // ByteDance / Huawei / others
  "Bytespider",
  "PetalBot",
  "YouBot",
  "Diffbot",
  "Timpibot",
  "Kangaroo Bot",
  "DuckAssistBot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "AI2Bot",
  "Ai2Bot-Dolma",
  "omgili",
  "omgilibot",
  "ImagesiftBot",
  "img2dataset",
  "Webzio-Extended",
  "FriendlyCrawler",
  "ISSCyberRiskCrawler",
  "Scrapy",
  "SemrushBot-OCOB",
  "VelenPublicWebCrawler",
  "TurnitinBot",
  "peer39_crawler",
  "peer39_crawler/1.0",
  "Meltwater",
  "Seekr",
  "iaskspider/2.0",
  "PanguBot",
  "Sidetrade indexer bot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Block every known AI crawler across the whole site.
      {
        userAgent: AI_CRAWLERS,
        disallow: "/",
      },
      // Everyone else (search engines, link-preview bots, humans) is welcome.
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
