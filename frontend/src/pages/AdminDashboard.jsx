import React, { useEffect } from "react";
import ProjectManager from "../components/admin/ProjectManager";
import SkillManager from "../components/admin/SkillManager";
import ExperienceManager from "../components/admin/ExperienceManager";
import useProjectStore from "../store/useProjectStore";
import usePortfolioStore from "../store/usePortfolioStore";

const AdminDashboard = () => {
    const { fetchProjects } = useProjectStore();
    const { fetchPortfolioData } = usePortfolioStore();

    useEffect(() => {
        fetchProjects();
        fetchPortfolioData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold text-white text-center">
                        Portfolio Command Center
                    </h1>
                    <p className="text-gray-400 text-center mt-2">
                        Manage your projects, skills, and experience
                    </p>
                </header>

                <div className="space-y-12">
                    <ProjectManager />
                    <SkillManager />
                    <ExperienceManager />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
