import type { MetadataRoute } from "next";
import { projects } from "@/app/projects/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bvrglobaltechnologies.com";

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/apply`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/projects`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}