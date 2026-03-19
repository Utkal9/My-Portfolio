import { create } from "zustand";
import axios from "axios";

const useExperienceStore = create((set) => ({
    experiences: [],
    loading: false,
    error: null,

    fetchExperiences: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get("/api/experience");
            set({ experiences: response.data.data, loading: false });
        } catch (error) {
            set({
                error:
                    error.response?.data?.error ||
                    "Failed to fetch experience data",
                loading: false,
            });
        }
    },

    addExperience: async (expData, token) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(
                "/api/experience",
                expData,
                config,
            );
            // Add new experience and sort them again
            set((state) => {
                const newExpList = [response.data.data, ...state.experiences];
                return {
                    experiences: newExpList.sort(
                        (a, b) => new Date(b.startDate) - new Date(a.startDate),
                    ),
                };
            });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.error || "Failed to add experience",
            };
        }
    },

    deleteExperience: async (id, token) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`/api/experience/${id}`, config);
            set((state) => ({
                experiences: state.experiences.filter((exp) => exp._id !== id),
            }));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.error ||
                    "Failed to delete experience",
            };
        }
    },
}));

export default useExperienceStore;
