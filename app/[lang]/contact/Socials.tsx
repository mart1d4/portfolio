"use client";

import { Alert, Tooltip, TooltipContent, TooltipTrigger } from "@components";
import styles from "./Contact.module.css";
import { socials } from "@/lib/socials";
import { Dictionary } from "@/types";
import { useState } from "react";

export function Socials({ dic }: { dic: Dictionary }) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className={styles.socials}>
            {success && (
                <Alert
                    message={dic.contact.usernameCopied}
                    type="success"
                />
            )}

            {error && (
                <Alert
                    message={dic.contact.form.error}
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
                                {social.icon}
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
                                {social.icon}
                            </a>
                        )}
                    </TooltipTrigger>

                    <TooltipContent>{social.name}</TooltipContent>
                </Tooltip>
            ))}
        </div>
    );
}
