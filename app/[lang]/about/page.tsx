import styles from "./About.module.css";

export default function About() {
    return (
        <main className={styles.main}>
            <section>
                <h1>All of that is great, but who are you?</h1>

                <p>
                    I'm a student at a university in Paris doing a degree in computer science. I'm
                    passionate about web and software development and I'm always looking for new
                    things to learn. For now, this place is just a way for me to showcase my
                    projects and expose ways to contact me. In the future, I plan to add a blog and
                    maybe some other features to make this place more interesting.
                </p>
            </section>
        </main>
    );
}
