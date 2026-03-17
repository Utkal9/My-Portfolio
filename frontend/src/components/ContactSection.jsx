import React from "react";
import ContactForm from "./ContactForm";
import AnimatedSection from "./ui/AnimatedSection";
import { Mail, MapPin } from "lucide-react";

const ContactSection = () => {
    return (
        <section id="contact" className="py-24 bg-black">
            <div className="max-w-6xl mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Let's Build Something
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        I'm currently looking for new opportunities. Whether you
                        have a question or just want to say hi, I'll try my best
                        to get back to you!
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Email</h4>
                                <p className="text-gray-400 text-sm">
                                    utkalbehera59@gmail.com
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">
                                    Location
                                </h4>
                                <p className="text-gray-400 text-sm">
                                    India (Remote/Onsite)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
