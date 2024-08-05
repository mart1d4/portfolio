import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

    const locale = matchLocale(languages, locales, i18n.defaultLocale);

    return locale;
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
    if (
        [
            "/manifest.json",
            "/favicon.ico",
            "/robots.txt",
            "/sitemap.xml",
            "/favicon.ico",
            "/.well-known/discord",
            "/assets/flags/en.svg",
            "/assets/flags/fr.svg",
            "/assets/tourist.svg",
            "/assets/404.svg",
            "/assets/me.webp",
            "/assets/projects/spark.webp",
            "/assets/projects/portfolio.webp",
            "/assets/projects/alpaca.webp",
            "/assets/projects/llemur.webp",
            "/assets/projects/floppy-bot.webp",
            "/assets/projects/snake.webp",
        ].includes(pathname)
    ) {
        return;
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
        );
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}
