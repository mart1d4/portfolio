import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.css";
import { useEffect, useState } from "react";
import { Dictionary } from "@/types";
import { Alert } from "@components";

export function CheckoutForm({ dic }: { dic: Dictionary }) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage(dic.donate.success);
                    break;
                case "processing":
                    setMessage(dic.donate.processing);
                    break;
                case "requires_payment_method":
                    setMessage(dic.donate.unsuccessful);
                    break;
                default:
                    setMessage(dic.donate.error);
                    break;
            }
        });
    }, [stripe]);

    useEffect(() => {
        if (message) {
            setTimeout(() => setMessage(null), 5000);
        }
    }, [message]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/${dic.lang}/donate/success`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message ?? "An unexpected error occurred.");
        } else {
            setMessage(dic.donate.unexpected);
        }

        setIsLoading(false);
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            {message && (
                <Alert
                    message={message}
                    type={message.includes("successful") ? "success" : "danger"}
                />
            )}

            <PaymentElement
                id="payment-element"
                options={{ layout: "tabs" } as any}
            />

            <button
                className={styles.submit}
                disabled={isLoading || !stripe || !elements}
            >
                {dic.donate.button} {isLoading && <div className={styles.loading} />}
            </button>
        </form>
    );
}
