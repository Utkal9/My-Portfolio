import express from "express";
import { Experience } from "../models/index.js";
import auth from "../middleware/authMiddleware.js";
import { uploadCert, uploadBuffer, deleteAsset } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = await Experience.find({ visible: true }).sort({
            order: 1,
        });
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get("/all", auth, async (req, res) => {
    try {
        const data = await Experience.find().sort({ order: 1 });
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post("/", auth, uploadCert.single("certificate"), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.body["techStack[]"]) {
            data.techStack = Array.isArray(req.body["techStack[]"])
                ? req.body["techStack[]"]
                : [req.body["techStack[]"]];
        }
        if (req.file) {
            const result = await uploadBuffer(
                req.file.buffer,
                "portfolio/experience",
            );
            data.certificate = { url: result.url, publicId: result.public_id };
        }
        const exp = await Experience.create(data);
        res.status(201).json({ success: true, data: exp });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.put("/:id", auth, uploadCert.single("certificate"), async (req, res) => {
    try {
        const existing = await Experience.findById(req.params.id);
        if (!existing)
            return res
                .status(404)
                .json({ success: false, message: "Not found" });
        const data = { ...req.body };
        if (req.body["techStack[]"]) {
            data.techStack = Array.isArray(req.body["techStack[]"])
                ? req.body["techStack[]"]
                : [req.body["techStack[]"]];
        }
        if (req.file) {
            if (existing.certificate?.publicId)
                await deleteAsset(existing.certificate.publicId);
            const result = await uploadBuffer(
                req.file.buffer,
                "portfolio/experience",
            );
            data.certificate = { url: result.url, publicId: result.public_id };
        }
        const exp = await Experience.findByIdAndUpdate(req.params.id, data, {
            new: true,
        });
        res.json({ success: true, data: exp });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const exp = await Experience.findById(req.params.id);
        if (exp?.certificate?.publicId)
            await deleteAsset(exp.certificate.publicId);
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
