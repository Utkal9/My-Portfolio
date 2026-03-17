const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, default: "Portfolio Contact" },
        message: { type: String, required: true },
        status: { type: String, default: "unread" }, // Helpful for your Admin Dashboard
    },
    { timestamps: true },
);

module.exports = mongoose.model("Message", MessageSchema);
