import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    authAPI,
    configAPI,
    projectsAPI,
    skillsAPI,
    experienceAPI,
    contactAPI,
} from "../services/api.js";

// ── Auth Store ────────────────────────────────────────────────────────
export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: async (email, password) => {
                const { data } = await authAPI.login({ email, password });
                localStorage.setItem("portfolio_token", data.token);
                set({
                    user: data.user,
                    token: data.token,
                    isAuthenticated: true,
                });
                return data;
            },

            logout: () => {
                localStorage.removeItem("portfolio_token");
                set({ user: null, token: null, isAuthenticated: false });
            },

            loadMe: async () => {
                try {
                    const { data } = await authAPI.getMe();
                    set({ user: data.user, isAuthenticated: true });
                } catch {
                    get().logout();
                }
            },
        }),
        {
            name: "auth-store",
            partialize: (s) => ({
                token: s.token,
                isAuthenticated: s.isAuthenticated,
            }),
        },
    ),
);

// ── Theme Store ────────────────────────────────────────────────────────
export const useThemeStore = create(
    persist(
        (set, get) => ({
            isDark: true,
            toggle: () => {
                const next = !get().isDark;
                set({ isDark: next });
                document.documentElement.classList.toggle("dark", next);
            },
            init: () => {
                document.documentElement.classList.toggle("dark", get().isDark);
            },
        }),
        { name: "theme-store" },
    ),
);

// ── Site Config Store ──────────────────────────────────────────────────
export const useSiteConfigStore = create((set, get) => ({
    config: null,
    loading: false,

    fetch: async () => {
        set({ loading: true });
        try {
            const { data } = await configAPI.get();
            set({ config: data.data, loading: false });
        } catch {
            set({ loading: false });
        }
    },

    update: async (updates) => {
        const { data } = await configAPI.update(updates);
        set({ config: data.data });
        return data;
    },
}));

// ── Projects Store ─────────────────────────────────────────────────────
export const useProjectStore = create((set) => ({
    projects: [],
    loading: false,

    fetch: async (params) => {
        set({ loading: true });
        try {
            const { data } = await projectsAPI.getAll(params);
            set({ projects: data.data, loading: false });
        } catch {
            set({ loading: false });
        }
    },

    fetchAdmin: async () => {
        set({ loading: true });
        try {
            const { data } = await projectsAPI.getAllAdmin();
            set({ projects: data.data, loading: false });
        } catch {
            set({ loading: false });
        }
    },

    create: async (formData) => {
        const { data } = await projectsAPI.create(formData);
        set((s) => ({ projects: [data.data, ...s.projects] }));
        return data.data;
    },

    update: async (id, formData) => {
        const { data } = await projectsAPI.update(id, formData);
        set((s) => ({
            projects: s.projects.map((p) => (p._id === id ? data.data : p)),
        }));
        return data.data;
    },

    delete: async (id) => {
        await projectsAPI.delete(id);
        set((s) => ({ projects: s.projects.filter((p) => p._id !== id) }));
    },
}));

// ── Skills Store ────────────────────────────────────────────────────────
export const useSkillStore = create((set) => ({
    skills: [],
    loading: false,

    fetch: async () => {
        set({ loading: true });
        try {
            const { data } = await skillsAPI.getAll();
            set({ skills: data.data, loading: false });
        } catch {
            set({ loading: false });
        }
    },

    fetchAdmin: async () => {
        const { data } = await skillsAPI.getAllAdmin();
        set({ skills: data.data });
    },

    create: async (d) => {
        const { data } = await skillsAPI.create(d);
        set((s) => ({ skills: [...s.skills, data.data] }));
        return data.data;
    },

    update: async (id, d) => {
        const { data } = await skillsAPI.update(id, d);
        set((s) => ({
            skills: s.skills.map((sk) => (sk._id === id ? data.data : sk)),
        }));
    },

    delete: async (id) => {
        await skillsAPI.delete(id);
        set((s) => ({ skills: s.skills.filter((sk) => sk._id !== id) }));
    },
}));

// ── Experience Store ────────────────────────────────────────────────────
export const useExperienceStore = create((set) => ({
    experience: [],
    loading: false,

    fetch: async () => {
        set({ loading: true });
        try {
            const { data } = await experienceAPI.getAll();
            set({ experience: data.data, loading: false });
        } catch {
            set({ loading: false });
        }
    },

    fetchAdmin: async () => {
        const { data } = await experienceAPI.getAllAdmin();
        set({ experience: data.data });
    },

    create: async (d) => {
        const { data } = await experienceAPI.create(d);
        set((s) => ({ experience: [data.data, ...s.experience] }));
        return data.data;
    },

    update: async (id, d) => {
        const { data } = await experienceAPI.update(id, d);
        set((s) => ({
            experience: s.experience.map((e) => (e._id === id ? data.data : e)),
        }));
    },

    delete: async (id) => {
        await experienceAPI.delete(id);
        set((s) => ({ experience: s.experience.filter((e) => e._id !== id) }));
    },
}));

// ── Messages Store ──────────────────────────────────────────────────────
export const useMessageStore = create((set) => ({
    messages: [],
    unread: 0,
    loading: false,

    fetch: async () => {
        set({ loading: true });
        try {
            const { data } = await contactAPI.getMessages();
            set({ messages: data.data, unread: data.unread, loading: false });
        } catch {
            set({ loading: false });
        }
    },

    markRead: async (id) => {
        await contactAPI.markRead(id);
        set((s) => ({
            messages: s.messages.map((m) =>
                m._id === id ? { ...m, read: true } : m,
            ),
            unread: Math.max(0, s.unread - 1),
        }));
    },

    delete: async (id) => {
        await contactAPI.deleteMessage(id);
        set((s) => ({ messages: s.messages.filter((m) => m._id !== id) }));
    },
}));
