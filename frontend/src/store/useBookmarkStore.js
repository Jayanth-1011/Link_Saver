import { create } from "zustand";
import axiosInstance from "../axiosInstance/axiosInstance";

export const useBookmarkStore = create((set) => ({
  bookmarks: [],
  loading: false,
  error: null,

  // Fetch bookmarks
  fetchBookmarks: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/bookmarks");
      set({ bookmarks: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Create a new bookmark
  createBookmark: async (url, tag) => {
    try {
      const response = await axiosInstance.post("/bookmarks", { url, tag });
      set((state) => ({
        bookmarks: [response.data, ...state.bookmarks],
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Delete a bookmark
  deleteBookmark: async (id) => {
    try {
      await axiosInstance.delete(`/bookmarks/${id}`);
      set((state) => ({
        bookmarks: state.bookmarks.filter((bookmark) => bookmark._id !== id),
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },
}));
