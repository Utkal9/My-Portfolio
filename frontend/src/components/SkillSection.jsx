import React, { useEffect, useMemo } from "react";
import SkillBadge from "./SkillBadge";
import useSkillStore from "../store/useSkillStore";

const SkillSection = () => {
    const { skills, loading, fetchSkills } = useSkillStore();

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    // Group skills by category for better UI organization
    const groupedSkills = useMemo(() => {
        return skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {});
    }, [skills]);

    if (loading) return null; // Or a subtle loading skeleton

    return (
        <section id="skills" className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Technical Skills
                    </h2>
                    <div className="w-16 h-1 bg-red-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                        A modular breakdown of my technical expertise and
                        current tech stack.
                    </p>
                </div>

                <div className="space-y-12">
                    {Object.keys(groupedSkills).map((category) => (
                        <div key={category} className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">
                                {category}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {groupedSkills[category].map((skill) => (
                                    <SkillBadge key={skill._id} skill={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillSection;
