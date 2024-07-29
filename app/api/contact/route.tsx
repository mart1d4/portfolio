const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

if (!webhookUrl?.length) {
    throw new Error(
        "The environment variable DISCORD_WEBHOOK_URL must be set to send messages to Discord."
    );
}

export async function POST(req: Request) {
    const { name, email, message } = await req.json();

    if (!message || message.length > 4096) {
        return Response.json(
            {
                error: !message
                    ? "Message can't be empty."
                    : "Message must be 4096 characters or less.",
            },
            { status: 400 }
        );
    }

    if (name.length > 50) {
        return Response.json({ error: "Name must be 50 characters or less." }, { status: 400 });
    }

    if (email.length > 256) {
        return Response.json({ error: "Email must be 256 characters or less." }, { status: 400 });
    }

    const embed = {
        title: "New message from contact form",
        fields: [
            {
                name: "Name",
                value: name || "Not specified",
            },
            {
                name: "Email",
                value: email || "Not specified",
            },
            {
                name: "Message",
                value: message,
            },
        ],
        timestamp: new Date().toISOString(),
        color: 0x2f3136,
    };

    const response = await fetch(webhookUrl as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] }),
    });

    if (!response.ok) {
        return Response.json(
            { error: "An error occurred. Please try again later." },
            { status: 500 }
        );
    }

    return Response.json({ success: "Message sent successfully!" }, { status: 200 });
}
