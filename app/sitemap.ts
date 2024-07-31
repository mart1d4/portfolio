import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://www.mart1d4.dev",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
            alternates: {
                languages: {
                    en: "https://www.mart1d4.dev/en",
                    fr: "https://www.mart1d4.dev/fr",
                },
            },
        },
        {
            url: "https://www.mart1d4.dev/about",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
            alternates: {
                languages: {
                    en: "https://www.mart1d4.dev/en/about",
                    fr: "https://www.mart1d4.dev/fr/about",
                },
            },
        },
        {
            url: "https://www.mart1d4.dev/projects",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
            alternates: {
                languages: {
                    en: "https://www.mart1d4.dev/en/projects",
                    fr: "https://www.mart1d4.dev/fr/projects",
                },
            },
        },
        {
            url: "https://www.mart1d4.dev/contact",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
            alternates: {
                languages: {
                    en: "https://www.mart1d4.dev/en/contact",
                    fr: "https://www.mart1d4.dev/fr/contact",
                },
            },
        },
        {
            url: "https://www.mart1d4.dev/donate",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
            alternates: {
                languages: {
                    en: "https://www.mart1d4.dev/en/donate",
                    fr: "https://www.mart1d4.dev/fr/donate",
                },
            },
        },
    ];
}
