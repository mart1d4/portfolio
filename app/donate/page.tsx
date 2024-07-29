"use client";

import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { useEffect, useState } from "react";
import styles from "./Help.module.css";
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

export default function HelpPage() {
    const [clientSecret, setClientSecret] = useState("");
    const [amount, setAmount] = useState(5);

    const debouncedFetchPaymentIntent = _.debounce((amount) => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({ amount }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch((err) => console.error(err));
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

    const options = {
        clientSecret,
        appearance: {
            theme: (prefersDarkScheme?.matches ? "night" : "stripe") as "stripe" | "night" | "flat",
        },
    };

    return (
        <main className={styles.main}>
            <section>
                <h1>Help me getting started</h1>

                <p>
                    Currently studying Computer Science at university, I am looking for a way to get
                    started with real projects and am looking for potential clients. If you could
                    help me with that, I would be very grateful. In case you want to support me but
                    don't know how, consider donating a small amount of money. It would help me a
                    lot!
                </p>

                <p>
                    You can send the money directly to my PayPal if you prefer. Just use{" "}
                    <a
                        href="https://paypal.me/themart1d4"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        this link
                    </a>
                    .
                </p>

                <div className={styles.amount}>
                    <h2>{amount} €</h2>

                    <input
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
                        <CheckoutForm />
                    </Elements>
                )}
            </section>
        </main>
    );
}
