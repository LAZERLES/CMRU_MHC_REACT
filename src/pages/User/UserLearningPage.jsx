import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLayout from "../../layout/UserLayout";
import BackToHomeButton from "../../components/Button/BackToHomeButton";

const UserLearningPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", description: "", content: "" });
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch learning data from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/learning/getall", { withCredentials: true })
      .then((res) => {
        setDiseases(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching learning data.");
        setLoading(false);
      });
  }, []);

  // Open modal
  const openModal = (disease) => {
    setModalContent({
      title: disease.title,
      content: disease.content,
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <UserLayout>
      <div className="bg-base-200 min-h-screen"> 
        {/* Hero Section */}
        <header className="bg-primary text-white text-center py-16"> 
          <BackToHomeButton className="btn-lg btn-info" />
          <h2 className="text-3xl font-bold">เพิ่มพูนความรู้เกี่ยวกับสุขภาพจิต</h2>
          <p className="mt-2">เรียนรู้เกี่ยวกับภาวะสุขภาพจิตและวิธีดูแลตัวเองเพื่อชีวิตที่สมดุล</p>
        </header>

        {/* Main Content */}
        <div className="container mx-auto mt-8">
          {loading ? (
            <p className="text-center text-gray-600">กำลังโหลดข้อมูล...</p>
          ) : error ? (
            <p className="text-center text-error">{error}</p> 
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
              {diseases.map((disease) => (
                <div
                  key={disease.id}
                  className="card bg-base-100 shadow-xl"
                  onClick={() => openModal(disease)}
                >
                  <figure>
                    <img
                      src={disease.image}
                      alt={disease.title}
                      className="rounded-lg object-cover h-48"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-primary">{disease.title}</h3>
                    <p>{disease.description}</p>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">{modalContent.title}</h3>
                <p className="py-4">{modalContent.content}</p>
                <div className="modal-action">
                  <button className="btn" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserLearningPage;