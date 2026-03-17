import { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { Upload, X } from "lucide-react";

const ProjectManager = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveLink: "",
        category: "Web",
    });
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => data.append(key, formData[key]));
        if (image) data.append("image", image);

        try {
            await API.post("/projects", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Project launched successfully!");
            setFormData({
                title: "",
                description: "",
                techStack: "",
                githubLink: "",
                liveLink: "",
                category: "Web",
            });
            setImage(null);
        } catch (err) {
            toast.error("Launch sequence failed.");
        }
    };

    return (
        <div className="glass-morph p-8 rounded-3xl border border-white/10 max-w-4xl">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Project Title"
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-neoPrimary"
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        value={formData.title}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl h-32 outline-none focus:border-neoPrimary"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        value={formData.description}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tech Stack (comma separated)"
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-neoPrimary"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                techStack: e.target.value,
                            })
                        }
                        value={formData.techStack}
                    />
                </div>

                <div className="space-y-4">
                    {/* Image Upload Area */}
                    <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-neoPrimary transition-all cursor-pointer relative">
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {image ? (
                            <div className="text-center">
                                <p className="text-neoAccent text-sm font-bold">
                                    {image.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Click to change
                                </p>
                            </div>
                        ) : (
                            <>
                                <Upload className="text-slate-500 mb-2" />
                                <p className="text-slate-500 text-sm">
                                    Upload Project Thumbnail
                                </p>
                            </>
                        )}
                    </div>

                    <input
                        type="text"
                        placeholder="GitHub Link"
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                githubLink: e.target.value,
                            })
                        }
                        value={formData.githubLink}
                    />
                    <input
                        type="text"
                        placeholder="Live Demo"
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                liveLink: e.target.value,
                            })
                        }
                        value={formData.liveLink}
                    />

                    <button
                        type="submit"
                        className="w-full bg-neoPrimary py-4 rounded-xl font-bold hover:shadow-neo transition-all"
                    >
                        Deploy Project
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectManager;
