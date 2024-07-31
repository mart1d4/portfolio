"use client";

import styles from "./Form.module.css";
import { Dictionary } from "@/types";
import { Alert } from "@components";
import { useState } from "react";

export function Form({ dic }: { dic: Dictionary }) {
    const formDic = dic.contact.form;

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        if (loading) return;
        setLoading(true);

        if (!message || message.length > 4096) {
            setErrors((prev) => ({
                ...prev,
                message: !message ? formDic.messageRequired : formDic.messageTooLong,
            }));
            setLoading(false);
            return;
        }

        if (name.length > 50) {
            setErrors((prev) => ({ ...prev, name: formDic.nameTooLong }));
            setLoading(false);
            return;
        }

        if (email.length > 256) {
            setErrors((prev) => ({ ...prev, email: formDic.emailTooLong }));
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (!response.ok) {
                setError(formDic.error);
            } else {
                setSuccess(formDic.success);
                setName("");
                setEmail("");
                setMessage("");
                setErrors({});
            }

            setTimeout(() => {
                setSuccess("");
                setError("");
            }, 5000);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            className={styles.form}
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
            }}
        >
            {(success || error) && (
                <Alert
                    message={success || error}
                    type={success ? "success" : "danger"}
                />
            )}

            <p>{formDic.text}</p>

            <div className={styles.inputs}>
                <div>
                    <label htmlFor="name">
                        {formDic.name}
                        {errors.name && <span>* {errors.name}</span>}
                    </label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        maxLength={50}
                        placeholder="C-3PO"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setErrors((prev) => ({ ...prev, name: "" }));
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="email">
                        {formDic.email}
                        {errors.email && <span>* {errors.email}</span>}
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        maxLength={256}
                        placeholder="c3po@astromech.io"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="message">
                        {formDic.message}
                        <span>* {!!errors.message?.length && errors.message}</span>
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        maxLength={4096}
                        placeholder={formDic.messagePlaceholder}
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            setErrors((prev) => ({ ...prev, message: "" }));
                        }}
                    />

                    <span className={message.length > 4096 ? styles.error : undefined}>
                        {message.length}/4096
                    </span>
                </div>

                <button type="submit">
                    {formDic.button}
                    {loading && <div className={styles.loading} />}
                </button>
            </div>
        </form>
    );
}
