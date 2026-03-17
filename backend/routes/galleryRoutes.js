const express = require("express");
const router = express.Router();
const {
    getGallery,
    uploadImage,
    deleteImage,
} = require("../controllers/galleryController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getGallery).post(protect, uploadImage);

router.route("/:id").delete(protect, deleteImage);

module.exports = router;
