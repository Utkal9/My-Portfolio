import React from "react";
import useProjectStore from "../store/useProjectStore";
import ProjectCard from "./ProjectCard";
import AnimatedSection from "./ui/AnimatedSection";

const ProjectGrid = () => {
    const { projects, loading } = useProjectStore();

    if (loading)
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );

    return (
        <section id="projects" className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Featured Work
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A collection of projects ranging from full-stack web
                        applications to AI-integrated platforms.
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>

                {projects.length === 0 && (
                    <p className="text-center text-gray-500 py-10 italic">
                        No projects found. Add some from the admin dashboard!
                    </p>
                )}
            </div>
        </section>
    );
};

export default ProjectGrid;
