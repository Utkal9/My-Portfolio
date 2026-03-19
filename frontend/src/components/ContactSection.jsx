import React from "react";
import ContactForm from "./ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
    return (
        <section
            id="contact"
            className="py-20 bg-gray-50 relative overflow-hidden"
        >
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Get In Touch
                    </h2>
                    <div className="w-16 h-1 bg-red-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                        Whether you have a question, a project idea, or just
                        want to say hi, I'll try my best to get back to you!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Direct Contact Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col items-center text-center hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)] transition-shadow">
                            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-4">
                                <Mail size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-1">
                                Email Me
                            </h4>
                            <p className="text-gray-500 text-sm">
                                hello@example.com
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col items-center text-center hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)] transition-shadow">
                            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-4">
                                <Phone size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-1">
                                Call Me
                            </h4>
                            <p className="text-gray-500 text-sm">
                                +91 98765 43210
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col items-center text-center hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)] transition-shadow">
                            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-4">
                                <MapPin size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-1">
                                Location
                            </h4>
                            <p className="text-gray-500 text-sm">
                                Odisha, India
                            </p>
                        </div>
                    </div>

                    {/* Contact Form Container */}
                    <div className="lg:col-span-8">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
