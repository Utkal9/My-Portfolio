const Experience = require("../models/Experience");

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
exports.getExperiences = async (req, res) => {
    try {
        // Sort by start date descending (newest first)
        const experiences = await Experience.find().sort({ startDate: -1 });
        res.status(200).json({
            success: true,
            count: experiences.length,
            data: experiences,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Add a new experience
// @route   POST /api/experience
// @access  Private (Admin Only)
exports.addExperience = async (req, res) => {
    try {
        const experience = await Experience.create(req.body);
        res.status(201).json({ success: true, data: experience });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete an experience
// @route   DELETE /api/experience/:id
// @access  Private (Admin Only)
exports.deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res
                .status(404)
                .json({ success: false, error: "Experience not found" });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
