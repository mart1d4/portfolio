"use client";

import { Alert, Tooltip, TooltipContent, TooltipTrigger } from "@components";
import styles from "./Contact.module.css";
import { socials } from "@/lib/socials";
import { useState } from "react";

export function Socials() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className={styles.socials}>
            {success && (
                <Alert
                    message="Username copied to clipboard!"
                    type="success"
                />
            )}

            {error && (
                <Alert
                    message="An error occurred. Please try again."
                    type="danger"
                />
            )}

            {socials.map((social) => (
                <Tooltip>
                    <TooltipTrigger>
                        {social.name === "Discord" ? (
                            <button
                                title="Discord"
                                key={social.name}
                                aria-label="Discord"
                                onClick={async () => {
                                    try {
                                        await navigator.clipboard.writeText("mart1d4");
                                        setSuccess(true);
                                        setTimeout(() => setSuccess(false), 3000);
                                    } catch (e) {
                                        setError(true);
                                        setTimeout(() => setError(false), 3000);
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    height="24"
                                    width="24"
                                >
                                    <path d="M14.983 3l.123 .006c2.014 .214 3.527 .672 4.966 1.673a1 1 0 0 1 .371 .488c1.876 5.315 2.373 9.987 1.451 12.28c-1.003 2.005 -2.606 3.553 -4.394 3.553c-.732 0 -1.693 -.968 -2.328 -2.045a21.512 21.512 0 0 0 2.103 -.493a1 1 0 1 0 -.55 -1.924c-3.32 .95 -6.13 .95 -9.45 0a1 1 0 0 0 -.55 1.924c.717 .204 1.416 .37 2.103 .494c-.635 1.075 -1.596 2.044 -2.328 2.044c-1.788 0 -3.391 -1.548 -4.428 -3.629c-.888 -2.217 -.39 -6.89 1.485 -12.204a1 1 0 0 1 .371 -.488c1.439 -1.001 2.952 -1.459 4.966 -1.673a1 1 0 0 1 .935 .435l.063 .107l.651 1.285l.137 -.016a12.97 12.97 0 0 1 2.643 0l.134 .016l.65 -1.284a1 1 0 0 1 .754 -.54l.122 -.009zm-5.983 7a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15zm6 0a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z" />
                                </svg>
                            </button>
                        ) : (
                            <a
                                target="_blank"
                                key={social.name}
                                href={social.url}
                                title={social.name}
                                aria-label={social.name}
                                rel="noopener noreferrer"
                            >
                                <svg
                                    stroke={social.stroke || "currentColor"}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={social.fill || "none"}
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    height="24"
                                    width="24"
                                >
                                    {social.icon}
                                </svg>
                            </a>
                        )}
                    </TooltipTrigger>

                    <TooltipContent>{social.name}</TooltipContent>
                </Tooltip>
            ))}
        </div>
    );
}
