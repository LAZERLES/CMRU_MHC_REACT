import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useLearningStore = create((set) => ({
    learnings: [],
    loading: false,
    error: null,

    fetchLearnings: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get('/learning/getAll');
            set({ learnings: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    createLearning: async (newLearning) => {
        try {
            const res = await axiosInstance.post('/learning/create', newLearning);
            set((state) => ({ learnings: [...state.learnings, res.data.data]}));
        } catch (error) {
            set({ error: error.message });
        }
    },

    updateLearning: async (IdleDeadline, updateLearning) => {
        try {
            await axiosInstance.put(`/learning/${id}`, updateLearning)
            set((state) => ({
                learnings: state.learnings.map((learning) => learning.idleDeadline === IdleDeadline? {...learning,...updateLearning}: learning)
            }))
        } catch (error) {
            set({ error: error.message });
        }
    },

    deleteLearning: async (id) => {
        try {
            await axiosInstance.delete(`/learning/${id}`);
            set((state) => ({ learnings: state.learnings.filter((learning) => learning.id!== id)}));
        } catch (error) {
            set({ error: error.message });
        }
    }
}))