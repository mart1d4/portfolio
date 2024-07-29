import styles from "./Header.module.css";
import { Languages, Menu } from "../";
import Image from "next/image";
import Link from "next/link";

export function Header() {
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
                            alt="A selfie of myself"
                            width={44}
                            height={44}
                        />

                        <span>mart1d4</span>
                    </Link>
                </div>

                <nav>
                    <ul className={styles.headerNav}>
                        {["Home", "About", "Projects", "Contact"].map((item, i) => (
                            <li key={item}>
                                <Link href={i === 0 ? "/" : `/${item.toLowerCase()}`}>{item}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <Languages />

                    <Link
                        href="/donate"
                        className={styles.donate}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="24"
                            width="24"
                        >
                            <path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66c-2.052 0 -3.768 1.449 -4.549 3.5h-.451a1 1 0 0 0 -.117 1.993l.134 .007a7.298 7.298 0 0 0 0 1h-.017a1 1 0 0 0 0 2h.452c.78 2.053 2.496 3.5 4.548 3.5c1.141 0 2.217 -.457 3.084 -1.27a1 1 0 0 0 -1.368 -1.46c-.509 .478 -1.102 .73 -1.716 .73c-.922 0 -1.776 -.578 -2.335 -1.499l1.335 -.001a1 1 0 0 0 0 -2h-1.977a5.342 5.342 0 0 1 0 -1h1.977a1 1 0 0 0 0 -2h-1.336c.56 -.921 1.414 -1.5 2.336 -1.5c.615 0 1.208 .252 1.717 .73a1 1 0 0 0 1.368 -1.46c-.867 -.812 -1.943 -1.27 -3.085 -1.27z" />
                        </svg>
                    </Link>

                    <Menu />
                </div>
            </div>
        </header>
    );
}
