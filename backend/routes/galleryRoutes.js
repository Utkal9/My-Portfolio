import express from "express";
import mongoose from "mongoose";
import { uploadBuffer, deleteAsset, uploadAny } from "../config/cloudinary.js";
import auth from "../middleware/authMiddleware.js";

const gallerySchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        publicId: { type: String },
        type: { type: String, default: "image" },
    },
    { timestamps: true },
);

const Gallery =
    mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = await Gallery.find().sort({ createdAt: -1 });
        res.json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});

router.post("/upload", auth, uploadAny.single("image"), async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ success: false, message: "No file" });
        const result = await uploadBuffer(req.file.buffer, "portfolio/gallery");
        const item = await Gallery.create({
            url: result.url,
            publicId: result.public_id,
        });
        res.status(201).json({ success: true, data: item });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item)
            return res
                .status(404)
                .json({ success: false, message: "Not found" });
        await deleteAsset(item.publicId);
        await item.deleteOne();
        res.json({ success: true, message: "Deleted" });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});

export default router;
