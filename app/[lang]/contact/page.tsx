import { getDictionary } from "@/lib/getDictionary";
import { Form, ScrollDown } from "@components";
import styles from "./Contact.module.css";
import { Locale } from "@/i18n-config";
import { Socials } from "./Socials";

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(lang);

    return (
        <main className={styles.main}>
            <section className={styles.centered}>
                <h1>{dictionary.contact.hero.title}</h1>

                <p>
                    {dictionary.contact.hero.text}{" "}
                    <a href="mailto:contact@mart1d4.me">contact@mart1d4.me</a>.
                </p>

                <ScrollDown scrollTarget="socials" />
            </section>

            <section
                id="socials"
                className={styles.centered}
            >
                <h2>{dictionary.contact.socials.title}</h2>
                <Socials dic={dictionary} />
            </section>

            <section className={styles.centered}>
                <h2>{dictionary.contact.form.title}</h2>
                <Form dic={dictionary} />
            </section>
        </main>
    );
}
