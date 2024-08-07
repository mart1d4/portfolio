import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY?.length) {
    throw new Error(
        "The environment variable STRIPE_SECRET_KEY must be set to create payment intents."
    );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    return Response.json(
        {
            clientSecret: paymentIntent.client_secret,
        },
        { status: 200 }
    );
}
