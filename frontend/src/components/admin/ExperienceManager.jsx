import React, { useState } from "react";
import usePortfolioStore from "../../store/usePortfolioStore";

const ExperienceManager = () => {
    const { experiences, addExperience, removeExperience } =
        usePortfolioStore();
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        duration: "",
        description: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Split description by new lines into an array
        const formattedData = {
            ...formData,
            description: formData.description.split("\n"),
        };
        await addExperience(formattedData);
        setFormData({ company: "", role: "", duration: "", description: "" });
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">
                Manage Experience
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 mb-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        className="bg-gray-700 text-white p-2 rounded"
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                company: e.target.value,
                            })
                        }
                        required
                    />
                    <input
                        className="bg-gray-700 text-white p-2 rounded"
                        placeholder="Role"
                        value={formData.role}
                        onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                        }
                        required
                    />
                    <input
                        className="bg-gray-700 text-white p-2 rounded"
                        placeholder="Duration (e.g. 2023 - Present)"
                        value={formData.duration}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                duration: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <textarea
                    className="bg-gray-700 text-white p-2 rounded w-full h-24"
                    placeholder="Description (one point per line)"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                />
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold transition"
                >
                    Add Experience
                </button>
            </form>

            <div className="space-y-4">
                {experiences.map((exp) => (
                    <div
                        key={exp._id}
                        className="bg-gray-700 p-4 rounded flex justify-between items-start"
                    >
                        <div>
                            <h3 className="text-white font-bold">
                                {exp.role} @ {exp.company}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {exp.duration}
                            </p>
                        </div>
                        <button
                            onClick={() => removeExperience(exp._id)}
                            className="text-red-500 hover:text-red-400"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceManager;
