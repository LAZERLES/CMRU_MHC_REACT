import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommunityStore } from '../../store/useCommunityStore';

const ThreadDetailPage = () => {
  const { threadId } = useParams();
  const { threads,comments, loadingComments, fetchComments, addComment, likeThread, likeComment } = useCommunityStore();
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments(threadId);
  }, [fetchComments, threadId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(threadId, newComment);
      setNewComment('');
    }
  };

  console.log("Thread Data:",threads);
  

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Thread Details</h1>
      <h3>
        {threads.content}
      </h3>
      <button
        onClick={() => likeThread(threadId)}
        className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors mb-6"
      >
        Like Thread
      </button>

      {loadingComments ? (
        <p>Loading comments...</p>
      ) : (
        <div className="space-y-4">
          {comments[threadId]?.map((comment) => (
            <div key={comment.id} className="p-4 bg-gray-100 rounded-md shadow-md">
              <p>{comment.content}</p>
              <p className="text-gray-500 mt-2">Likes: {comment.likes}</p>
              <button
                onClick={() => likeComment(threadId, comment.id)}
                className="mt-2 text-blue-600 hover:underline"
              >
                Like Comment
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md"
          placeholder="Add a comment..."
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default ThreadDetailPage;
