import axios from 'axios';

const API_BASE_URL =  '/api'; // Use proxy in dev, override in prod

// Create axios instance with configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Slightly increased for potential DB delays
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.response?.data);
    // Handle different error types with user-friendly messages
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    }
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    const { status, data } = error.response;
    switch (status) {
      case 400:
        throw new Error(data.error || 'Invalid request. Please check your input.');
      case 404:
        throw new Error('Todo not found.');
      case 500:
        throw new Error('Server error. Please try again later.');
      default:
        throw new Error(data.error || 'An unexpected error occurred.');
    }
  }
);

export const todoService = {
  // Get all todos
  getTodos: async () => {
    try {
      const response = await api.get('/todos');
      return response.data;
    } catch (error) {
      console.error('Get todos failed:', error);
      throw error;
    }
  },

  // Create a new todo
  createTodo: async (todoData) => { // <-- Accept the full object: todoData
    try {
      const response = await api.post('/todos', todoData); // <-- Send as-is to backend
      return response.data;
    } catch (error) {
      console.error('Create todo failed:', error);
      throw error;
    }
  },

  // Update todo
  updateTodo: async (id, updates) => {
    try {
      const response = await api.put(`/todos/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Update todo failed:', error);
      throw error;
    }
  },

  // Delete todo
  deleteTodo: async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      return true;
    } catch (error) {
      console.error('Delete todo failed:', error);
      throw error;
    }
  }
};

export default api;
