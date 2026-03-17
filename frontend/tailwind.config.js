/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                darkBg: "#030712", // Deep Space Black
                glassCard: "rgba(255, 255, 255, 0.03)",
                neoPrimary: "#6366f1", // Indigo Glow
                neoAccent: "#22c55e", // Cyber Green
            },
            backgroundImage: {
                "liquid-gradient":
                    "radial-gradient(circle at top left, #1e1b4b, #030712)",
            },
            boxShadow: {
                neo: "5px 5px 0px 0px rgba(99, 102, 241, 1)", // Neo-Brutalism shadow
            },
        },
    },
    plugins: [],
};
