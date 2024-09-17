import styles from "./Alert.module.css";

type AlertProps = {
    message: string;
    type?: "primary" | "success" | "danger";
};

export function Alert({ message, type }: AlertProps) {
    return (
        <div
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            aria-describedby="alert-message"
            className={`${styles.alert}
                ${type === "primary" && styles.primary}
                ${type === "success" && styles.success}
                ${type === "danger" && styles.danger}
            `}
        >
            {(type === "success" || type === "danger") && (
                <div>
                    <svg
                        stroke={type === "success" ? "currentColor" : "none"}
                        fill={type === "success" ? "none" : "currentColor"}
                        xmlns="http://www.w3.org/2000/svg"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        height="32"
                        width="32"
                    >
                        {type === "success" ? (
                            <path d="M5 12l5 5l10 -10" />
                        ) : (
                            <path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1" />
                        )}
                    </svg>
                </div>
            )}

            <p>{message}</p>
        </div>
    );
}
