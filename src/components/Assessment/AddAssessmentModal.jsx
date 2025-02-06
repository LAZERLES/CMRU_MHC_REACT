import React, { useState } from "react";
import axios from "axios";
import { useAssessmentStore } from "../../store/useAssessmentStore";


const AddAssessmentModal = () => {
  const { fetchAssessments } = useAssessmentStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([{ text: "", type: "rating" }]);

  // Handle question changes
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Add a new question
  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "rating" }]);
  };

  // Remove a question
  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/assessment/create", {
        title,
        description,
        questions,
      },
      {
        withCredentials: true
      }
    );

      fetchAssessments();
      document.getElementById("add-modal").close();
    } catch (error) {
      console.error("Error adding assessment:", error);
    }
  };

  return (
    <dialog id="add-modal" className="modal text-base-content">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create New Assessment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <h4 className="font-semibold mt-4">Questions</h4>
          {questions.map((question, index) => (
            <div key={index} className="flex flex-col gap-2 border p-3 rounded">
              <input
                type="text"
                placeholder={`Question ${index + 1}`}
                className="input input-bordered w-full"
                value={question.text}
                onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
                required
              />
              <select
                className="select select-bordered w-full"
                value={question.type}
                onChange={(e) => handleQuestionChange(index, "type", e.target.value)}
              >
                <option value="rating">ตัวเลือกช่วงคะแนน 0 - 3</option>
                <option value="radio">ใช่หรือไม่</option>
              </select>
              <button
                type="button"
                className="btn btn-error btn-sm"
                onClick={() => removeQuestion(index)}
                disabled={questions.length === 1}
              >
                Remove Question
              </button>
            </div>
          ))}

          <button type="button" className="btn btn-success btn-sm" onClick={addQuestion}>
            Add Question
          </button>

          <button type="submit" className="btn btn-primary w-full">
            Save Assessment
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default AddAssessmentModal;
