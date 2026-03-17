import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Add token to requests if it exists
API.interceptors.request.use((req) => {
    const profile = localStorage.getItem("profile");
    if (profile) {
        const { token } = JSON.parse(profile);
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Projects
export const fetchProjects = () => API.get("/projects");
export const createProject = (newProject) => API.post("/projects", newProject);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Skills
export const fetchSkills = () => API.get("/skills");
export const addSkill = (skillData) => API.post("/skills", skillData);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

// Experience
export const fetchExperience = () => API.get("/experience");
export const addExperience = (expData) => API.post("/experience", expData);
export const deleteExperience = (id) => API.delete(`/experience/${id}`);

// Auth
export const login = (formData) => API.post("/auth/login", formData);

// Contact
export const sendMessage = (messageData) => API.post("/contact", messageData);

export default API;
