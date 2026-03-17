import React, { useState } from "react";
import * as api from "../services/api";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        try {
            await api.sendMessage(formData);
            setStatus("Message Sent Successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setStatus("Failed to send message. Please try again.");
        }
    };

    return (
        <section id="contact" className="py-20 bg-black">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-white mb-12">
                    Get In Touch
                </h2>
                <div className="glass-card p-8 md:p-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                className="bg-gray-800 border border-gray-700 text-white p-4 rounded-xl focus:border-blue-500 outline-none transition"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                className="bg-gray-800 border border-gray-700 text-white p-4 rounded-xl focus:border-blue-500 outline-none transition"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <textarea
                            placeholder="Your Message"
                            rows="5"
                            required
                            className="bg-gray-800 border border-gray-700 text-white p-4 rounded-xl w-full focus:border-blue-500 outline-none transition"
                            value={formData.message}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    message: e.target.value,
                                })
                            }
                        />
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition transform hover:scale-[1.01]"
                        >
                            Send Message
                        </button>
                        {status && (
                            <p className="text-center text-gray-400 mt-4">
                                {status}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
