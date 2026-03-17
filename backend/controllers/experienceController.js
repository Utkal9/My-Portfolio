const Experience = require("../models/Experience");

// @desc    Get all experience
// @route   GET /api/experience
exports.getExperience = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add experience
// @route   POST /api/experience
// @access  Private/Admin
exports.addExperience = async (req, res) => {
    try {
        const experience = new Experience(req.body);
        const savedExperience = await experience.save();
        res.status(201).json(savedExperience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private/Admin
exports.deleteExperience = async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: "Experience deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
