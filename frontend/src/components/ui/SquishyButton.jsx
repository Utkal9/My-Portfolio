import { motion } from "framer-motion";

const SquishyButton = ({ children, onClick, className }) => {
    return (
        <motion.button
            whileHover={{
                scale: 1.05,
                rotate: 1,
                borderRadius: "40px", // "Inflatable" effect
            }}
            whileTap={{
                scale: 0.9,
                borderRadius: "20px", // "Squish" effect
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 10, // Bouncy behavior
            }}
            onClick={onClick}
            className={`px-8 py-4 font-bold rounded-2xl transition-all shadow-lg ${className}`}
        >
            {children}
        </motion.button>
    );
};

export default SquishyButton;
