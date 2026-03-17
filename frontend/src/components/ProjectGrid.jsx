import { useEffect } from "react";
import { motion } from "framer-motion";
import useProjectStore from "../store/useProjectStore";
import { ExternalLink, Github } from "lucide-react";

const ProjectGrid = () => {
    const { projects, fetchProjects, loading } = useProjectStore();

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <section className="p-10 bg-darkBg">
            <h2 className="text-4xl font-bold mb-10 tracking-tight text-center">
                Featured <span className="text-neoPrimary">Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        // Making some cards larger for a true "Bento" look
                        className={`glass-morph bento-inner group ${
                            index === 0
                                ? "md:col-span-2 md:row-span-2"
                                : "md:col-span-1"
                        }`}
                    >
                        <div className="relative overflow-hidden rounded-2xl h-48 mb-4">
                            <img
                                src={
                                    project.image?.url ||
                                    "https://via.placeholder.com/400"
                                }
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <a href={project.githubLink}>
                                    <Github className="text-white hover:text-neoPrimary" />
                                </a>
                                <a href={project.liveLink}>
                                    <ExternalLink className="text-white hover:text-neoPrimary" />
                                </a>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <p className="text-slate-400 text-sm line-clamp-2">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-[10px] bg-neoPrimary/20 text-neoPrimary px-2 py-1 rounded-md border border-neoPrimary/30"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ProjectGrid;
