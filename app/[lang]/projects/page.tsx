import { getDictionary } from "@/lib/getDictionary";
import styles from "./Projects.module.css";
import { ScrollDown } from "@components";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage({ params: { lang } }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(lang);
    const dic = dictionary.projects;

    return (
        <main className={styles.main}>
            <section>
                <h1>{dic.title}</h1>
                <p>{dic.text}</p>

                <ScrollDown scrollTarget="projects" />
            </section>

            <section>
                <ul
                    id="projects"
                    className={styles.projectList}
                >
                    {dic.list.map((project) => (
                        <li
                            key={project.name}
                            className={styles.project}
                        >
                            <main>
                                <header>
                                    <h2>{project.name}</h2>

                                    <span
                                        title={project.inProgress ? dic.progress : dic.done}
                                        className={styles.status}
                                    >
                                        <span>{project.inProgress ? dic.progress : dic.done}</span>

                                        {project.inProgress ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                strokeLinejoin="round"
                                                strokeLinecap="round"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                fill="none"
                                                height="24"
                                                width="24"
                                            >
                                                <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
                                                <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
                                                <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
                                                <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
                                                <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="24"
                                                width="24"
                                            >
                                                <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                                            </svg>
                                        )}
                                    </span>
                                </header>

                                <p>{project.description}</p>

                                <footer>
                                    {project.ghLink && (
                                        <Link
                                            target="_blank"
                                            href={project.ghLink}
                                            rel="noopener noreferrer"
                                        >
                                            {dic.ghButton}
                                        </Link>
                                    )}

                                    {project.demoLink && (
                                        <Link
                                            target="_blank"
                                            href={project.demoLink}
                                            rel="noopener noreferrer"
                                        >
                                            {dic.demoButton}
                                        </Link>
                                    )}

                                    {project.name === "Portfolio" && <div>{dic.portfolioNote}</div>}
                                </footer>
                            </main>

                            <aside>
                                <Image
                                    width={900}
                                    height={900}
                                    alt={project.imageAlt}
                                    src={`/assets/projects/${project.image}`}
                                />
                            </aside>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
