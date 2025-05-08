import { create } from "zustand";
import axiosInstance from "../axiosInstance/axiosInstance"
import toast from "react-hot-toast";


export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogingIn: false,
  isLogingOut: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data });
     
    } catch (error) {
      console.log("Error in Check Auth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created Successfully");
   
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLogingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in Successfully");
      console.log(document.cookie)
   
    } catch (error) {
      toast.error("Invalid Credentials");
    } finally {
      set({ isLogingIn: false });
    }
  },

  logout: async () => {
    set({ isLogingOut: true });
    try {
      const response = await axiosInstance.post("/auth/logout");

      if (response.status === 200) {
        toast.success("Logged out successfully");
        set({ authUser: null });
        
      } else {
        toast.error(response.data?.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      set({ isLogingOut: false });
    }
  },

  
}));
