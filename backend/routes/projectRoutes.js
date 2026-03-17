const express = require("express");
const router = express.Router();
const {
    getProjects,
    createProject,
} = require("../controllers/projectController");
const { upload } = require("../config/cloudinary");

// GET all projects
router.get("/", getProjects);

// POST create project (with image upload)
// 'image' is the field name we will use in Postman/Frontend
router.post("/", upload.single("image"), createProject);

module.exports = router;
