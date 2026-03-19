import { create } from "zustand";
import axios from "axios";

const useSkillStore = create((set) => ({
    skills: [],
    loading: false,
    error: null,

    fetchSkills: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get("/api/skills");
            set({ skills: response.data, loading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message || "Failed to fetch skills",
                loading: false,
            });
        }
    },

    addSkill: async (skillData, token) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.post("/api/skills", skillData, config);
            set((state) => ({ skills: [...state.skills, response.data] }));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Failed to add skill",
            };
        }
    },

    deleteSkill: async (id, token) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            await axios.delete(`/api/skills/${id}`, config);
            set((state) => ({
                skills: state.skills.filter((skill) => skill._id !== id),
            }));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.message || "Failed to delete skill",
            };
        }
    },
}));

export default useSkillStore;
