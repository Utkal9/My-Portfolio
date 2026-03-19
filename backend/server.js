const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Route Files
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const contactRoutes = require("./routes/contactRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const authRoutes = require("./routes/authRoutes");

// Mount Routers (Modular Architecture)
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/auth", authRoutes);

// Basic route for testing
app.get("/", (req, res) => {
    res.send("Portfolio API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: err.message || "Server Error",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    );
});
