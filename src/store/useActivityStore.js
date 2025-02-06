import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useActivityStore = create((set) => ({
    activities: [],
    loading: false,
    error: null,

    fetchActivities: async (ac_type) => {
        set({ loading: true, error: null });
        try {
            const res = await axiosInstance.get("/activity/getAll", {
                params: ac_type ? { ac_type } : {},
            });
    
            console.log("🚀 Activities fetched:", res.data); // Debugging log
            set({ activities: res.data.activity || [], loading: false });
    
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
    

    createActivity: async (newActivity) => {
        try {
            const res = await axiosInstance.post("/activity/create", newActivity);
            set((state) => ({ activities: [...state.activities, res.data.activity] }));
        } catch (error) {
            set({ error: error.message });
        }
    },

    updateActivity: async (id, updateData) => {
        try {
            await axiosInstance.put(`/activity/update/${id}`, updateData);
            set((state) => ({
                activities: state.activities.map((activity) =>
                    activity.id === id ? { ...activity, ...updateData } : activity
                ),
            }));
        } catch (error) {
            set({ error: error.message });
        }
    },

    deleteActivity: async (id) => {
        try {
            await axiosInstance.delete(`/activity/delete/${id}`);
            set((state) => ({
                activities: state.activities.filter((activity) => activity.id !== id),
            }));
        } catch (error) {
            set({ error: error.message });
        }
    },
}))