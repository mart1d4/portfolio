"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { useEffect, useState } from "react";
import styles from "./Help.module.css";
import _ from "lodash";

const stripePromise = loadStripe(
    "pk_live_51PgNc8FSRI467V4x9uj4KvalNHXPMBqEMSyakD4a69XWaIeq7mVHcTqs9GE6WaoQ3R4BWAsPft5fJArJCRbdAvbO00EiFGoHPS"
);

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

    const options = {
        clientSecret,
    };

    return (
        <main className={styles.main}>
            <section>
                <h1>Help me getting started</h1>

                <p>
                    Currently studying Computer Science at university, I am looking for a way to get
                    started with real projects and am looking for potential clients. If you could
                    help me with that, I would be very grateful. In case you want to support me but
                    don't know how, consider supporting me with a donation.
                </p>

                <h2>{amount} €</h2>

                <input
                    type="range"
                    min="1"
                    max="500"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                />

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
