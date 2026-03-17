import React, { useState, useEffect } from "react";
import API from "../services/api";

const Footer = () => {
    const [socials, setSocials] = useState([]);

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const { data } = await API.get("/socials");
                setSocials(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSocials();
    }, []);

    return (
        <footer className="bg-black py-10 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <div className="flex justify-center gap-6 mb-6">
                    {socials.map((s) => (
                        <a
                            key={s._id}
                            href={s.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-blue-500 transition text-sm font-mono uppercase tracking-widest"
                        >
                            {s.platform}
                        </a>
                    ))}
                </div>
                <p className="text-gray-600 text-sm">
                    Designed & Built by Utkal Behera &copy;{" "}
                    {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
