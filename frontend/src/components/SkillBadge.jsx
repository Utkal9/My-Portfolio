import React from "react";
import { motion } from "framer-motion";

const SkillBadge = ({ skill }) => {
    // Determine color based on proficiency level
    const levelColor =
        skill.level === "Expert"
            ? "bg-red-500"
            : skill.level === "Intermediate"
              ? "bg-orange-500"
              : "bg-orange-300";

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(249,115,22,0.08)] transition-shadow"
        >
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                {/* Fallback to first letter if no icon is provided */}
                <span className="font-bold text-lg">
                    {skill.icon || skill.skillName.charAt(0)}
                </span>
            </div>

            <div className="flex-grow">
                <h4 className="text-sm font-bold text-gray-800">
                    {skill.skillName}
                </h4>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                    <div
                        className={`${levelColor} h-1.5 rounded-full`}
                        style={{
                            width:
                                skill.level === "Expert"
                                    ? "90%"
                                    : skill.level === "Intermediate"
                                      ? "65%"
                                      : "40%",
                        }}
                    ></div>
                </div>
            </div>
        </motion.div>
    );
};

export default SkillBadge;
