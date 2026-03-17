import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./ui/AnimatedSection";

const About = () => {
    return (
        <section id="about" className="py-24 bg-black overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <AnimatedSection>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-xl"></div>
                            <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                                <img
                                    src="/src/assets/hero.png"
                                    alt="Utkal Behera"
                                    className="w-full grayscale hover:grayscale-0 transition duration-500"
                                />
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection>
                        <h2 className="text-blue-500 font-mono text-sm mb-4 uppercase tracking-widest">
                            01. About Me
                        </h2>
                        <h3 className="text-3xl font-bold text-white mb-6">
                            Developing with Purpose.
                        </h3>
                        <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
                            <p>
                                Hello! My name is{" "}
                                <span className="text-white">Utkal Behera</span>
                                . My journey into web development started back
                                in college when I realized I could turn lines of
                                code into functional, beautiful products.
                            </p>
                            <p>
                                Fast-forward to today, and I've had the
                                privilege of working on diverse projects—from{" "}
                                <span className="text-blue-400">
                                    Social Media Platforms
                                </span>{" "}
                                to{" "}
                                <span className="text-purple-400">
                                    AI-integrated applications
                                </span>
                                . My main focus these days is building
                                accessible, high-performance products for the
                                web.
                            </p>
                            <p>
                                I'm a B.Tech Computer Science student at{" "}
                                <span className="text-white">
                                    Lovely Professional University
                                </span>
                                , constantly pushing the boundaries of what I
                                can build with the{" "}
                                <span className="text-blue-500 font-mono">
                                    MERN Stack
                                </span>
                                .
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default About;
