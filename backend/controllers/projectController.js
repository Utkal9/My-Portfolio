const Project = require("../models/Project");

// @desc    Get all projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: projects });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Create new project
exports.createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            techStack,
            githubLink,
            liveLink,
            category,
        } = req.body;

        const projectData = {
            title,
            description,
            techStack: techStack ? techStack.split(",") : [], // Split string "React,Node" into array
            githubLink,
            liveLink,
            category,
        };

        // If a file was uploaded, add image data
        if (req.file) {
            projectData.image = {
                url: req.file.path,
                public_id: req.file.filename,
            };
        }

        const project = await Project.create(projectData);
        res.status(201).json({ success: true, data: project });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
