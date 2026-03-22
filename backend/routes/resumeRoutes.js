import express from "express";
import { Resume } from "../models/index.js";
import {
    uploadBuffer,
    deleteAsset,
    uploadResume,
} from "../config/cloudinary.js";
import auth from "../middleware/authMiddleware.js";
import https from "https";
import http from "http";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const resume = await Resume.findOne({ active: true });
        res.json({ success: true, data: resume });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});

// GET /api/resume/download — proxies the PDF with correct headers
router.get("/download", async (req, res) => {
    try {
        const resume = await Resume.findOne({ active: true });
        if (!resume)
            return res
                .status(404)
                .json({ success: false, message: "No resume uploaded yet" });

        const filename = resume.filename || "Utkal_Behera_Resume.pdf";

        // Set headers so browser downloads it as a named PDF
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${filename}"`,
        );

        // Proxy the file from Cloudinary to the client
        const url = new URL(resume.url);
        const protocol = url.protocol === "https:" ? https : http;

        protocol
            .get(resume.url, (fileStream) => {
                fileStream.pipe(res);
            })
            .on("error", (err) => {
                console.error("Download proxy error:", err);
                res.status(500).json({
                    success: false,
                    message: "Failed to download file",
                });
            });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});

router.post(
    "/upload",
    auth,
    uploadResume.single("resume"),
    async (req, res) => {
        try {
            if (!req.file)
                return res
                    .status(400)
                    .json({ success: false, message: "No file provided" });
            const old = await Resume.findOne({ active: true });
            if (old?.publicId) await deleteAsset(old.publicId, "raw");
            const result = await uploadBuffer(
                req.file.buffer,
                "portfolio/resume",
                "raw",
            );
            await Resume.updateMany({}, { active: false });
            const resume = await Resume.create({
                url: result.url,
                publicId: result.public_id,
                filename: req.file.originalname,
                active: true,
            });
            res.status(201).json({ success: true, data: resume });
        } catch (e) {
            res.status(500).json({ success: false, message: e.message });
        }
    },
);

export default router;
