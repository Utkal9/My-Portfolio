import React, { useEffect } from "react";
import { Briefcase, Calendar } from "lucide-react";
import useExperienceStore from "../store/useExperienceStore";

const ExperienceTimeline = () => {
    const { experiences, loading, error, fetchExperiences } =
        useExperienceStore();

    useEffect(() => {
        fetchExperiences();
    }, [fetchExperiences]);

    // Helper to format dates cleanly
    const formatDate = (dateString, isCurrent) => {
        if (isCurrent) return "Present";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    if (loading)
        return (
            <div className="py-20 text-center text-orange-500">
                Loading timeline...
            </div>
        );
    if (error) return null; // Or handle error gracefully
    if (experiences.length === 0) return null; // Don't show section if no data

    return (
        <section id="experience" className="py-20 bg-white relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Experience & Journey
                    </h2>
                    <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
                </div>

                <div className="relative">
                    {/* The Vertical Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-orange-100 rounded-full"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp._id}
                                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} items-center`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[-8px] md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 bg-white border-4 border-orange-500 rounded-full z-10 shadow-sm"></div>

                                {/* Content Card */}
                                <div className="ml-8 md:ml-0 md:w-1/2 w-full p-4">
                                    <div
                                        className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)] transition-all duration-300 ${index % 2 === 0 ? "md:ml-8" : "md:mr-8"}`}
                                    >
                                        <div className="flex items-center gap-2 text-orange-500 mb-2">
                                            <Briefcase size={16} />
                                            <span className="font-bold text-gray-900 text-lg">
                                                {exp.role}
                                            </span>
                                        </div>

                                        <h4 className="text-md font-semibold text-gray-700 mb-3">
                                            {exp.company}
                                        </h4>

                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-4 bg-gray-50 inline-block px-3 py-1.5 rounded-full border border-gray-100">
                                            <Calendar
                                                size={14}
                                                className="inline mr-1"
                                            />
                                            {formatDate(exp.startDate)} -{" "}
                                            {formatDate(
                                                exp.endDate,
                                                exp.isCurrentJob,
                                            )}
                                        </div>

                                        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                            {exp.description}
                                        </p>

                                        {exp.technologies &&
                                            exp.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-auto">
                                                    {exp.technologies.map(
                                                        (tech, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-[11px] font-medium bg-orange-50 text-orange-600 px-2 py-1 rounded-md"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;
