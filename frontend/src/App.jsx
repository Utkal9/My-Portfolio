import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectGrid from "./components/ProjectGrid";
import SkillSection from "./components/SkillSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ContactSection from "./components/ContactSection";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import usePortfolioStore from "./store/usePortfolioStore";
import useProjectStore from "./store/useProjectStore";

function App() {
    const { fetchPortfolioData } = usePortfolioStore();
    const { fetchProjects } = useProjectStore();

    useEffect(() => {
        fetchPortfolioData();
        fetchProjects();
    }, []);

    return (
        <Router>
            <Routes>
                {/* Public Routes with Layout */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Hero />
                            <About />
                            <SkillSection />
                            <ExperienceTimeline />
                            <ProjectGrid />
                            <ContactSection />
                        </Layout>
                    }
                />

                {/* Auth & Admin Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
