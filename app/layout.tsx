import { Header } from "@/app/components/Header/Header";
import { Roboto } from "next/font/google";
import { Footer } from "@components";
import "./global.css";

export const metadata = {
    title: "My Little Place",
    description: "A place to call my own. A place to be me. A place to be free. A place to be.",
    icons: {
        icon: "/assets/favicon.ico",
    },
};

const roboto = Roboto({
    weight: ["400", "500", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={roboto.className}
        >
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
