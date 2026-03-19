import { create } from "zustand";
import axios from "axios";

const useProjectStore = create((set) => ({
    projects: [],
    loading: false,
    error: null,

    // 1. Fetch Projects (Public)
    fetchProjects: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get("/api/projects");
            // Handle different backend response structures safely
            const projectData = res.data.data ? res.data.data : res.data;
            set({ projects: projectData || [], loading: false });
        } catch (err) {
            set({ error: "Failed to load projects", loading: false });
        }
    },

    // 2. Add Project (Secure Admin Route)
    addProject: async (projectData) => {
        try {
            // Get the secure token you received when you logged in
            const token = localStorage.getItem("adminToken");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            // Send the data to the backend
            const res = await axios.post("/api/projects", projectData, config);

            // Update the frontend UI immediately
            const newProject = res.data.data ? res.data.data : res.data;
            set((state) => ({ projects: [newProject, ...state.projects] }));

            return { success: true };
        } catch (error) {
            console.error(
                "Failed to add project:",
                error.response?.data || error.message,
            );
            return { success: false, error: error.message };
        }
    },

    // 3. Delete Project (Secure Admin Route)
    deleteProject: async (id) => {
        try {
            const token = localStorage.getItem("adminToken");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            // Tell the backend to delete it
            await axios.delete(`/api/projects/${id}`, config);

            // Remove it from the frontend UI
            set((state) => ({
                projects: state.projects.filter((p) => p._id !== id),
            }));
        } catch (error) {
            console.error(
                "Failed to delete project:",
                error.response?.data || error.message,
            );
        }
    },
}));

export default useProjectStore;
