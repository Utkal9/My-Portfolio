import React, { useState } from "react";
import usePortfolioStore from "../../store/usePortfolioStore";

const SkillManager = () => {
    const { skills, addSkill, removeSkill } = usePortfolioStore();
    const [formData, setFormData] = useState({
        skillName: "",
        category: "Frontend",
        level: "Intermediate",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addSkill(formData);
        setFormData({
            skillName: "",
            category: "Frontend",
            level: "Intermediate",
        });
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">
                Manage Skills
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-6">
                <input
                    className="bg-gray-700 text-white p-2 rounded flex-1"
                    placeholder="Skill Name (e.g. React)"
                    value={formData.skillName}
                    onChange={(e) =>
                        setFormData({ ...formData, skillName: e.target.value })
                    }
                    required
                />
                <select
                    className="bg-gray-700 text-white p-2 rounded"
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Programming">Programming</option>
                    <option value="Tools">Tools</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold transition"
                >
                    Add Skill
                </button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill) => (
                    <div
                        key={skill._id}
                        className="bg-gray-700 p-3 rounded flex justify-between items-center"
                    >
                        <span className="text-gray-200">{skill.skillName}</span>
                        <button
                            onClick={() => removeSkill(skill._id)}
                            className="text-red-500 hover:text-red-400"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillManager;
