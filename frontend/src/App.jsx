import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import SkillSection from "./components/SkillSection";
import ProjectGrid from "./components/ProjectGrid";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ContactSection from "./components/ContactSection";

// 1. We uncomment these Admin imports!
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";

const PortfolioHomePage = () => (
    <Layout>
        <Hero />
        <SkillSection />
        <ProjectGrid />
        <ExperienceTimeline />
        <ContactSection />
    </Layout>
);

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Portfolio Route */}
                <Route path="/" element={<PortfolioHomePage />} />

                {/* 2. We uncomment the Admin Routes! */}
                <Route path="/login" element={<Login />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
