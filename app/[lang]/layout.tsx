import { Header } from "@/app/components/Header/Header";
import { Inter } from "next/font/google";
import { Footer } from "@components";
import "./global.css";

import { i18n, type Locale } from "../../i18n-config";
import { getDictionary } from "@/lib/getDictionary";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata = {
    title: "My Little Place",
    description: "A place to call my own. A place to be me. A place to be free. A place to be.",
    icons: {
        icon: "/favicon.ico",
    },
};

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(params.lang);

    return (
        <html
            lang={params.lang}
            className={inter.className}
        >
            <body>
                {/* So Firefox displays page after css has loaded */}
                <script>0</script>

                <Header
                    dic={dictionary}
                    lang={params.lang}
                />
                {children}
                <Footer dic={dictionary} />
            </body>
        </html>
    );
}
