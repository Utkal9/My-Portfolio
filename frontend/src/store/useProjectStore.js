import { create } from "zustand";
import API from "../services/api";

const useProjectStore = create((set) => ({
    projects: [],
    loading: false,

    fetchProjects: async () => {
        set({ loading: true });
        try {
            const { data } = await API.get("/projects");
            set({ projects: data.data, loading: false });
        } catch (error) {
            console.error("Error fetching projects:", error);
            set({ loading: false });
        }
    },
}));

export default useProjectStore;
