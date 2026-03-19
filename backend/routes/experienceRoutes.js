const express = require("express");
const router = express.Router();
const {
    getExperiences,
    addExperience,
    deleteExperience,
} = require("../controllers/experienceController");
const { protect } = require("../middleware/authMiddleware");

// Public route to view timeline
router.get("/", getExperiences);

// Protected routes for Admin
router.post("/", protect, addExperience);
router.delete("/:id", protect, deleteExperience);

module.exports = router;
