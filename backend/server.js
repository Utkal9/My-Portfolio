// dotenv MUST be the very first thing — before any other imports
import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
// Now all other imports — env vars are already loaded
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import socialRoutes from "./routes/socialRoutes.js";
import siteConfigRoutes from "./routes/siteConfigRoutes.js";
import { seedAdmin } from "./controllers/authController.js";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/site-config", siteConfigRoutes);

app.get("/api/health", (_, res) => res.json({ status: "ok" }));
// LeetCode GraphQL proxy
app.get("/api/leetcode/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
            reputation
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `;

        const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Referer: "https://leetcode.com",
                "User-Agent": "Mozilla/5.0",
            },
            body: JSON.stringify({ query, variables: { username } }),
        });

        const json = await response.json();

        if (!json.data?.matchedUser) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        const user = json.data.matchedUser;
        const allCounts = json.data.allQuestionsCount;
        const acStats = user.submitStats.acSubmissionNum;

        // Parse solved counts
        const easySolved =
            acStats.find((s) => s.difficulty === "Easy")?.count || 0;
        const mediumSolved =
            acStats.find((s) => s.difficulty === "Medium")?.count || 0;
        const hardSolved =
            acStats.find((s) => s.difficulty === "Hard")?.count || 0;
        const totalSolved =
            acStats.find((s) => s.difficulty === "All")?.count || 0;

        // Parse total available questions
        const totalEasy =
            allCounts.find((q) => q.difficulty === "Easy")?.count || 0;
        const totalMedium =
            allCounts.find((q) => q.difficulty === "Medium")?.count || 0;
        const totalHard =
            allCounts.find((q) => q.difficulty === "Hard")?.count || 0;
        const totalAll =
            allCounts.find((q) => q.difficulty === "All")?.count || 0;

        res.json({
            status: "success",
            username: user.username,
            ranking: user.profile.ranking,
            reputation: user.profile.reputation,
            easySolved,
            mediumSolved,
            hardSolved,
            totalSolved,
            totalEasy,
            totalMedium,
            totalHard,
            totalQuestions: totalAll,
        });
    } catch (err) {
        console.error("LeetCode API error:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});
mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("✅ MongoDB connected");
        await seedAdmin();
    })
    .catch((err) => console.error("MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`),
);
