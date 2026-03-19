import React, { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import axios from "axios";

const GalleryManager = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Hackathon");
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const fetchImages = async () => {
        try {
            const res = await axios.get("/api/gallery");
            setImages(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select an image");

        setUploading(true);
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("category", category);

        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.post("/api/gallery", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            setImages([res.data.data, ...images]);
            setShowForm(false);
            setTitle("");
            setFile(null);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this image?")) return;
        try {
            const token = localStorage.getItem("adminToken");
            await axios.delete(`/api/gallery/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setImages(images.filter((img) => img._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Manage Gallery
                </h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={18} /> Upload Image
                </button>
            </div>

            {/* Upload Form */}
            {showForm && (
                <form
                    onSubmit={handleUpload}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image Title
                            </label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500/20 bg-gray-50"
                            >
                                <option>Hackathon</option>
                                <option>Setup</option>
                                <option>Event</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select File
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                        />
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
                            disabled={uploading}
                            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-70"
                        >
                            {uploading ? "Uploading..." : "Upload Image"}
                        </button>
                    </div>
                </form>
            )}

            {/* Image Grid */}
            {loading ? (
                <div className="text-orange-500 text-center py-10">
                    Loading...
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((img) => (
                        <div
                            key={img._id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={img.imageUrl}
                                    alt={img.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 right-2">
                                    <button
                                        onClick={() => handleDelete(img._id)}
                                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-gray-900 mb-1">
                                    {img.title}
                                </h4>
                                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                                    {img.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryManager;
