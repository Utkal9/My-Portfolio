import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import useProjectStore from "../store/useProjectStore";

const ProjectGrid = () => {
    const { projects, loading, error, fetchProjects } = useProjectStore();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center py-10">{error}</div>;
    }

    return (
        <section id="projects" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Featured Projects
                    </h2>
                    <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects?.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectGrid;
