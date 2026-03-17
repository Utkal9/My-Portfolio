import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center bg-white pt-20">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Side: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
                        Full Stack Developer
                    </p>
                    <h1 className="text-6xl md:text-7xl font-extrabold text-dark mb-6 leading-tight">
                        I'm{" "}
                        <span className="text-transparent bg-clip-text bg-orange-gradient">
                            Utkal Behera.
                        </span>
                    </h1>
                    <p className="text-gray-600 text-xl mb-10 max-w-lg leading-relaxed">
                        I build high-performance MERN applications and
                        professional developer platforms that solve real-world
                        problems.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="btn-primary">View Projects</button>
                        <button className="px-8 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all">
                            Download Resume
                        </button>
                    </div>
                </motion.div>

                {/* Right Side: Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-orange-gradient opacity-20 blur-2xl rounded-full"></div>
                    <div className="relative rounded-[3rem] overflow-hidden border-[8px] border-white shadow-2xl">
                        <img
                            src="/src/assets/hero.png"
                            alt="Utkal Behera"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
