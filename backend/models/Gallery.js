const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
    {
        imageUrl: { type: String, required: true },
        cloudinaryPublicId: { type: String, required: true },
        title: { type: String },
        category: {
            type: String,
            enum: ["Professional", "Workspace", "Event", "Achievement"],
            default: "Professional",
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Gallery", gallerySchema);
