const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

exports.getGallery = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.uploadImage = async (req, res) => {
    try {
        const { imageUrl, cloudinaryPublicId, title, category } = req.body;
        const newImage = new Gallery({
            imageUrl,
            cloudinaryPublicId,
            title,
            category,
        });
        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);
        if (image) {
            await cloudinary.uploader.destroy(image.cloudinaryPublicId);
            await image.deleteOne();
            res.json({ message: "Image deleted" });
        } else {
            res.status(404).json({ message: "Image not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
