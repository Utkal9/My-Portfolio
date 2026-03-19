import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 py-10">
            <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <span className="text-xl font-black tracking-tighter text-gray-900 block mb-1">
                        Utkal<span className="text-orange-500">.</span>
                    </span>
                    <p className="text-sm text-gray-500">
                        Built with MERN Stack & Modular Architecture.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                    >
                        <Github size={18} />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                    >
                        <Linkedin size={18} />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                    >
                        <Twitter size={18} />
                    </a>
                </div>

                <div className="text-sm text-gray-400 font-medium">
                    &copy; {currentYear} Utkal Behera. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
