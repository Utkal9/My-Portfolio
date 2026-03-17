const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        resumeUrl: { type: String, required: true },
        cloudinaryPublicId: { type: String, required: true },
        version: { type: String, default: "1.0" },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Resume", resumeSchema);
