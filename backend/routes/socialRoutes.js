const express = require("express");
const router = express.Router();
const SocialLink = require("../models/SocialLink");
const { protect } = require("../middleware/authMiddleware");

// Get all social links
router.get("/", async (req, res) => {
    try {
        const links = await SocialLink.find();
        res.json(links);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add/Update social link
router.post("/", protect, async (req, res) => {
    const { platform, link, icon } = req.body;
    try {
        // Upsert: update if exists, otherwise create
        const social = await SocialLink.findOneAndUpdate(
            { platform },
            { link, icon },
            { upsert: true, new: true },
        );
        res.json(social);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
