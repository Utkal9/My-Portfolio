const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, "Please add a company or organization name"],
            trim: true,
        },
        role: {
            type: String,
            required: [true, "Please add your role or job title"],
            trim: true,
        },
        startDate: {
            type: Date,
            required: [true, "Please add a start date"],
        },
        endDate: {
            type: Date,
        },
        isCurrentJob: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            required: [
                true,
                "Please add a description of your responsibilities",
            ],
        },
        technologies: [
            {
                type: String,
            },
        ],
        order: {
            type: Number,
            default: 0, // Helps with custom sorting if needed
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Experience", experienceSchema);
