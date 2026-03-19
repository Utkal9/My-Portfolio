import React, { useState, useEffect } from "react";
import { Plus, Trash2, Calendar } from "lucide-react";
import useExperienceStore from "../../store/useExperienceStore";

const ExperienceManager = () => {
    const { experiences, fetchExperiences, addExperience, deleteExperience } =
        useExperienceStore();
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isCurrentJob, setIsCurrentJob] = useState(false);
    const [description, setDescription] = useState("");
    const [technologies, setTechnologies] = useState("");

    useEffect(() => {
        fetchExperiences();
    }, [fetchExperiences]);

    const handleAdd = async (e) => {
        e.preventDefault();
        const techArray = technologies
            ? technologies.split(",").map((t) => t.trim())
            : [];
        const token = localStorage.getItem("adminToken");

        await addExperience(
            {
                company,
                role,
                startDate,
                endDate: isCurrentJob ? null : endDate,
                isCurrentJob,
                description,
                technologies: techArray,
            },
            token,
        );

        setShowForm(false);
        // Reset form
        setCompany("");
        setRole("");
        setStartDate("");
        setEndDate("");
        setIsCurrentJob(false);
        setDescription("");
        setTechnologies("");
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("adminToken");
        await deleteExperience(id, token);
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Manage Experience
                </h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={18} /> Add Experience
                </button>
            </div>

            {/* Add Form */}
            {showForm && (
                <form
                    onSubmit={handleAdd}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Company / Organization
                            </label>
                            <input
                                type="text"
                                required
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Role / Title
                            </label>
                            <input
                                type="text"
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                required
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                disabled={isCurrentJob}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50 disabled:opacity-50"
                            />
                            <div className="mt-2 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="current"
                                    checked={isCurrentJob}
                                    onChange={(e) =>
                                        setIsCurrentJob(e.target.checked)
                                    }
                                    className="rounded text-orange-500 focus:ring-orange-500"
                                />
                                <label
                                    htmlFor="current"
                                    className="text-sm text-gray-600"
                                >
                                    I currently work here
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Technologies Used (comma separated)
                        </label>
                        <input
                            type="text"
                            value={technologies}
                            onChange={(e) => setTechnologies(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50"
                        ></textarea>
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
                            Save Experience
                        </button>
                    </div>
                </form>
            )}

            {/* Experience List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 text-sm font-semibold text-gray-600">
                                Role & Company
                            </th>
                            <th className="p-4 text-sm font-semibold text-gray-600">
                                Duration
                            </th>
                            <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {experiences.map((exp) => (
                            <tr
                                key={exp._id}
                                className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors"
                            >
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">
                                        {exp.role}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {exp.company}
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-gray-600 flex items-center gap-2 mt-2">
                                    <Calendar
                                        size={14}
                                        className="text-orange-500"
                                    />
                                    {new Date(exp.startDate).toLocaleDateString(
                                        "en-US",
                                        { month: "short", year: "numeric" },
                                    )}{" "}
                                    -
                                    {exp.isCurrentJob
                                        ? " Present"
                                        : new Date(
                                              exp.endDate,
                                          ).toLocaleDateString("en-US", {
                                              month: "short",
                                              year: "numeric",
                                          })}
                                </td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => handleDelete(exp._id)}
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

export default ExperienceManager;
