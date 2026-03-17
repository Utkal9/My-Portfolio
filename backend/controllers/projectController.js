const { cloudinary } = require("../config/cloudinary");

// @desc    Delete project
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res
                .status(404)
                .json({ success: false, message: "Project not found" });
        }

        // 1. Delete image from Cloudinary if it exists
        if (project.image && project.image.public_id) {
            await cloudinary.uploader.destroy(project.image.public_id);
        }

        // 2. Delete project from MongoDB
        await project.deleteOne();

        res.status(200).json({
            success: true,
            message: "Project and assets removed.",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
