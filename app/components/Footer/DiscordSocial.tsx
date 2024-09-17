"use client";

import { useState } from "react";
import { Alert } from "../Alert/Alert";

export function DiscordSocial({ social, dic }) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    return (
        <>
            {(success || error) && (
                <Alert
                    message={success ? dic.contact.usernameCopied : dic.contact.form.error}
                    type={success ? "success" : "danger"}
                />
            )}

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
        </>
    );
}
