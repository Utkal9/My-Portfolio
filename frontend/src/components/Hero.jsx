import React, { useState, useEffect } from "react";
import API from "../services/api";

const Hero = () => {
    const [resumeUrl, setResumeUrl] = useState("#");

    useEffect(() => {
        const getResume = async () => {
            try {
                const { data } = await API.get("/resume");
                if (data) setResumeUrl(data.resumeUrl);
            } catch (err) {
                console.error("Resume fetch failed");
            }
        };
        getResume();
    }, []);

    return (
        <section className="min-h-screen flex items-center justify-center bg-black px-4 pt-20">
            <div className="text-center">
                <h2 className="text-blue-500 font-mono mb-4 text-lg">
                    Hi, my name is
                </h2>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    Utkal Behera.
                </h1>
                <h3 className="text-3xl md:text-5xl font-bold text-gray-400 mb-8">
                    Building the future with MERN & AI.
                </h3>
                <p className="max-w-xl mx-auto text-gray-500 mb-10 text-lg">
                    I'm a Full Stack Developer specializing in building (and
                    occasionally designing) exceptional digital experiences.
                </p>
                <div className="flex justify-center gap-6">
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 py-3 bg-transparent border-2 border-blue-500 text-blue-500 font-bold rounded-lg hover:bg-blue-500 hover:text-white transition"
                    >
                        Download Resume
                    </a>
                    <a
                        href="#projects"
                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                    >
                        View Projects
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
