import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAssessmentStore = create((set, get) =>({
    assessments: [],
    loading: false,
    error:null,

    fetchAssessments: async () => {
        set({ loading: true, error:null });

        try {
            const res = await axiosInstance.get('/assessment/getAll');
            set({ assessments: res.data,  loading: false });
        } catch (error) {
            set({ error: error.response?.data?.error || "Failed to load assessments", loading: false });
        }
    },

    createAssessment: async (assessmentData) => {
        try {
            const res = await axiosInstance.post("/assessment/create", assessmentData);
            set((state) => ({
                assessments: [...state.assessments, response.data.assessment]
            }))
            toast.success("Assessment created successfully!");
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to create assessment");
        }
    },

    updateAssessment: async(getAssessmentById, updateData) => {
        try {
            const res = await axiosInstance.put(`/assessment/${assessmentId}`, updateData);
            set((state) => ({
                assessments: state.assessments.map((a) =>
                  a.id === assessmentId ? { ...a, ...updatedData } : a
                ),
              }));
              toast.success("Assessment updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to update assessment");
        }
    },

    deleteAssessment: async (assessmentId) => {
        try {
          await axios.delete(`/assessment/${assessmentId}`);
          set((state) => ({
            assessments: state.assessments.filter((a) => a.id !== assessmentId),
          }));
          toast.success("Assessment deleted successfully!");
        } catch (error) {
          toast.error(error.response?.data?.error || "Failed to delete assessment");
        }
      },

      searchAssessments: async (query) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(`/api/assessments/search?title=${query}`);
          set({ assessments: response.data, loading: false });
        } catch (error) {
          set({ error: error.response?.data?.error || "Failed to search assessments", loading: false });
        }
      },
}))