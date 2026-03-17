import React from "react";
import { Briefcase, Code, MessageSquare, Award } from "lucide-react";

const DashboardStats = ({
    projectCount,
    skillCount,
    messageCount,
    expCount,
}) => {
    const stats = [
        {
            label: "Projects",
            value: projectCount,
            icon: <Briefcase />,
            color: "text-blue-500",
        },
        {
            label: "Skills",
            value: skillCount,
            icon: <Code />,
            color: "text-green-500",
        },
        {
            label: "Messages",
            value: messageCount,
            icon: <MessageSquare />,
            color: "text-purple-500",
        },
        {
            label: "Experience",
            value: expCount,
            icon: <Award />,
            color: "text-orange-500",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="bg-gray-800 p-6 rounded-2xl border border-gray-700"
                >
                    <div className={`${stat.color} mb-3`}>{stat.icon}</div>
                    <p className="text-gray-400 text-xs font-mono uppercase">
                        {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-white mt-1">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
