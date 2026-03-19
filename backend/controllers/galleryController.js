const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary"); // Assuming you use Cloudinary

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
exports.getImages = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: images.length,
            data: images,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Upload new image
// @route   POST /api/gallery
// @access  Private (Admin Only)
exports.uploadImage = async (req, res) => {
    try {
        // Note: This assumes req.file exists via a multer upload middleware in the route
        if (!req.file) {
            return res
                .status(400)
                .json({ success: false, error: "Please upload a file" });
        }

        const { title, category } = req.body;

        const newImage = await Gallery.create({
            title,
            category,
            imageUrl: req.file.path, // Cloudinary URL assigned by multer-storage-cloudinary
            publicId: req.file.filename, // Cloudinary public ID
        });

        res.status(201).json({ success: true, data: newImage });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete image
// @route   DELETE /api/gallery/:id
// @access  Private (Admin Only)
exports.deleteImage = async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);
        if (!image) {
            return res
                .status(404)
                .json({ success: false, error: "Image not found" });
        }

        // Delete from Cloudinary first
        await cloudinary.uploader.destroy(image.publicId);

        // Delete from MongoDB
        await image.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
