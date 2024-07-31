import { getDictionary } from "@/lib/getDictionary";
import styles from "./page.module.css";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(lang);

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div>
                    <h1>{dictionary.landing.hero.title}</h1>

                    <p>{dictionary.landing.hero.text}</p>

                    <div className={styles.cta}>
                        <Link href="/projects">{dictionary.landing.hero.button1}</Link>
                        <Link href="/contact">{dictionary.landing.hero.button2}</Link>
                    </div>
                </div>

                <Image
                    priority
                    width={500}
                    height={500}
                    src="/assets/tourist.svg"
                    alt={dictionary.landing.hero.illustrationAlt}
                    style={{
                        height: "auto",
                        width: "100%",
                    }}
                />
            </section>

            <section className={styles.game}>
                <h2>{dictionary.landing.game.title}</h2>

                {/* <div>
                    <canvas>Your browser does not support the HTML5 canvas element.</canvas>
                </div> */}

                <p>{dictionary.landing.game.text}</p>

                <Link href="/projects">{dictionary.landing.game.button}</Link>
            </section>
        </main>
    );
}
