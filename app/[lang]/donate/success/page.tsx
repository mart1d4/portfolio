import { getDictionary } from "@/lib/getDictionary";
import styles from "./Success.module.css";
import { Locale } from "@/i18n-config";

export default async function SuccessPage({ params: { lang } }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(lang);

    return (
        <main className={styles.main}>
            <section>
                <h1>{dictionary.paymentSuccess.title}</h1>
                <p>{dictionary.paymentSuccess.text}</p>
            </section>
        </main>
    );
}
