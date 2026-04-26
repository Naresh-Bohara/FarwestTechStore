import React, { useEffect, useState } from "react";
import { FaPen, FaTrash, FaPlus, FaSpinner } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import userSvc from "./user.service";
import { toast } from "react-toastify";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  // ✅ MODAL STATE
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await userSvc.getUsers();

      const data =
        res?.detail ||
        res?.data?.detail ||
        res?.data ||
        [];

      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= OPEN MODAL =================
  const openDeleteModal = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  // ================= CANCEL =================
  const cancelDelete = () => {
    setSelectedUserId(null);
    setShowModal(false);
  };

  // ================= CONFIRM DELETE =================
  const confirmDelete = async () => {
    try {
      setDeleteLoadingId(selectedUserId);

      await userSvc.deleteUser(selectedUserId);

      setUsers((prev) =>
        prev.filter((u) => u._id !== selectedUserId)
      );

      toast.success("User deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    } finally {
      setDeleteLoadingId(null);
      setShowModal(false);
      setSelectedUserId(null);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-4 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          User Management
        </h1>

        <NavLink
          to="/admin/users/create"
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl"
        >
          <FaPlus /> Add User
        </NavLink>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center py-20">
          <FaSpinner className="animate-spin text-3xl text-teal-600" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No users found
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">

          <table className="w-full text-sm">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="p-3">User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Gender</th>
                <th>Phone</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">

                  <td className="p-3 font-medium">
                    {user.name}
                  </td>

                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.gender}</td>
                  <td className="p-3">{user.phone || user.phoneNumber}</td>

                  <td className="p-3 flex justify-end gap-2">

                    {/* EDIT */}
                    <NavLink
                      to={`/admin/users/edit/${user._id}`}
                      className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700"
                    >
                      <FaPen />
                    </NavLink>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => openDeleteModal(user._id)}
                      className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-xl">

            <h2 className="text-xl font-bold text-teal-700">
              Confirm Delete
            </h2>

            <p className="text-gray-500 mt-2">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">

              {/* CANCEL */}
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-xl border hover:bg-gray-100"
              >
                Cancel
              </button>

              {/* CONFIRM DELETE */}
              <button
                onClick={confirmDelete}
                disabled={deleteLoadingId !== null}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
              >
                {deleteLoadingId ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
};

export default UserListPage;