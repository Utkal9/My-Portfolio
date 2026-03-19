import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import useSkillStore from "../../store/useSkillStore";

const SkillManager = () => {
    const { skills, fetchSkills, addSkill, deleteSkill } = useSkillStore();
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [skillName, setSkillName] = useState("");
    const [category, setCategory] = useState("Frontend");
    const [level, setLevel] = useState("Intermediate");
    const [icon, setIcon] = useState("");

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    const handleAdd = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");

        await addSkill({ skillName, category, level, icon }, token);

        setShowForm(false);
        setSkillName("");
        setIcon("");
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("adminToken");
        await deleteSkill(id, token);
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Manage Skills
                </h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={18} /> Add New Skill
                </button>
            </div>

            {/* Add Skill Form */}
            {showForm && (
                <form
                    onSubmit={handleAdd}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Skill Name
                            </label>
                            <input
                                type="text"
                                required
                                value={skillName}
                                onChange={(e) => setSkillName(e.target.value)}
                                placeholder="e.g. React.js"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50"
                            >
                                <option>Frontend</option>
                                <option>Backend</option>
                                <option>Programming</option>
                                <option>Database</option>
                                <option>Tools</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Proficiency Level
                            </label>
                            <select
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50"
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Expert</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Icon (Short text or SVG class)
                            </label>
                            <input
                                type="text"
                                value={icon}
                                onChange={(e) => setIcon(e.target.value)}
                                placeholder="e.g. Re"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors"
                        >
                            Save Skill
                        </button>
                    </div>
                </form>
            )}

            {/* Skills List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 text-sm font-semibold text-gray-600">
                                Skill
                            </th>
                            <th className="p-4 text-sm font-semibold text-gray-600">
                                Category
                            </th>
                            <th className="p-4 text-sm font-semibold text-gray-600">
                                Level
                            </th>
                            <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((skill) => (
                            <tr
                                key={skill._id}
                                className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors"
                            >
                                <td className="p-4 font-medium text-gray-900 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
                                        {skill.icon ||
                                            skill.skillName.charAt(0)}
                                    </div>
                                    {skill.skillName}
                                </td>
                                <td className="p-4 text-sm text-gray-600">
                                    {skill.category}
                                </td>
                                <td className="p-4 text-sm">
                                    <span
                                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                                            skill.level === "Expert"
                                                ? "bg-red-100 text-red-600"
                                                : skill.level === "Intermediate"
                                                  ? "bg-orange-100 text-orange-600"
                                                  : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {skill.level}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => handleDelete(skill._id)}
                                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SkillManager;
