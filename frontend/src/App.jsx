import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectGrid from "./components/ProjectGrid";
import SkillSection from "./components/SkillSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ContactSection from "./components/ContactSection";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import PageTransition from "./components/ui/PageTransition";
import usePortfolioStore from "./store/usePortfolioStore";
import useProjectStore from "./store/useProjectStore";

function AnimatedRoutes() {
    const location = useLocation();
    const { fetchPortfolioData } = usePortfolioStore();
    const { fetchProjects } = useProjectStore();

    useEffect(() => {
        fetchPortfolioData();
        fetchProjects();
    }, []);

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageTransition>
                            <Layout>
                                <Hero />
                                <About />
                                <SkillSection />
                                <ExperienceTimeline />
                                <ProjectGrid />
                                <ContactSection />
                            </Layout>
                        </PageTransition>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PageTransition>
                            <Login />
                        </PageTransition>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <PageTransition>
                            <AdminDashboard />
                        </PageTransition>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

export default App;
