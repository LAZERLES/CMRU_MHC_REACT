import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, PlusCircleIcon } from "lucide-react";

const AdminCommunityPage = () => {
  const [communities, setCommunities] = useState([
    { id: 1, name: "Tech Enthusiasts", description: "A community for tech lovers", memberCount: 150 },
    { id: 2, name: "Art Gallery", description: "Share and discuss artwork", memberCount: 89 },
    // Add more mock data as needed
  ]);
  const [searchName, setSearchName] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  // Mock functions to simulate API calls
  const fetchCommunities = () => {
    // Implement actual API call
    console.log("Fetching communities...");
  };

  const searchCommunities = async (name) => {
    // Implement actual search
    console.log("Searching communities with name:", name);
  };

  const deleteCommunity = async (id) => {
    // Implement actual delete
    console.log("Deleting community with id:", id);
    setCommunities(communities.filter(community => community.id !== id));
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleEdit = (community) => {
    setSelectedCommunity(community);
    document.getElementById("edit-community-modal").showModal();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchName.trim()) {
      fetchCommunities();
      return;
    }
    await searchCommunities(searchName);
  };

  return (
    <div className="p-6 h-screen bg-base-100 text-base-content">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-2xl font-bold">Manage Communities</h3>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => document.getElementById("add-community-modal").showModal()}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Create Community
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by community name"
          className="input input-bordered w-full"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {/* Communities Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Members</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {communities.map((community) => (
              <tr key={community.id}>
                <td>{community.id}</td>
                <td>{community.name}</td>
                <td>{community.description}</td>
                <td>{community.memberCount}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-warning btn-sm flex items-center"
                    onClick={() => handleEdit(community)}
                  >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    className="btn btn-error btn-sm flex items-center"
                    onClick={() => deleteCommunity(community.id)}
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

      {/* Add Community Modal */}
      <dialog id="add-community-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create New Community</h3>
          <div className="py-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Community Name</span>
              </label>
              <input type="text" className="input input-bordered" />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea className="textarea textarea-bordered h-24"></textarea>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary">Create</button>
              <button className="btn btn-ghost ml-2">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Edit Community Modal */}
      <dialog id="edit-community-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Community</h3>
          <div className="py-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Community Name</span>
              </label>
              <input 
                type="text" 
                className="input input-bordered"
                value={selectedCommunity?.name || ''}
                onChange={() => {}}
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-24"
                value={selectedCommunity?.description || ''}
                onChange={() => {}}
              ></textarea>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary">Save Changes</button>
              <button className="btn btn-ghost ml-2">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AdminCommunityPage;