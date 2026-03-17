const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
    {
        degree: { type: String, required: true },
        college: { type: String, required: true },
        year: { type: String, required: true }, // e.g., "2020 - 2024"
        description: { type: String },
        grade: { type: String }, // CGPA or Percentage
    },
    { timestamps: true },
);

module.exports = mongoose.model("Education", educationSchema);
