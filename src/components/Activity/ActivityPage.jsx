import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';
import BackToHomeButton from '../Button/BackToHomeButton';
import { useActivityStore } from "../../store/useActivityStore";

const ActivityPage = () => {
  const { type } = useParams(); // Get activity type from URL
  const { activities, loading, error, fetchActivities } = useActivityStore();

  useEffect(() => {
    fetchActivities(type);
  }, [type, fetchActivities]);

  // Helper function to get title based on activity type
  const getTypeTitle = () => {
    return type === 'pleasurable' ? 'กิจกรรมเพื่อความสุข' : 'กิจกรรมเพื่อการพัฒนาตนเอง';
  };

  if (loading) {
    return (
      <UserLayout title={getTypeTitle()}>
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout title={getTypeTitle()}>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="alert alert-error">
            <span>เกิดข้อผิดพลาด: {error}</span>
          </div>
        </div>
      </UserLayout>
    );
  }

  console.log('Activities:', activities);
  

  return (
    <UserLayout title={getTypeTitle()}>
      <div className="min-h-screen bg-base-300 p-8">
        <div className="mb-8">
          <BackToHomeButton />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-6 text-center">
            {getTypeTitle()}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div key={activity.id} className="card bg-base-100 shadow-xl">
                <figure className="px-5 pt-5">
                  <img
                    src={activity.imageUrl || "/placeholder-activity.jpg"}
                    alt={activity.ac_title}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-primary">{activity.title}</h2>
                  <p className="text-gray-600">{activity.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activity.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="badge badge-primary badge-outline"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        // Add your activity selection handler here
                        console.log('Selected activity:', activity);
                      }}
                    >
                      เลือกกิจกรรมนี้
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {activities.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">
                ไม่พบกิจกรรมในหมวดหมู่นี้
              </p>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default ActivityPage;