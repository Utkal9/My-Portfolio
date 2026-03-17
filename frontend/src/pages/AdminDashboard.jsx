import { useState } from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Briefcase,
    MessageSquare,
    LogOut,
    Plus,
} from "lucide-react";
import ProjectManager from "../components/admin/ProjectManager";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("projects");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-darkBg text-white">
            {/* Sidebar */}
            <nav className="w-64 glass-morph m-4 rounded-3xl p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-10 text-neoPrimary">
                        Admin Hub
                    </h2>
                    <ul className="space-y-4">
                        <li
                            onClick={() => setActiveTab("projects")}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeTab === "projects" ? "bg-neoPrimary shadow-neo" : "hover:bg-white/5"}`}
                        >
                            <Briefcase size={20} /> Projects
                        </li>
                        <li
                            onClick={() => setActiveTab("messages")}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeTab === "messages" ? "bg-neoPrimary shadow-neo" : "hover:bg-white/5"}`}
                        >
                            <MessageSquare size={20} /> Messages
                        </li>
                    </ul>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                >
                    <LogOut size={20} /> Logout
                </button>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold capitalize">
                        {activeTab} Manager
                    </h1>
                    <div className="text-sm text-slate-400">
                        Welcome back, Utkal
                    </div>
                </header>

                {activeTab === "projects" && <ProjectManager />}
                {activeTab === "messages" && (
                    <div className="glass-morph p-6 rounded-3xl">
                        Coming Soon: Message Inbox
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
