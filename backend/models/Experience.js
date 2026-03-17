const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
    {
        company: { type: String, required: true },
        role: { type: String, required: true },
        duration: { type: String, required: true }, // e.g., "June 2023 - Present"
        description: [{ type: String }], // Array of bullet points
        technologies: [{ type: String }],
        location: { type: String },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Experience", experienceSchema);
