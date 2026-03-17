import React, { useState, useEffect } from "react";
import useGalleryStore from "../../store/useGalleryStore";
import axios from "axios";

const GalleryManager = () => {
    const { images, fetchGallery, addImage, removeImage } = useGalleryStore();
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_cloudinary_preset"); // Replace with yours

        setUploading(true);
        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
                formData,
            );
            await addImage({
                imageUrl: res.data.secure_url,
                cloudinaryPublicId: res.data.public_id,
                title: file.name,
            });
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mt-8">
            <h2 className="text-2xl font-bold text-dark mb-6">
                Manage Gallery
            </h2>

            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload New Photo
                </label>
                <input
                    type="file"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary transition-all"
                />
                {uploading && (
                    <p className="mt-2 text-primary animate-pulse">
                        Uploading to Cloudinary...
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img) => (
                    <div
                        key={img._id}
                        className="relative group rounded-xl overflow-hidden aspect-square"
                    >
                        <img
                            src={img.imageUrl}
                            alt={img.title}
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={() => removeImage(img._id)}
                            className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold transition-opacity"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryManager;
