import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import BackToHomeButton from "../Button/BackToHomeButton";
import { useAssessmentStore } from "../../store/useAssessmentStore";

const UserAssessment = () => {
  const { assessments, fetchAssessments } = useAssessmentStore();

  useEffect(() => {
    fetchAssessments();
  }, []);

  return (
    <div className="w-full max-w-screen p-4 flex flex-col gap-6">
      <BackToHomeButton className="btn-lg mx-auto block mt-6" />
      <span className="text-[40px] font-semibold ml-2 p-2">Assessments</span>

      {/* Assessment List with Animations */}
      {assessments.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {assessments.map((assessment, index) => (
            <motion.div
              key={assessment.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-4 w-full rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              <div
                className={`flex flex-col sm:flex-row gap-4 p-5 bg-white items-center ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Image */}
                <div className="flex items-center justify-center rounded-xl shadow-xl hover:shadow-2xl bg-white w-full sm:w-[500px]">
                  <img
                    className="p-1 m-2 rounded-xl w-full sm:w-[450px] h-auto object-cover"
                    src={
                      assessment.imageUrl ||
                      "https://img.freepik.com/free-photo/3d-illustration-pen-putting-blue-ticks-paper_107791-15675.jpg?t=st=1738214609~exp=1738218209~hmac=4e8f11dd7751889e0c9c3d616592030c6c97fcdcec19a8f946d970db6c4a3de7&w=1060"
                    }
                    alt={`Assessment ${assessment.title}`}
                  />
                </div>

                {/* Text Content */}
                <div
                  className={`flex flex-col gap-[24px] p-2 ${
                    index % 2 === 0 ? "sm:ml-[40px]" : "sm:mr-[40px]"
                  }`}
                >
                  <h2 className="text-[28px] sm:text-[40px] font-semibold">
                    {assessment.title}
                  </h2>
                  <p className="text-[18px] sm:text-[24px] text-opacity-50">
                    {assessment.description}
                  </p>
                  <Link
                    to={`/assessment/${assessment.id}`}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default navigation
                      window.location.href = `/assessment/${assessment.id}`; // Force refresh
                    }}
                  >
                    <button className="btn-outline border w-auto h-[45px] p-2 border-green-500 hover:bg-green-500">
                      <span>เริ่มทำแบบประเมิน</span>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default UserAssessment;
