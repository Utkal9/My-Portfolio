import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectGrid from "./components/ProjectGrid";
import SkillSection from "./components/SkillSection"; // New
import ExperienceTimeline from "./components/ExperienceTimeline"; // New
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
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
            <div className="bg-black min-h-screen">
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <main>
                                <Hero />
                                <About />
                                <SkillSection />
                                <ExperienceTimeline />
                                <ProjectGrid />
                            </main>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin/*" element={<AdminDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
