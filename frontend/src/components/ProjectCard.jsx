import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="glass-card overflow-hidden flex flex-col h-full border border-gray-800 hover:border-blue-500/50 transition-colors"
        >
            <div className="relative group overflow-hidden h-48">
                <img
                    src={
                        project.imageURL ||
                        "https://via.placeholder.com/400x200"
                    }
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
                        >
                            <Github size={20} />
                        </a>
                    )}
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
                        >
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-2">
                    {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                        <span
                            key={i}
                            className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-1 rounded"
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
