"use client";

import styles from "./Languages.module.css";

export function Languages() {
    return (
        <div className={styles.container}>
            <button>
                <img
                    src="/assets/flags/en.svg"
                    alt="English flag"
                />

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    fill="none"
                    height="16"
                    width="16"
                >
                    <path d="M6 9l6 6l6 -6" />
                </svg>
            </button>
        </div>
    );
}
