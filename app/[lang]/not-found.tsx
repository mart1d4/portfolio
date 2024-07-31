import styles from "./not-found.module.css";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className={styles.main}>
            <h1>Where am I?</h1>

            <p>
                It seems you've stumbled upon a page that doesn't exist. I know I'm so good at
                hiding things, but I promise you, this page isn't one of them.
            </p>

            <Link href="/">Return to safety</Link>

            <object
                tabIndex={-1}
                type="image/svg+xml"
                data="/assets/404.svg"
            />
        </main>
    );
}
