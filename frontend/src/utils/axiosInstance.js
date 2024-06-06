import axios from "axios";

// Create an instance
const instance = axios.create({
  baseURL: "http://localhost:3000", // Your base URL here
});

export default instance; // Export the instance to use it elsewhere