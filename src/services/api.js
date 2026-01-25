import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/portfolio';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const portfolioAPI = {
  // Get all data at once
  getAllData: async () => {
    const response = await api.get('/all');
    return response.data;
  },

  // Individual endpoints
  getAboutMe: async () => {
    const response = await api.get('/about');
    return response.data;
  },

  getSkills: async () => {
    const response = await api.get('/skills');
    return response.data;
  },

  getProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  getExperience: async () => {
    const response = await api.get('/experience');
    return response.data;
  },

  getContact: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  // Update endpoints
  updateAboutMe: async (data) => {
    const response = await api.put('/about', data);
    return response.data;
  },

  updateSkills: async (data) => {
    const response = await api.put('/skills', data);
    return response.data;
  },

  updateContact: async (data) => {
    const response = await api.put('/contact', data);
    return response.data;
  },

  // Project endpoints
  addProject: async (data) => {
    const response = await api.post('/projects', data);
    return response.data;
  },

  updateProject: async (id, data) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  // Experience endpoints
  addExperience: async (data) => {
    const response = await api.post('/experience', data);
    return response.data;
  },

  updateExperience: async (id, data) => {
    const response = await api.put(`/experience/${id}`, data);
    return response.data;
  },

  deleteExperience: async (id) => {
    const response = await api.delete(`/experience/${id}`);
    return response.data;
  },
};

export default api;