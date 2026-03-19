const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        techStack: [{ type: String }], // Changed to Array for easier filtering
        githubLink: { type: String },
        liveLink: { type: String },
        imageURL: { type: String },
        cloudinaryPublicId: { type: String }, // Added for efficient Cloudinary management
        category: {
            type: String,
            enum: ["Web Development", "Mobile App", "AI/ML", "Other"],
            default: "Web Development",
            trim: true, // This removes accidental spaces from the frontend!
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
