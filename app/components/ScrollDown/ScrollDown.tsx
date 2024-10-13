import styles from "./ScrollDown.module.css";
import Link from "next/link";

export function ScrollDown({ scrollTarget }: { scrollTarget: string }) {
    return (
        <Link
            href={`#${scrollTarget}`}
            className={styles.scrollDown}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                height="24"
                width="24"
            >
                <path d="M12,20c-.534,0-1.036-.208-1.414-.586l-5.281-5.281,1.414-1.414,5.281,5.281,5.281-5.281,1.414,1.414-5.281,5.281c-.378,.378-.88,.586-1.414,.586Zm.825-7.001l5.871-5.871-1.414-1.414-5.281,5.282L6.719,5.714l-1.414,1.414,5.873,5.874c.227,.225,.523,.337,.821,.337s.598-.113,.826-.34Z" />
            </svg>

            <div />
        </Link>
    );
}