import React, { useEffect } from "react";

import { Users, BookOpen, ClipboardList } from "lucide-react";
import { useLearningStore } from "../../store/useLearningStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useAssessmentStore } from "../../store/useAssessmentStore";

const AdminDashboard = () => {
  const { onlineUsers} = useAuthStore();
  const { learnings, fetchLearnings } = useLearningStore();
  const { assessments, fetchAssessments } = useAssessmentStore();

  useEffect(() => {

    fetchLearnings();
    fetchAssessments();
  }, []);

  return (
    <div className="p-6 h-screen bg-base-100 text-base-content">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Online Users */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <Users className="w-10 h-10 text-blue-500" />
          <div>
            <p className="text-gray-500">Online Users</p>
            <h3 className="text-2xl font-bold">{onlineUsers.length}</h3>
          </div>
        </div>

        {/* Total Assessments */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <ClipboardList className="w-10 h-10 text-green-500" />
          <div>
            <p className="text-gray-500">Total Assessments</p>
            <h3 className="text-2xl font-bold">{assessments.length}</h3>
          </div>
        </div>

        {/* Total Learnings */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <BookOpen className="w-10 h-10 text-orange-500" />
          <div>
            <p className="text-gray-500">Total Learnings</p>
            <h3 className="text-2xl font-bold">{learnings.length}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
