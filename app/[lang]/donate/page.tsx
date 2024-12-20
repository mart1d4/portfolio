import { getDictionary } from "@/lib/getDictionary";
import styles from "./Donate.module.css";
import { Locale } from "@/i18n-config";
import { Donate } from "./DonatePage";

export default async function DonatePage({ params: { lang } }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(lang);

    return (
        <main className={styles.main}>
            <section>
                <h1>{dictionary.donate.title}</h1>

                <p>{dictionary.donate.text1}</p>
                <p>{dictionary.donate.text2}</p>

                <p>
                    {dictionary.donate.paypal}{" "}
                    <a
                        href="https://paypal.me/themart1d4"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {dictionary.donate.link}
                    </a>
                    .
                </p>

                <Donate dic={dictionary} />
            </section>
        </main>
    );
}
