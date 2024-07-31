import styles from "./Footer.module.css";
import { socials } from "@/lib/socials";
import { Dictionary } from "@/types";

export async function Footer({ dic }: { dic: Dictionary }) {
    return (
        <footer className={styles.footer}>
            <div>
                <div className={styles.content}>
                    <p>&copy; {new Date().getFullYear()} MART1D4</p>
                    <p>{dic.footer.text}</p>

                    <div className={styles.socials}>
                        {socials.map((social) => (
                            <a
                                target="_blank"
                                key={social.name}
                                href={social.url}
                                title={social.name}
                                aria-label={social.name}
                                rel="noopener noreferrer"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <a
                    href="#top"
                    title={dic.footer.backToTop}
                    aria-label={dic.footer.backToTop}
                    className={styles.backToTop}
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
                        <path d="M12 5l0 14" />
                        <path d="M18 11l-6 -6" />
                        <path d="M6 11l6 -6" />
                    </svg>
                </a>
            </div>
        </footer>
    );
}
