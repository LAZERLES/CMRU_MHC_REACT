import React, { useEffect, useState } from "react";
import { PlusCircleIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useLearningStore } from "../../store/useLearningStore";

const AdminLearningComponent = () => {
  const { learnings, fetchLearnings, createLearning, updateLearning, deleteLearning } = useLearningStore();
  const [searchTitle, setSearchTitle] = useState("");
  const [filteredLearnings, setFilteredLearnings] = useState([]);
  const [editLearning, setEditLearning] = useState(null);

  useEffect(() => {
    fetchLearnings();
  }, []);

  useEffect(() => {
    setFilteredLearnings(
      learnings.filter((learning) =>
        learning.title.toLowerCase().includes(searchTitle.toLowerCase())
      )
    );
  }, [searchTitle, learnings]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleEdit = (learning) => {
    setEditLearning(learning);
    document.getElementById("edit-modal").showModal();
  };

  return (
    <div className="p-6 h-screen bg-base-100 text-base-content">
      <div className="flex justify-between items-center mb-4 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-2xl font-bold">Manage Learnings</h3>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => document.getElementById("add-modal").showModal()}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Create Learning
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by title"
          className="input input-bordered w-full"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {/* Learnings Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLearnings.map((learning) => (
              <tr key={learning.id}>
                <td>{learning.id}</td>
                <td>{learning.title}</td>
                <td>{learning.description}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-warning btn-sm flex items-center"
                    onClick={() => handleEdit(learning)}
                  >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    className="btn btn-error btn-sm flex items-center"
                    onClick={() => deleteLearning(learning.id)}
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLearningComponent;
