import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  // Register a new user
  signup: (userData) => api.post('/auth/signup', userData),
  
  // Login user
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Get current user details
  getMe: () => api.get('/auth/me')
};

// Task API calls
export const taskAPI = {
  // Get all tasks for logged-in user
  getAllTasks: () => api.get('/tasks'),
  
  // Get a single task by ID
  getTaskById: (id) => api.get(`/tasks/${id}`),
  
  // Create a new task
  createTask: (taskData) => api.post('/tasks', taskData),
  
  // Update an existing task
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  
  // Delete a task
  deleteTask: (id) => api.delete(`/tasks/${id}`)
};

export default api;
