import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAssessmentStore } from "../../store/useAssessmentStore";
import { useAuthStore } from "../../store/useAuthStore"; // Import auth store to get the user
import { Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import BackToHomeButton from "../Button/BackToHomeButton";

const AssessmentForm = () => {
  const { assessmentId } = useParams();
  const { fetchAssessmentById, currentAssessment, loading, error, saveUserAnswers } = useAssessmentStore();
  const { authUser } = useAuthStore(); // Get the logged-in user from the auth store
  const [answers, setAnswers] = useState({});

  // Fetch assessment on mount
  useEffect(() => {
    fetchAssessmentById(assessmentId);
  }, [assessmentId, fetchAssessmentById]);

  // Handle answer change
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare answers data in the required format
    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      questionId: parseInt(questionId),  // Ensure questionId is an integer
      answer: answers[questionId],       // answer should be a number or string, depending on your needs
    }));
  
    // Save the answers using the store action
    const response = await saveUserAnswers(assessmentId, formattedAnswers); // Use the formatted answers
  
    toast.success(response.message || "Assessment submitted successfully!");
  };
  

  // Display loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  // Ensure currentAssessment is defined before rendering
  if (!currentAssessment) {
    return (
      <div className="text-center text-red-500">
        <p>No assessment found.</p>
      </div>
    );
  }

  // Rating options
  const ratingOptions = ["Never", "Sometimes", "Often", "Always"];

  // Render the form if assessment is loaded
  return (
    <div className="w-full max-w-screen-xl p-4 flex flex-col gap-6 mx-auto bg-gradient-to-r from-blue-100 to-blue-300 rounded-xl shadow-lg">
      <BackToHomeButton className="btn-lg mx-auto block mt-6" />
      <span className="text-3xl font-semibold text-center text-gray-800 mb-4 p-2">{currentAssessment?.title}</span>

      {/* Form for the assessment */}
      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow-lg rounded-lg">
        {currentAssessment?.questions?.map((question) => (
          <div key={question.id} className="card bg-gray-50 shadow-md p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-medium text-gray-800">{question.text}</h3>
            <div className="flex flex-col gap-2 mt-2">
              {/* Render radio buttons for rating */}
              {question.type === "rating" &&
                ratingOptions.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={index + 1}
                      onChange={() => handleAnswerChange(question.id, index + 1)}
                      className="radio radio-accent"
                    />
                    <span className="ml-2 text-gray-600">{option}</span>
                  </label>
                ))}
            </div>
          </div>
        ))}

        {/* Submit button */}
        <button type="submit" className="btn btn-primary w-full mt-6 rounded-xl py-3 shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
          Submit Assessment
        </button>
      </form>
    </div>
  );
};

export default AssessmentForm;
