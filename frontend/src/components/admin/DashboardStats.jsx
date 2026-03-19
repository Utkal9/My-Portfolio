import React from "react";
import { Code, Wrench, MessageSquare, Eye } from "lucide-react";

const StatCard = ({ title, value, icon, colorClass, bgColorClass }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-5">
        <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${bgColorClass} ${colorClass}`}
        >
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-3xl font-black text-gray-900">{value}</h3>
        </div>
    </div>
);

const DashboardStats = () => {
    // In a real app, you would fetch these numbers from an API endpoint
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Dashboard Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Total Projects"
                    value="12"
                    icon={<Code size={24} />}
                    colorClass="text-blue-600"
                    bgColorClass="bg-blue-50"
                />
                <StatCard
                    title="Skills Listed"
                    value="24"
                    icon={<Wrench size={24} />}
                    colorClass="text-orange-600"
                    bgColorClass="bg-orange-50"
                />
                <StatCard
                    title="Unread Messages"
                    value="3"
                    icon={<MessageSquare size={24} />}
                    colorClass="text-red-600"
                    bgColorClass="bg-red-50"
                />
                <StatCard
                    title="Profile Views"
                    value="1.2k"
                    icon={<Eye size={24} />}
                    colorClass="text-green-600"
                    bgColorClass="bg-green-50"
                />
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Welcome back, Utkal!
                </h3>
                <p className="text-gray-600">
                    Your portfolio is currently live and running smoothly. Use
                    the sidebar menu to add new projects, update your skills,
                    manage your work experience, or reply to messages from
                    potential recruiters.
                </p>
            </div>
        </div>
    );
};

export default DashboardStats;
