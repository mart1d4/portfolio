"use client";

import { loadStripe, Stripe, StripeElementLocale } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { useEffect, useState } from "react";
import styles from "./Donate.module.css";
import { Dictionary } from "@/types";
import _ from "lodash";

let stripePromise: null | Promise<Stripe | null> = null;

if (process.env.NODE_ENV === "development") {
    stripePromise = loadStripe(
        "pk_test_51PgNc8FSRI467V4xjOyn9mhcGKDxo1I9gPJZ2CCu7lFNXmLV5kk2fyRZwuGrNYamK2X9ZjItPkWhmZyASXXE2Zdq00WFFCoP0d"
    );
} else {
    stripePromise = loadStripe(
        "pk_live_51PgNc8FSRI467V4x9uj4KvalNHXPMBqEMSyakD4a69XWaIeq7mVHcTqs9GE6WaoQ3R4BWAsPft5fJArJCRbdAvbO00EiFGoHPS"
    );
}

export function Donate({ dic }: { dic: Dictionary }) {
    const [clientSecret, setClientSecret] = useState("");
    const [amount, setAmount] = useState(5);
    const [error, setError] = useState("");

    const debouncedFetchPaymentIntent = _.debounce((amount) => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({ amount }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch((err) => {
                console.error(err);
                setError(dic.donate.error);
            });
    }, 500);

    useEffect(() => {
        debouncedFetchPaymentIntent(amount);
        return () => {
            debouncedFetchPaymentIntent.cancel();
        };
    }, [amount]);

    // Get current media prefers-color-scheme
    let prefersDarkScheme = { matches: false };

    if (typeof window !== "undefined") {
        prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    }

    let root: null | HTMLElement = null;
    let primary = "#0f7aaf";

    if (typeof document !== "undefined") {
        root = document.documentElement;
        primary = getComputedStyle(root).getPropertyValue("--primary");
    }

    const options = {
        clientSecret,
        appearance: {
            theme: (prefersDarkScheme?.matches ? "night" : "stripe") as "stripe" | "night" | "flat",
            variables: {
                colorPrimary: primary,
            },
        },
        locale: dic.lang as StripeElementLocale,
    };

    return (
        <>
            <div className={styles.amount}>
                <h2>{amount} €</h2>

                <label htmlFor="amount">{dic.donate.amount}</label>

                <input
                    id="amount"
                    type="range"
                    min="1"
                    max="500"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                />
            </div>

            {clientSecret && (
                <Elements
                    options={options}
                    stripe={stripePromise}
                >
                    <CheckoutForm dic={dic} />
                </Elements>
            )}

            {!clientSecret && !error && <p>{dic.donate.loading}</p>}

            {!clientSecret && error && <p>{dic.donate.stripeError}</p>}
        </>
    );
}
