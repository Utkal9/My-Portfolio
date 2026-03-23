import express from "express";
import { Certificate } from "../models/index.js";
import { uploadCert, uploadBuffer, deleteAsset } from "../config/cloudinary.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Public — get visible certs
router.get("/", async (req, res) => {
    try {
        const data = await Certificate.find({ visible: true }).sort({
            order: 1,
        });
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Admin — get all
router.get("/all", auth, async (req, res) => {
    try {
        const data = await Certificate.find().sort({ order: 1 });
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Admin — create
router.post("/", auth, uploadCert.single("image"), async (req, res) => {
    try {
        const certData = { ...req.body };

        if (req.file) {
            const result = await uploadBuffer(
                req.file.buffer,
                "portfolio/certificates",
            );
            certData.image = { url: result.url, publicId: result.public_id };
        }

        const cert = await Certificate.create(certData);
        res.status(201).json({ success: true, data: cert });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Admin — update
router.put("/:id", auth, uploadCert.single("image"), async (req, res) => {
    try {
        const existing = await Certificate.findById(req.params.id);
        if (!existing) {
            return res
                .status(404)
                .json({ success: false, message: "Not found" });
        }

        const certData = { ...req.body };

        if (req.file) {
            // Delete old image
            if (existing.image?.publicId) {
                await deleteAsset(existing.image.publicId);
            }
            const result = await uploadBuffer(
                req.file.buffer,
                "portfolio/certificates",
            );
            certData.image = { url: result.url, publicId: result.public_id };
        }

        const cert = await Certificate.findByIdAndUpdate(
            req.params.id,
            certData,
            { new: true },
        );
        res.json({ success: true, data: cert });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Admin — delete
router.delete("/:id", auth, async (req, res) => {
    try {
        const cert = await Certificate.findById(req.params.id);
        if (!cert) {
            return res
                .status(404)
                .json({ success: false, message: "Not found" });
        }
        if (cert.image?.publicId) {
            await deleteAsset(cert.image.publicId);
        }
        await Certificate.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
