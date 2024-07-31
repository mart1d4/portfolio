import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.css";
import { useEffect, useState } from "react";
import { Alert } from "@components";

export function CheckoutForm() {
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
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
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
                return_url: `${window.location.origin}/donate/success`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message ?? "An unexpected error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
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
                Donate {isLoading && <div className={styles.loading} />}
            </button>
        </form>
    );
}
