const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up the storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "portfolio_uploads", // The folder name in your Cloudinary account
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 1000, crop: "limit" }], // Optional: optimize large images
    },
});

// Initialize multer with the storage engine
const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
