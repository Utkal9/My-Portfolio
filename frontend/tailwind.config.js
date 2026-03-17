/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#ff6b00", // Your Orange
                secondary: "#ff3b3b", // Your Red
                dark: "#1a1a1a", // For text
                light: "#ffffff", // Background
            },
            backgroundImage: {
                "orange-gradient":
                    "linear-gradient(135deg, #ff6b00 0%, #ff3b3b 100%)",
            },
        },
    },
    plugins: [],
};
