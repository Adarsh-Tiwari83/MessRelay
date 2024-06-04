import axios from "axios";

// Create an instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER, // Your base URL here
});

export default instance; // Export the instance to use it elsewhere