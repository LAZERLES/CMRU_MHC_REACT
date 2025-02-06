import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useMoodStore = create((set) => ({
  moods: [],
  mostUsedEmoji: null,

  fetchMoods: async (userId, month, year) => {
    try {
      const response = await axiosInstance.get(`/api/moods/${userId}`, {
        params: { month, year },
      });
      set({ moods: response.data });
    } catch (error) {
      console.error("Failed to fetch moods", error);
    }
  },

  addMood: async (moodData) => {
    try {
      const response = await axiosInstance.post("/api/moods", moodData);
      set((state) => ({ moods: [...state.moods, response.data] }));
    } catch (error) {
      console.error("Failed to add mood", error);
    }
  },

  fetchMostUsedEmoji: async (userId, month, year) => {
    try {
      const response = await axiosInstance.get(`/api/moods/${userId}/most-used-emoji`, {
        params: { month, year },
      });
      set({ mostUsedEmoji: response.data.mostUsedEmoji });
    } catch (error) {
      console.error("Failed to fetch most used emoji", error);
    }
  },
}));
