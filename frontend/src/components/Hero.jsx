import React from "react";
import { ArrowRight, Download } from "lucide-react";

const Hero = () => {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center pt-20 pb-10 bg-gray-50 relative overflow-hidden"
        >
            {/* Background Decorative Blob */}
            <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="flex flex-col-reverse md:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-left">
                        <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 font-bold text-xs tracking-wider mb-6">
                            FULL-STACK DEVELOPER
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
                            Building digital <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                                experiences.
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                            I am a B.Tech Computer Science student specializing
                            in the MERN stack. I build scalable, modular, and
                            user-centric web applications.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                            <a
                                href="#projects"
                                className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
                            >
                                View My Work <ArrowRight size={18} />
                            </a>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 hover:border-orange-500 hover:text-orange-500 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                            >
                                Download CV <Download size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Image/Avatar */}
                    <div className="flex-1 flex justify-center md:justify-end">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            {/* Orange outline accent behind image */}
                            <div className="absolute inset-0 border-2 border-orange-500 rounded-full translate-x-4 translate-y-4"></div>
                            {/* Your Image */}
                            <img
                                src="/your-profile-image.jpg"
                                alt="Utkal Behera"
                                className="absolute inset-0 w-full h-full object-cover rounded-full z-10 border-4 border-white shadow-xl bg-gray-200"
                                onError={(e) => {
                                    e.target.onerror = null; // This stops the infinite loop!
                                    e.target.src =
                                        "https://dummyimage.com/400x400/ea580c/ffffff.png&text=Profile";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
