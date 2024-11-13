import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tienditamaker.com",
      lastModified: new Date(),
    },
  ];
}
