import React, { useEffect } from 'react';
import { useCommunityStore } from '../../store/useCommunityStore';
import { Link } from 'react-router-dom';

const ThreadsPage = () => {
  const { threads, loadingThreads, fetchThreads } = useCommunityStore();

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen bg-gradient-to-b from-base-200 to-base-100 rounded-box">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary drop-shadow-lg">Community Threads</h1>
      {loadingThreads ? (
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {threads.map((thread) => (
            <div 
              key={thread.id} 
              className="card bg-white shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="card-body p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-secondary mb-2">{thread.title}</h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">{thread.content}</p>
                <div className="flex justify-between items-center mt-6 gap-5">
                  <p className="badge badge-accent badge-outline px-3 py-2 text-sm">❤️ Likes: {thread.likeCount}</p>
                  <Link 
                    to={`/community/${thread.id}`} 
                    className="btn btn-sm md:btn-md btn-primary shadow-md hover:shadow-lg transition"
                  >
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreadsPage;
