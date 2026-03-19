/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                // Assuming you want a clean modern font like Inter or Roboto
                sans: ["Inter", "system-ui", "sans-serif"],
                mono: ["Fira Code", "monospace"],
            },
            animation: {
                "fade-in": "fadeIn 0.4s ease-out forwards",
                "slide-up": "slideUp 0.5s ease-out forwards",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [
        // You can add plugins like line-clamp or typography here if needed later
    ],
};
