import React, { useState, useEffect } from "react";
import API from "../../services/api";

const SocialManager = () => {
    const [socials, setSocials] = useState([]);
    const [formData, setFormData] = useState({ platform: "", link: "" });

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const { data } = await API.get("/socials");
                setSocials(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSocials();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/socials", formData);
            setSocials((prev) => [
                ...prev.filter((s) => s.platform !== data.platform),
                data,
            ]);
            setFormData({ platform: "", link: "" });
        } catch (err) {
            alert("Error updating social link");
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
                Manage Social Links
            </h2>
            <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
                <input
                    className="bg-gray-700 text-white p-2 rounded flex-1"
                    placeholder="Platform (e.g. LinkedIn)"
                    value={formData.platform}
                    onChange={(e) =>
                        setFormData({ ...formData, platform: e.target.value })
                    }
                    required
                />
                <input
                    className="bg-gray-700 text-white p-2 rounded flex-2"
                    placeholder="URL"
                    value={formData.link}
                    onChange={(e) =>
                        setFormData({ ...formData, link: e.target.value })
                    }
                    required
                />
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-bold transition"
                >
                    Update
                </button>
            </form>
            <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                    <div
                        key={s._id}
                        className="bg-gray-700 px-4 py-2 rounded-full border border-gray-600 text-gray-200"
                    >
                        <span className="font-bold text-blue-400">
                            {s.platform}:
                        </span>{" "}
                        {s.link}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SocialManager;
