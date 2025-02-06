import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAssessmentStore } from "../../store/useAssessmentStore";


const EditAssessmentModal = () => {
  const { selectedAssessment, fetchAssessments, setSelectedAssessment } = useAssessmentStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedAssessment) {
      setTitle(selectedAssessment.title);
      setDescription(selectedAssessment.description);
    }
  }, [selectedAssessment]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedAssessment) return;

    try {
      await axios.put(`http://localhost:5000/api/admin/assessment/${selectedAssessment.id}`, {
        title,
        description,
      });
      fetchAssessments();
      document.getElementById("edit-modal").close();
    } catch (error) {
      console.error("Error updating assessment:", error);
    }
  };

  return (
    <dialog id="edit-modal" className="modal text-base-content">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Assessment</h3>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="btn btn-primary w-full">Update Assessment</button>
        </form>
      </div>
    </dialog>
  );
};

export default EditAssessmentModal;
