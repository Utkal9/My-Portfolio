const express = require("express");
const router = express.Router();
const {
    getImages,
    uploadImage,
    deleteImage,
} = require("../controllers/galleryController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary"); // Your multer setup

// Public route to fetch images
router.get("/", getImages);

// Protected routes to upload/delete images
// 'image' is the form-data field name we will expect
router.post("/", protect, upload.single("image"), uploadImage);
router.delete("/:id", protect, deleteImage);

module.exports = router;
