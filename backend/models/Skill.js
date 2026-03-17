const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
    {
        skillName: { type: String, required: true },
        category: {
            type: String,
            required: true,
            enum: ["Frontend", "Backend", "Programming", "Tools", "Database"],
        },
        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Expert"],
            default: "Intermediate",
        },
        icon: { type: String }, // Store SVG string or Icon name
    },
    { timestamps: true },
);

module.exports = mongoose.model("Skill", skillSchema);
