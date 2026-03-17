import { create } from "zustand";
import * as api from "../services/api";

const useGalleryStore = create((set) => ({
    images: [],
    loading: false,

    fetchGallery: async () => {
        set({ loading: true });
        try {
            const { data } = await api.fetchGallery();
            set({ images: data, loading: false });
        } catch (error) {
            console.error("Error fetching gallery", error);
            set({ loading: false });
        }
    },

    addImage: async (imageData) => {
        const { data } = await api.uploadToGallery(imageData);
        set((state) => ({ images: [data, ...state.images] }));
    },

    removeImage: async (id) => {
        await api.deleteGalleryImage(id);
        set((state) => ({
            images: state.images.filter((img) => img._id !== id),
        }));
    },
}));

export default useGalleryStore;
