import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Code,
    Wrench,
    Briefcase,
    MessageSquare,
    LogOut,
} from "lucide-react";

// We will import these components in the next steps
import DashboardStats from "../components/admin/DashboardStats";
import ProjectManager from "../components/admin/ProjectManager";
import SkillManager from "../components/admin/SkillManager";
// import ExperienceManager from '../components/admin/ExperienceManager';
// import MessageViewer from '../components/admin/MessageViewer';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const navigate = useNavigate();

    // Basic protection - check if token exists
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/login");
    };

    const navItems = [
        {
            id: "overview",
            label: "Overview",
            icon: <LayoutDashboard size={20} />,
        },
        { id: "projects", label: "Projects", icon: <Code size={20} /> },
        { id: "skills", label: "Skills", icon: <Wrench size={20} /> },
        {
            id: "experience",
            label: "Experience",
            icon: <Briefcase size={20} />,
        },
        {
            id: "messages",
            label: "Messages",
            icon: <MessageSquare size={20} />,
        },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return <DashboardStats />;
            case "projects":
                return <ProjectManager />;
            case "skills":
                return <SkillManager />;
            // case 'experience': return <ExperienceManager />;
            // case 'messages': return <MessageViewer />;
            default:
                return <DashboardStats />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-100 shadow-[2px_0_20px_rgb(0,0,0,0.02)] flex flex-col md:min-h-screen">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-black tracking-tighter">
                        Admin<span className="text-orange-500">Panel</span>
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto flex md:flex-col flex-row overflow-x-auto md:overflow-x-visible">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                                activeTab === item.id
                                    ? "bg-orange-50 text-orange-600 shadow-sm"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <span
                                className={
                                    activeTab === item.id
                                        ? "text-orange-500"
                                        : "text-gray-400"
                                }
                            >
                                {item.icon}
                            </span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminDashboard;
