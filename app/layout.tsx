import { Header } from "@/app/components/Header/Header";
import { Footer } from "@components";
import "./global.css";

export const metadata = {
    title: "My Little Place",
    description: "A place to call my own. A place to be me. A place to be free. A place to be.",
    icons: {
        icon: "/assets/favicon.ico",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
