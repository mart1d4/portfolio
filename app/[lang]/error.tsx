"use client";

import styles from "./error.module.css";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className={styles.main}>
            <section>
                <h1>Something went wrong!</h1>

                <p>
                    Don't worry though, we've been notified and will fix it as soon as possible. In
                    the meantime, you can try to refresh the page or come back later.
                </p>

                <button onClick={() => reset()}>Refresh</button>
            </section>
        </main>
    );
}
