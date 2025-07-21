import axios from "axios";

// Create the axios instance
const backendAxios = axios.create({
  baseURL: "https://localhost:7256",
  withCredentials: true,
});

// Add a request interceptor to attach the Authorization header with Bearer token from next-auth session
backendAxios.interceptors.request.use(
  async (config) => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const { getSession } = await import("next-auth/react");
      const session = await getSession();
      // Adjust this according to how your JWT is stored in the session object
      const token = (session as any)?.jwt || (session as any)?.accessToken;
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default backendAxios;