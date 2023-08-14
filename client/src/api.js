import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Update with your backend server URL
});
