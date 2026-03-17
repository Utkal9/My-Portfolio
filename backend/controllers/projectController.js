const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

// @desc    Get all projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create project
exports.createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            techStack,
            githubLink,
            liveLink,
            imageURL,
            cloudinaryPublicId,
            category,
        } = req.body;
        const project = new Project({
            title,
            description,
            techStack,
            githubLink,
            liveLink,
            imageURL,
            cloudinaryPublicId,
            category,
        });
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete project & remove image from Cloudinary
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project)
            return res.status(404).json({ message: "Project not found" });

        // 1. Delete image from Cloudinary if publicId exists
        if (project.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(project.cloudinaryPublicId);
        }

        // 2. Delete from MongoDB
        await project.deleteOne();
        res.json({ message: "Project and associated image removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
