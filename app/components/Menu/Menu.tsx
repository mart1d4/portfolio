"use client";

import { useEffect, useRef, useState } from "react";
import { Locale } from "@/i18n-config";
import styles from "./Menu.module.css";
import { Dictionary } from "@/types";
import Link from "next/link";

export function Menu({ lang, dic }: { lang: Locale; dic: Dictionary }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

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

    return (
        <div className={styles.container}>
            <button
                ref={buttonRef}
                aria-label="Menu"
                aria-expanded={open}
                aria-controls="menu-links"
                onClick={() => setOpen(!open)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    fill="none"
                    height="24"
                    width="24"
                >
                    <path d="M7 6h10" />
                    <path d="M4 12h16" />
                    <path d="M7 12h13" />
                    <path d="M7 18h10" />
                </svg>
            </button>

            <ul
                ref={menuRef}
                hidden={!open}
                id="menu-links"
                className={styles.links}
            >
                {["home", "about", "projects", "contact"].map((item, i) => (
                    <li key={item}>
                        <Link
                            onClick={() => setOpen(false)}
                            href={i === 0 ? `/${lang}` : `/${lang}/${item}`}
                        >
                            {dic.navbar[item]}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
