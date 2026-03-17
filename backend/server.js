const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
// Basic Route for Testing
app.get("/", (req, res) => {
    res.send("Portfolio API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold,
    );
});
