const express = require("express");
const router = express.Router();
const {
    getSkills,
    addSkill,
    deleteSkill,
} = require("../controllers/skillController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getSkills).post(protect, addSkill);

router.route("/:id").delete(protect, deleteSkill);

module.exports = router;
