import { RoughNotation } from "react-rough-notation";
import { motion } from "framer-motion";

const About = () => {
    return (
        <section className="py-20 px-6 bg-darkBg overflow-hidden">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* The "Human" Side (Doodles) */}
                <div className="relative">
                    <motion.div
                        initial={{ rotate: -2 }}
                        whileHover={{ rotate: 0 }}
                        className="glass-morph p-2 rounded-xl border-2 border-white/5 relative z-10"
                    >
                        <img
                            src="/coding-doodle.png"
                            alt="Working"
                            className="rounded-lg"
                        />
                    </motion.div>

                    {/* Decorative Sketchy SVG (The "Imperfection") */}
                    <svg
                        className="absolute -top-10 -left-10 w-32 h-32 text-neoPrimary opacity-50"
                        viewBox="0 0 100 100"
                    >
                        <path
                            d="M10,50 Q25,10 50,50 T90,50"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* Content Section */}
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold tracking-tight">
                        The <span className="text-neoPrimary">Developer</span>{" "}
                        Behind the Code
                    </h2>

                    <p className="text-slate-400 leading-relaxed text-lg">
                        I'm a{" "}
                        <RoughNotation
                            type="highlight"
                            show={true}
                            color="#6366f133"
                            animationDelay={1000}
                        >
                            B.Tech CS Student
                        </RoughNotation>{" "}
                        at Lovely Professional University[cite: 69]. I don't
                        just write code; I build digital experiences that solve
                        real-world problems[cite: 12, 25].
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-4 glass-morph rounded-2xl border-dashed border-2 border-white/10">
                            <h4 className="font-bold text-neoPrimary">Goal</h4>
                            <p className="text-xs text-slate-500">
                                Scalable MERN Architect [cite: 43]
                            </p>
                        </div>
                        <div className="p-4 glass-morph rounded-2xl border-dashed border-2 border-white/10">
                            <h4 className="font-bold text-neoAccent">Focus</h4>
                            <p className="text-xs text-slate-500">
                                Production-Ready Apps [cite: 14]
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
