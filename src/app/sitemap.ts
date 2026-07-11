import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Emit a static sitemap.xml at build time (required by `output: export`).
export const dynamic = "force-static";

// Static export sitemap. Keeps legitimate search engines pointed at the real
// routes even though robots.txt turns AI crawlers away.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["", "/about", "/projects", "/contact"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
