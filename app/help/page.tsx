"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { useEffect, useState } from "react";
import styles from "./Help.module.css";

const stripePromise = loadStripe(
    "pk_live_51PgNc8FSRI467V4x9uj4KvalNHXPMBqEMSyakD4a69XWaIeq7mVHcTqs9GE6WaoQ3R4BWAsPft5fJArJCRbdAvbO00EiFGoHPS"
);

export default function HelpPage() {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads

        fetch("/api/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({ items: [{ id: "help" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch((err) => console.error(err));
    }, []);

    const options = {
        clientSecret,
    };

    return (
        <main className={styles.main}>
            <section>
                <h1>Help me getting started</h1>
                <p>
                    Currently studying Computer Science at university, I am looking for a way to get
                    started with web development. I have some experience with HTML, CSS, and
                    JavaScript, as well as several frameworks and libraries. I am looking for a way
                    to get started with a real project. If you could help me with that, I would be
                    very grateful. Consider supporting me with a donation.
                </p>

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
