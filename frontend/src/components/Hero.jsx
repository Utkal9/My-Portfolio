import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center p-6 bg-liquid-gradient">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full">
                {/* Main Bento Box: Intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-2 glass-morph bento-inner flex flex-col justify-between"
                >
                    <div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
                            Hi, I'm{" "}
                            <span className="text-neoPrimary">
                                Utkal Behera
                            </span>
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-slate-400">
                            I build{" "}
                            <span className="text-white">
                                <Typewriter
                                    words={[
                                        "Scalable Apps",
                                        "MERN Systems",
                                        "AI Interfaces",
                                    ]}
                                    loop={0}
                                    cursor
                                />
                            </span>
                        </h2>
                    </div>
                    <p className="mt-8 text-slate-400 max-w-md">
                        Full-Stack Developer specializing in high-performance
                        web applications and production-level architecture.
                    </p>
                </motion.div>

                {/* Bento Box: Profile Image (Neo-Brutalism Border) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-morph bento-inner border-2 border-neoPrimary shadow-neo overflow-hidden flex items-center justify-center"
                >
                    <img
                        src="/your-photo.jpg"
                        alt="Utkal"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                </motion.div>

                {/* Bento Box: Socials & Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="glass-morph bento-inner flex justify-around items-center"
                >
                    <Github className="hover:text-neoPrimary cursor-pointer" />
                    <Linkedin className="hover:text-neoPrimary cursor-pointer" />
                    <Mail className="hover:text-neoPrimary cursor-pointer" />
                    <button className="bg-neoPrimary px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-all">
                        Resume <ExternalLink size={16} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
