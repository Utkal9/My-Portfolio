const Skill = require("../models/Skill");

// @desc    Get all skills
// @route   GET /api/skills
exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new skill
// @route   POST /api/skills
// @access  Private/Admin
exports.addSkill = async (req, res) => {
    const { skillName, category, level, icon } = req.body;
    try {
        const skill = new Skill({ skillName, category, level, icon });
        const savedSkill = await skill.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (skill) {
            await skill.deleteOne();
            res.json({ message: "Skill removed" });
        } else {
            res.status(404).json({ message: "Skill not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
