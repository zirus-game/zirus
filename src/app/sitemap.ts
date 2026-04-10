import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zirus.io";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return [
        {
            url: siteUrl,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${siteUrl}/login`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/signup`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/about`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
    ];
}
