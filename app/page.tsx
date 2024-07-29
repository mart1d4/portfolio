import styles from "./page.module.css";
import Link from "next/link";

export default function HomePage() {
    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div>
                    <h1>Got lost in the vastness of the internet?</h1>

                    <p>
                        Welcome here stranger! I'm a software engineer who loves to build things for
                        the web. I'm currently working on some cool projects and learning new
                        technologies. I'm also open to new opportunities, so feel free to contact me
                        if you want to work together.
                    </p>

                    <div className={styles.cta}>
                        <Link href="/projects">Check out my projects</Link>
                        <Link href="/contact">Contact me</Link>
                    </div>
                </div>

                <div>
                    <video
                        src="/assets/palmtree.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>
            </section>

            <section className={styles.game}>
                <h2>Bored already? Play this little game I made for you</h2>

                {/* <div>
                    <canvas>Your browser does not support the HTML5 canvas element.</canvas>
                </div> */}

                <p>
                    Or don't, it's up to you. I'm not your boss. Kidding, I'm your boss now. Play
                    the game. But, wait, it seems like the game is not working. I guess you have to
                    check out my projects instead.
                </p>

                <Link href="/projects">Pleeeaaaseee look at my projects 🥺</Link>
            </section>
        </main>
    );
}
