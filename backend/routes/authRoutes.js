const express = require("express");
const router = express.Router();
const { authUser, registerUser } = require("../controllers/authController");

// Route to register (create your admin account)
router.post("/register", registerUser);

// Route to login
router.post("/login", authUser);

module.exports = router;
