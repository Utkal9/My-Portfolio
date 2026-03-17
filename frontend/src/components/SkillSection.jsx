import React from "react";
import usePortfolioStore from "../store/usePortfolioStore";
import SkillBadge from "./SkillBadge";
import AnimatedSection from "./ui/AnimatedSection";

const SkillSection = () => {
    const { skills } = usePortfolioStore();
    const categories = [
        "Frontend",
        "Backend",
        "Programming",
        "Database",
        "Tools",
    ];

    return (
        <section id="skills" className="py-24 bg-gray-950">
            <div className="max-w-6xl mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Technical Toolkit
                    </h2>
                    <p className="text-gray-400">
                        The technologies and tools I use to bring ideas to life.
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {categories.map((cat) => {
                        const filtered = skills.filter(
                            (s) => s.category === cat,
                        );
                        if (filtered.length === 0) return null;

                        return (
                            <div key={cat} className="space-y-6">
                                <h3 className="text-lg font-mono text-blue-500 flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-blue-500/50"></span>
                                    {cat}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {filtered.map((skill) => (
                                        <SkillBadge
                                            key={skill._id}
                                            skill={skill}
                                        />
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
