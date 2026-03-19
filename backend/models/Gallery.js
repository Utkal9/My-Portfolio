const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add a title for the image"],
            trim: true,
        },
        imageUrl: {
            type: String,
            required: [true, "Image URL is required"],
        },
        publicId: {
            type: String,
            required: [true, "Cloudinary public ID is required for deletion"],
        },
        category: {
            type: String,
            enum: ["Hackathon", "Setup", "Event", "Other"],
            default: "Other",
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Gallery", gallerySchema);
