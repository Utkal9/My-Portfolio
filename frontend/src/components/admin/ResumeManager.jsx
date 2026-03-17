import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../services/api";

const ResumeManager = () => {
    const [resume, setResume] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const { data } = await API.get("/resume");
                setResume(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchResume();
    }, []);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_preset"); // Replace with your Cloudinary preset

        setUploading(true);
        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
                formData,
            );
            const resumeData = {
                resumeUrl: res.data.secure_url,
                cloudinaryPublicId: res.data.public_id,
            };
            const { data } = await API.post("/resume", resumeData);
            setResume(data);
            alert("Resume updated successfully!");
        } catch (err) {
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
                Resume Management
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                    {resume ? (
                        <p className="text-gray-300 mb-2">
                            Current Resume:{" "}
                            <a
                                href={resume.resumeUrl}
                                target="_blank"
                                className="text-blue-400 underline"
                            >
                                View PDF
                            </a>
                        </p>
                    ) : (
                        <p className="text-gray-500 mb-2">
                            No resume uploaded yet.
                        </p>
                    )}
                    <input
                        type="file"
                        onChange={handleUpload}
                        className="text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                </div>
                {uploading && (
                    <div className="text-blue-400 font-bold animate-pulse">
                        Uploading to Cloudinary...
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeManager;
