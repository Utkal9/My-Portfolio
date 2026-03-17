import { create } from "zustand";
import * as api from "../services/api";

const usePortfolioStore = create((set) => ({
    skills: [],
    experiences: [],
    loading: false,

    // Fetch all data
    fetchPortfolioData: async () => {
        set({ loading: true });
        try {
            const [skillsRes, expRes] = await Promise.all([
                api.fetchSkills(),
                api.fetchExperience(),
            ]);
            set({
                skills: skillsRes.data,
                experiences: expRes.data,
                loading: false,
            });
        } catch (error) {
            console.error("Error fetching portfolio data", error);
            set({ loading: false });
        }
    },

    // Skills Actions
    addSkill: async (skillData) => {
        const { data } = await api.addSkill(skillData);
        set((state) => ({ skills: [...state.skills, data] }));
    },
    removeSkill: async (id) => {
        await api.deleteSkill(id);
        set((state) => ({ skills: state.skills.filter((s) => s._id !== id) }));
    },

    // Experience Actions
    addExperience: async (expData) => {
        const { data } = await api.addExperience(expData);
        set((state) => ({ experiences: [data, ...state.experiences] }));
    },
    removeExperience: async (id) => {
        await api.deleteExperience(id);
        set((state) => ({
            experiences: state.experiences.filter((e) => e._id !== id),
        }));
    },
}));

export default usePortfolioStore;
