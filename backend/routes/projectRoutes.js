const express = require("express");
const router = express.Router();
const {
    getProjects,
    createProject,
} = require("../controllers/projectController");
const { upload } = require("../config/cloudinary");

// GET all projects
router.get("/", getProjects);
const { protect } = require("../middleware/authMiddleware");

// Only protected users can POST (create) a project
// POST create project (with image upload)
// 'image' is the field name we will use in Postman/Frontend
router.post("/", protect, upload.single("image"), createProject);

module.exports = router;
