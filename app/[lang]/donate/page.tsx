import styles from "./Donate.module.css";
import Donate from "./DonatePage";

export default function DonatePage() {
    return (
        <main className={styles.main}>
            <section>
                <h1>Help me getting started</h1>

                <p>
                    Currently studying Computer Science at university, I am looking for a way to get
                    started with real projects and am looking for potential clients. If you could
                    help me with that, I would be very grateful. In case you want to support me but
                    don't know how, consider donating a small amount of money. It would help me a
                    lot!
                </p>

                <p>
                    You can send the money directly to my PayPal if you prefer. Just use{" "}
                    <a
                        href="https://paypal.me/themart1d4"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        this link
                    </a>
                    .
                </p>

                <Donate />
            </section>
        </main>
    );
}
