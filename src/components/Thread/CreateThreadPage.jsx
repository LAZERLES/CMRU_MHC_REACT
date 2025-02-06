import React, { useState } from 'react';
import { useCommunityStore } from '../../store/useCommunityStore';

const CreateThreadPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addThread } = useCommunityStore();

  const handleCreateThread = () => {
    if (title.trim() && content.trim()) {
      addThread(title, content);
      // Optional: Reset form or show success message
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card w-full max-w-xl mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl mb-4">Create a New Thread</h1>
          
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Thread Title</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter thread title"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Thread Content</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thread content"
              className="textarea textarea-bordered h-24"
              required
            />
          </div>

          <div className="card-actions justify-end mt-6">
            <button 
              onClick={handleCreateThread}
              className="btn btn-primary"
              disabled={!title.trim() || !content.trim()}
            >
              Create Thread
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateThreadPage;