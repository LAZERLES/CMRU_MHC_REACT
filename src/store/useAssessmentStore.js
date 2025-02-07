import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useAssessmentStore = create((set, get) =>({
    assessments: [],
    loading: false,
    error:null,
    answers: {},

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

      // New actions for fetching a single assessment and user results
    fetchAssessmentById: async (assessmentId) => {
      set({ loading: true, error: null });
      try {
          const res = await axiosInstance.get(`/user/assessment/getassessment/${assessmentId}`);
          set({ currentAssessment: res.data, loading: false });
      } catch (error) {
          set({ error: error.response?.data?.error || "Failed to fetch assessment", loading: false });
      }
  },

  fetchUserResults: async (userId, assessmentId) => {
      set({ loading: true, error: null });
      try {
          const res = await axiosInstance.get(`/user/assessment/${userId}/${assessmentId}`);
          set({ userResults: res.data, loading: false });
      } catch (error) {
          set({ error: error.response?.data?.error || "Failed to fetch user results", loading: false });
      }
  },

   // Save or update user answers
   saveUserAnswers: async (assessmentId, answers) => {
    const { authUser } = useAuthStore.getState(); // Get the user from the auth store
    if (!authUser) {
      toast.error("You must be logged in to save answers");
      return;
    }
  
    const userId = authUser.id; // Get the logged-in user's ID
    
    set({ loading: true });
    try {
      const response = await axiosInstance.post(`/user/assessment/${userId}/saveAnswers`, {
        assessmentId,
        answers,
      });
  
      // Optionally update the answers state locally if needed
      set({
        loading: false,
        answers: { ...answers }, // Store the latest answers
      });
  
      toast.success("Answers saved successfully!");
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: "Error saving user answers",
      });
      toast.error(error.response?.data?.message || "Failed to save answers");
      throw error; // Re-throw error if you need to handle it in the component
    }
  },
  

  // Clear errors if needed
  clearError: () => set({ error: null }),

}))