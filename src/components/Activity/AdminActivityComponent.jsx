import { useState, useEffect } from "react";
import {
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useActivityStore } from "../../store/useActivityStore";

export default function AdminActivityComponent() {
  const {
    activities,
    fetchActivities,
    createActivity,
    updateActivity,
    deleteActivity,
  } = useActivityStore();
  const [searchType, setSearchType] = useState("");
  const [newActivity, setNewActivity] = useState({
    ac_title: "",
    ac_description: "",
    imageUrl: "",
    ac_type: "",
  });
  const [editActivity, setEditActivity] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchActivities(searchType);
  };

  const handleCreate = async () => {
    await createActivity(newActivity);
    setNewActivity({
      ac_title: "",
      ac_description: "",
      imageUrl: "",
      ac_type: "",
    });
  };

  const handleUpdate = async () => {
    if (editActivity) {
      await updateActivity(editActivity.id, editActivity);
      setEditActivity(null); // Clear the editActivity state after successful update
    }
  };

  console.log("Activities in component:", activities);

  return (
    <div className="p-6 h-screen bg-base-100 text-base-content">
      <div className="flex justify-between items-center mb-4 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-2xl font-bold">Manage Activities</h3>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => document.getElementById("add-modal").showModal()}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Create Activity
        </button>
      </div>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by type"
          className="input input-bordered w-full"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {/* Activities Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(activities) ? activities : []).map((activity) => (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td>{activity.ac_title}</td>
                <td>{activity.ac_description}</td>
                <td>{activity.ac_type}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-warning btn-sm flex items-center"
                    onClick={() => setEditActivity(activity)}
                  >
                    <PencilIcon className="w-4 h-4 mr-1" /> Edit
                  </button>
                  <button
                    className="btn btn-error btn-sm flex items-center"
                    onClick={() => deleteActivity(activity.id)}
                  >
                    <TrashIcon className="w-4 h-4 mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Activity Modal */}
      <dialog id="add-modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create New Activity</h3>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full my-2"
            value={newActivity.ac_title}
            onChange={(e) =>
              setNewActivity({ ...newActivity, ac_title: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full my-2"
            value={newActivity.ac_description}
            onChange={(e) =>
              setNewActivity({ ...newActivity, ac_description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            className="input input-bordered w-full my-2"
            value={newActivity.imageUrl}
            onChange={(e) =>
              setNewActivity({ ...newActivity, imageUrl: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type"
            className="input input-bordered w-full my-2"
            value={newActivity.ac_type}
            onChange={(e) =>
              setNewActivity({ ...newActivity, ac_type: e.target.value })
            }
          />
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleCreate}>
              Create
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("add-modal").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* Edit Activity Modal */}
      <dialog id="edit-modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Activity</h3>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full my-2"
            value={editActivity?.ac_title || ""}
            onChange={(e) =>
              setEditActivity({ ...editActivity, ac_title: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full my-2"
            value={editActivity?.ac_description || ""}
            onChange={(e) =>
              setEditActivity({
                ...editActivity,
                ac_description: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            className="input input-bordered w-full my-2"
            value={editActivity?.imageUrl || ""}
            onChange={(e) =>
              setEditActivity({ ...editActivity, imageUrl: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type"
            className="input input-bordered w-full my-2"
            value={editActivity?.ac_type || ""}
            onChange={(e) =>
              setEditActivity({ ...editActivity, ac_type: e.target.value })
            }
          />
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("edit-modal").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
