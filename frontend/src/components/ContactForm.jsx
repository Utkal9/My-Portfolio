import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState({
        submitting: false,
        success: false,
        error: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, success: false, error: null });

        try {
            await axios.post("/api/contact", formData);
            setStatus({ submitting: false, success: true, error: null });
            setFormData({ name: "", email: "", subject: "", message: "" });

            // Reset success message after 5 seconds
            setTimeout(
                () => setStatus((prev) => ({ ...prev, success: false })),
                5000,
            );
        } catch (error) {
            setStatus({
                submitting: false,
                success: false,
                error: error.response?.data?.error || "Failed to send message.",
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
        >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send me a message
            </h3>

            {status.success && (
                <div className="mb-6 p-4 bg-orange-50 text-orange-600 rounded-lg border border-orange-100 font-medium">
                    Message sent successfully! I'll get back to you soon.
                </div>
            )}

            {status.error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 font-medium">
                    {status.error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors bg-gray-50 text-gray-900"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors bg-gray-50 text-gray-900"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                </label>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors bg-gray-50 text-gray-900"
                    placeholder="Project Inquiry"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors bg-gray-50 text-gray-900 resize-none"
                    placeholder="How can we work together?"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status.submitting}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-lg shadow-lg shadow-orange-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status.submitting ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
};

export default ContactForm;
