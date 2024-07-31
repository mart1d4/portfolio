"use client";

import { useEffect, useRef, useState } from "react";
import { i18n, type Locale } from "@/i18n-config";
import { usePathname } from "next/navigation";
import styles from "./Languages.module.css";
import Image from "next/image";
import Link from "next/link";

export function Languages({ lang }: { lang: Locale }) {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [menuRef, buttonRef]);

    // Internationalization
    const pathName = usePathname();

    function redirectedPathName(locale: Locale) {
        if (!pathName) return "/";
        const segments = pathName.split("/");
        segments[1] = locale;
        return segments.join("/");
    }

    return (
        <div className={styles.container}>
            <button
                ref={buttonRef}
                aria-label="Languages"
                aria-expanded={open}
                aria-controls="languages"
                onClick={() => setOpen(!open)}
            >
                <Image
                    width={20}
                    height={20}
                    alt={lang}
                    src={`/assets/flags/${lang}.svg`}
                />

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    fill="none"
                    height="16"
                    width="16"
                >
                    <path d="M6 9l6 6l6 -6" />
                </svg>
            </button>

            <ul
                ref={menuRef}
                hidden={!open}
                id="languages"
                className={styles.languages}
            >
                {i18n.locales.map((locale) => (
                    <li key={locale}>
                        <Link
                            onClick={() => setOpen(false)}
                            href={redirectedPathName(locale)}
                            aria-current={locale === lang ? "page" : undefined}
                        >
                            <img
                                src={`/assets/flags/${locale}.svg`}
                                alt={`${locale} flag`}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
