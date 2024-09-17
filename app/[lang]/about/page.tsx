import { getDictionary } from "@/lib/getDictionary";
import styles from "./About.module.css";
import { Locale } from "@/i18n-config";

export default async function AboutPage({ params: { lang } }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(lang);

    return (
        <main className={styles.main}>
            <section>
                <h1>{dictionary.about.title}</h1>
                <p>{dictionary.about.text}</p>
            </section>
        </main>
    );
}
