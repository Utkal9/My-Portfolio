const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        techStack: [{ type: String }], // Array of strings (e.g., ["React", "Node"])
        image: {
            url: String,
            public_id: String, // For Cloudinary deletion
        },
        githubLink: { type: String },
        liveLink: { type: String },
        category: { type: String, default: "Web" },
        featured: { type: Boolean, default: false },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Project", ProjectSchema);
