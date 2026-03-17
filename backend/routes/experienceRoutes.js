const express = require("express");
const router = express.Router();
const {
    getExperience,
    addExperience,
    deleteExperience,
} = require("../controllers/experienceController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getExperience).post(protect, addExperience);

router.route("/:id").delete(protect, deleteExperience);

module.exports = router;
