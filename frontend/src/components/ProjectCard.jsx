import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)] transition-all duration-300"
        >
            <div className="relative group overflow-hidden h-52">
                <img
                    src={
                        project.imageURL ||
                        "https://via.placeholder.com/400x200"
                    }
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-orange-500 rounded-full hover:bg-orange-600 text-white shadow-lg transition-colors"
                            aria-label="GitHub Repository"
                        >
                            <Github size={20} />
                        </a>
                    )}
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-red-500 rounded-full hover:bg-red-600 text-white shadow-lg transition-colors"
                            aria-label="Live Demo"
                        >
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow bg-white">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">
                    {project.category || "Web Development"}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                    {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                        <span
                            key={i}
                            className="text-[11px] font-medium bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full border border-orange-100"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
