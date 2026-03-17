import React from "react";
import usePortfolioStore from "../store/usePortfolioStore";

const ExperienceTimeline = () => {
    const { experiences } = usePortfolioStore();

    return (
        <section id="experience" className="py-20 bg-black">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    Experience
                </h2>
                <div className="space-y-12">
                    {experiences.map((exp) => (
                        <div
                            key={exp._id}
                            className="relative pl-8 border-l-2 border-blue-500"
                        >
                            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                            <div className="mb-1 flex flex-wrap justify-between items-center">
                                <h3 className="text-2xl font-bold text-white">
                                    {exp.role}
                                </h3>
                                <span className="text-blue-400 font-mono text-sm">
                                    {exp.duration}
                                </span>
                            </div>
                            <h4 className="text-lg text-gray-300 mb-4">
                                {exp.company}
                            </h4>
                            <ul className="list-disc list-inside text-gray-400 space-y-2">
                                {exp.description.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;
