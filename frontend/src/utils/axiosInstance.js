import axios from "axios";

// Create an instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Your base URL here
});

export default instance; // Export the instance to use it elsewhere
