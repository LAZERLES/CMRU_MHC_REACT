import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useCommunityStore = create((set) => ({
    threads: [],
    comments:{},
    loadingThreads: false,
    loadingComments: false,

    fetchThreads: async () => {
        // for loading threads
        set({ loadingThreads: true });

        try {
            const res = await axiosInstance.get('/thread/get');
            set({ threads: res.data});
            // console.log("🚀 Threads fetched:", res.data);
            
        } catch (error) {
            console.error('Error fetching threads:', error);
        }finally{
            set({ loadingThreads: false });
        }
    },

    fetchComments: async (threadId) => {
        set({ loadingComments: true });
        try {
          const response = await axiosInstance.get(`/thread/${threadId}/comments`);
          set((state) => ({ comments: { ...state.comments, [threadId]: response.data } }));
        } catch (error) {
          console.error('Error fetching comments:', error);
        } finally {
          set({ loadingComments: false });
        }
      },

    addThread: async (title, content) =>{
        try {
            const res = await axiosInstance.post('/thread', { title: title, content: content });
            set((state) => ({ threads: [...state.threads, res.data] }));
        } catch (error) {
            console.error('Error adding thread:', error);
        }
    },

    addComment: async (threadId,content) => {
        try {
            const res = await axiosInstance.post(`/thread/${threadId}/comments`, { content: content });
            set((state) => {
                const comments = state.comments[threadId] || [];
                return { comments: { ...state.comments, [threads]: [...comments, res.data]}};
            })
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    },

    likeThread: async (threadId) => {
        try {
            const res = await axiosInstance.post(`/thread/${threadId}/likes`);
            set((state) => {
                const updatedThreads = state.threads.map((thread) =>
                  thread.id === threadId ? { ...thread, likes: response.data.likes } : thread
                );
                return { threads: updatedThreads };
              });
        } catch (error) {
            console.error('Error liking thread:', error);
        }
    },

    likeComment: async (threadId, commentId) => {
        try {
          const response = await axios.post(`/api/community/threads/${threadId}/comments/${commentId}/like`);
          set((state) => {
            const updatedComments = state.comments[threadId].map((comment) =>
              comment.id === commentId ? { ...comment, likes: response.data.likes } : comment
            );
            return { comments: { ...state.comments, [threadId]: updatedComments } };
          });
        } catch (error) {
          console.error('Error liking comment:', error);
        }
      },
}))