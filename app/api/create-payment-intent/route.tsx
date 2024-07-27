import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY?.length) {
    throw new Error("The environment variable STRIPE_SECRET_KEY must be set.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function calculateOrderAmount(items: string[]) {
    return 300;
}

export async function POST(req: Request) {
    const { items } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
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