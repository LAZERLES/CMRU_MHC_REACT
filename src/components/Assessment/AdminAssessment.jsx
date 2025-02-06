import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, PlusCircleIcon } from "lucide-react";

import { useAssessmentStore } from "../../store/useAssessmentStore";
import AddAssessmentModal from "./AddAssessmentModal";
import EditAssessmentModal from "./EditAssessmentModal";


const AdminAssessment = () => {
  const {
    assessments,
    fetchAssessments,
    searchAssessments,
    deleteAssessment,
  } = useAssessmentStore();

  const [searchTitle, setSearchTitle] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  useEffect(() => {
    fetchAssessments();
  }, []);

  // Open the modal to edit an assessment
  const handleEdit = (assessment) => {
    setSelectedAssessment(assessment);
    document.getElementById("edit-modal").showModal();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTitle.trim()) {
      fetchAssessments();
      return;
    }
    await searchAssessments(searchTitle);
  };

  return (
    <div className="p-6 h-screen bg-base-100 text-base-content">
      <div className="flex justify-between items-center mb-4 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-2xl font-bold">Manage Assessments</h3>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => document.getElementById("add-modal").showModal()}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Create Assessment
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

      {/* Assessments Table */}
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
            {assessments.map((assessment) => (
              <tr key={assessment.id}>
                <td>{assessment.id}</td>
                <td>{assessment.title}</td>
                <td>{assessment.description}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-warning btn-sm flex items-center"
                    onClick={() => handleEdit(assessment)}
                  >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    className="btn btn-error btn-sm flex items-center"
                    onClick={() => deleteAssessment(assessment.id)}
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

      {/* Add & Edit Modals */}
      <AddAssessmentModal fetchAssessments={fetchAssessments} />
      <EditAssessmentModal assessment={selectedAssessment} fetchAssessments={fetchAssessments} />
    </div>
  );
};

export default AdminAssessment;
