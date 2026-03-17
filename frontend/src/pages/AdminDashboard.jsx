import React, { useEffect } from "react";
import ProjectManager from "../components/admin/ProjectManager";
import SkillManager from "../components/admin/SkillManager";
import ExperienceManager from "../components/admin/ExperienceManager";
import MessageViewer from "../components/admin/MessageViewer";
import ResumeManager from "../components/admin/ResumeManager";
import SocialManager from "../components/admin/SocialManager";
import DashboardStats from "../components/admin/DashboardStats";
import useProjectStore from "../store/useProjectStore";
import usePortfolioStore from "../store/usePortfolioStore";

const AdminDashboard = () => {
    const { projects, fetchProjects } = useProjectStore();
    const { skills, experiences, fetchPortfolioData } = usePortfolioStore();

    useEffect(() => {
        fetchProjects();
        fetchPortfolioData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 pt-28 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-white">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500">
                        Welcome back, Utkal. Manage your portfolio content here.
                    </p>
                </header>

                <DashboardStats
                    projectCount={projects.length}
                    skillCount={skills.length}
                    expCount={experiences.length}
                    messageCount="-" // Can be updated once we add message state to store
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <ProjectManager />
                        <SkillManager />
                        <SocialManager />
                    </div>
                    <div className="space-y-8">
                        <ExperienceManager />
                        <ResumeManager />
                        <MessageViewer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
