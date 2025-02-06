import React from "react";
import UserLayout from "../../layout/UserLayout";
import ThreadsPage from "../../components/Thread/ThreadsPage";
import { MessageSquareDiff } from "lucide-react";
import BackToHomeButton from "../../components/Button/BackToHomeButton";

const UserThreadPage = () => {
  return (
    <UserLayout>
      {/* Add ThreadsPage component here */}
      <div className="flex justify-between  ">
        <BackToHomeButton className="ml-4" />
        <div className="flex justify-end mb-2 gap-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <button
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md"
            onClick={() => (window.location.href = "/create-thread")}
          >
            Create Thread
            <MessageSquareDiff />
          </button>
        </div>
      </div>
      <ThreadsPage />
    </UserLayout>
  );
};

export default UserThreadPage;
