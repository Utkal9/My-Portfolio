const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const { protect } = require("../middleware/authMiddleware");

// @desc    Get latest active resume
// @route   GET /api/resume
router.get("/", async (req, res) => {
    try {
        const resume = await Resume.findOne({ isActive: true }).sort({
            createdAt: -1,
        });
        res.json(resume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Update/Upload resume
// @route   POST /api/resume
// @access  Private/Admin
router.post("/", protect, async (req, res) => {
    const { resumeUrl, cloudinaryPublicId } = req.body;
    try {
        // Set all previous resumes to inactive
        await Resume.updateMany({}, { isActive: false });

        const newResume = new Resume({ resumeUrl, cloudinaryPublicId });
        await newResume.save();
        res.status(201).json(newResume);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
