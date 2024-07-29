import styles from "./Contact.module.css";
import { Socials } from "./Socials";
import { Form } from "@components";

export default function ContactPage() {
    return (
        <main className={styles.main}>
            <section className={styles.centered}>
                <h1>Contact me</h1>

                <p>
                    Want to get in touch? There are a few ways you can reach me. The easiest is to
                    send me an email at <a href="mailto:contact@mart1d4.dev">contact@mart1d4.dev</a>
                    .
                </p>
            </section>

            <section className={styles.centered}>
                <h2>Find me on my socials</h2>
                <Socials />
            </section>

            <section>
                <h2>Or you can use the form below</h2>

                <Form />
            </section>
        </main>
    );
}
