import React from "react";
import usePortfolioStore from "../store/usePortfolioStore";

const SkillSection = () => {
    const { skills } = usePortfolioStore();

    const categories = [
        "Frontend",
        "Backend",
        "Programming",
        "Tools",
        "Database",
    ];

    return (
        <section id="skills" className="py-20 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    Technical Shelf
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat) => {
                        const filteredSkills = skills.filter(
                            (s) => s.category === cat,
                        );
                        if (filteredSkills.length === 0) return null;

                        return (
                            <div
                                key={cat}
                                className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors"
                            >
                                <h3 className="text-xl font-bold text-blue-400 mb-4">
                                    {cat}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {filteredSkills.map((skill) => (
                                        <span
                                            key={skill._id}
                                            className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm border border-gray-600"
                                        >
                                            {skill.skillName}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SkillSection;
