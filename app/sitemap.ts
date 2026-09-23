import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://dayannecosta.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
