const mongoose = require("mongoose");

const socialLinkSchema = new mongoose.Schema(
    {
        platform: { type: String, required: true }, // e.g., 'GitHub', 'LinkedIn'
        link: { type: String, required: true },
        icon: { type: String }, // Can be a FontAwesome class or Lucide icon name
    },
    { timestamps: true },
);

module.exports = mongoose.model("SocialLink", socialLinkSchema);
