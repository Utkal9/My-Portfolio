import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import useProjectStore from "../../store/useProjectStore";

const ProjectManager = () => {
    const { projects, fetchProjects, addProject, deleteProject } =
        useProjectStore();
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Web Development");
    const [techStack, setTechStack] = useState("");

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleAdd = async (e) => {
        e.preventDefault();
        const techArray = techStack.split(",").map((t) => t.trim());

        // Assuming addProject handles the API call internally
        await addProject({
            title,
            description,
            category,
            techStack: techArray,
        });

        setShowForm(false);
        setTitle("");
        setDescription("");
        setTechStack("");
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Manage Projects
                </h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={18} /> Add New Project
                </button>
            </div>

            {/* Add Project Form */}
            {showForm && (
                <form
                    onSubmit={handleAdd}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Project Title
                            </label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                                <option value="Web Development">
                                    Web Development
                                </option>
                                <option value="Mobile App">Mobile App</option>
                                <option value="AI/ML">AI/ML</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tech Stack (comma separated)
                        </label>
                        <input
                            type="text"
                            required
                            value={techStack}
                            onChange={(e) => setTechStack(e.target.value)}
                            placeholder="React, Node.js, MongoDB"
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
                            Save Project
                        </button>
                    </div>
                </form>
            )}

            {/* Projects List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 text-sm font-semibold text-gray-600">
                                Project Name
                            </th>
                            <th className="p-4 text-sm font-semibold text-gray-600">
                                Category
                            </th>
                            <th className="p-4 text-sm font-semibold text-gray-600">
                                Tech Stack
                            </th>
                            <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr
                                key={project._id}
                                className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors"
                            >
                                <td className="p-4 font-medium text-gray-900">
                                    {project.title}
                                </td>
                                <td className="p-4 text-sm text-gray-600">
                                    <span className="bg-gray-100 px-2 py-1 rounded-md text-xs font-semibold">
                                        {project.category}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    {project.techStack.slice(0, 3).join(", ")}
                                    ...
                                </td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() =>
                                            deleteProject(project._id)
                                        }
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

export default ProjectManager;
