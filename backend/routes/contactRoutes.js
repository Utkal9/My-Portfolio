const express = require("express");
const router = express.Router();
const {
    sendMessage,
    getMessages,
    deleteMessage,
} = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware"); // Assuming you have this middleware

// Public route for visitors to send messages
router.post("/", sendMessage);

// Protected routes for Admin dashboard
router.get("/", protect, getMessages);
router.delete("/:id", protect, deleteMessage);

module.exports = router;
