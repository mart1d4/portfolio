import styles from "./Header.module.css";
import { Locale } from "@/i18n-config";
import { Languages, Menu } from "../";
import { Dictionary } from "@/types";
import Image from "next/image";
import Link from "next/link";

export function Header({ lang, dic }: { lang: Locale; dic: Dictionary }) {
    return (
        <header className={styles.header}>
            <div>
                <div>
                    <Link
                        href="/"
                        id="top"
                        className={styles.logo}
                    >
                        <Image
                            src="/assets/me.webp"
                            alt={dic.header.iconAlt}
                            width={44}
                            height={44}
                        />

                        <span>mart1d4</span>
                    </Link>
                </div>

                <nav>
                    <ul className={styles.headerNav}>
                        {["home", "about", "projects", "contact"].map((item, i) => (
                            <li key={item}>
                                <Link href={i === 0 ? `/${lang}` : `/${lang}/${item}`}>
                                    {dic.navbar[item]}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <Languages lang={lang} />

                    <Link
                        href="/donate"
                        className={styles.donate}
                        aria-label="Link to donate page"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="20"
                            width="20"
                        >
                            <path d="M12,0C6.486,0,2,4.486,2,10s4.486,10,10,10,10-4.486,10-10S17.514,0,12,0Zm-1.356,8.761l3.041,.506c1.342,.224,2.315,1.374,2.315,2.733,0,1.654-1.346,3-3,3v1h-2v-1c-1.654,0-3-1.346-3-3h2c0,.552,.449,1,1,1h2c.551,0,1-.448,1-1,0-.379-.271-.698-.644-.761l-3.041-.506c-1.342-.224-2.315-1.374-2.315-2.733,0-1.654,1.346-3,3-3v-1h2v1c1.654,0,3,1.346,3,3h-2c0-.552-.449-1-1-1h-2c-.551,0-1,.448-1,1,0,.379,.271,.698,.644,.761Zm13.356,11.739c0,1.933-1.567,3.5-3.5,3.5H3.5c-1.933,0-3.5-1.567-3.5-3.5,0-1.55,1.014-2.849,2.409-3.309,2.189,2.915,5.664,4.809,9.591,4.809s7.401-1.894,9.591-4.809c1.396,.46,2.409,1.76,2.409,3.309Z" />
                        </svg>
                    </Link>

                    <Menu
                        lang={lang}
                        dic={dic}
                    />
                </div>
            </div>
        </header>
    );
}
