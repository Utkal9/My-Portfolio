import React from "react";
import { motion } from "framer-motion";

const SkillBadge = ({ skill }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gray-800/50 border border-gray-700 px-4 py-2 rounded-xl hover:bg-gray-700/50 transition-all cursor-default group"
        >
            <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:shadow-[0_0_8px_#3b82f6]"></div>
            <div>
                <p className="text-sm font-medium text-gray-200">
                    {skill.skillName}
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                    {skill.level}
                </p>
            </div>
        </motion.div>
    );
};

export default SkillBadge;
