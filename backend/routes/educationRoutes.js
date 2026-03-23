import express from "express";
import { Education } from "../models/index.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Public — get visible education
router.get("/", async (req, res) => {
    try {
        const data = await Education.find({ visible: true }).sort({ order: 1 });
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Admin — get all
router.get("/all", auth, async (req, res) => {
    try {
        const data = await Education.find().sort({ order: 1 });
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Admin — create
router.post("/", auth, async (req, res) => {
    try {
        const edu = await Education.create(req.body);
        res.status(201).json({ success: true, data: edu });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Admin — update
router.put("/:id", auth, async (req, res) => {
    try {
        const edu = await Education.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json({ success: true, data: edu });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Admin — delete
router.delete("/:id", auth, async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
