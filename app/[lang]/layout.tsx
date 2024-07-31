import { Header } from "@/app/components/Header/Header";
import { Roboto } from "next/font/google";
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

const roboto = Roboto({
    weight: ["400", "500", "700"],
    style: ["normal", "italic"],
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
            className={roboto.className}
        >
            <body>
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
