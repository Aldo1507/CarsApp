import { useState } from "react";
import Button from "../ui/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function UserProfile({ loggedUser, fetchUsers }) {
  ///// EDIT USER /////

  const [editUser, setEditUser] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    isAdmin: false,
  });

  const handleEdit = async (user) => {
    setFormData({
      email: user.email,
      displayName: user.displayName,
      isAdmin: user.isAdmin,
    });

    setEditUser(user.id);
  };

  const updateUser = async () => {
    try {
      const userRef = doc(db, "users", editUser);

      await updateDoc(userRef, formData);
    } catch (error) {
      console.log("Error updating user: " + error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editUser) {
      return;
    }
    await updateUser();
    setEditUser(null);
    fetchUsers();
  };

  return (
    <div className="flex flex-col gap-5 justify-center">
      <p>Name: {loggedUser.displayName}</p>
      <p>Email: {loggedUser.email}</p>
      <p>Is Admin: {loggedUser.isAdmin ? "Yes" : "No"}</p>
      <Button
        info
        className="rounded h-8"
        onClick={() => handleEdit(loggedUser)}
      >
        Edit Profile
      </Button>

      {editUser && (
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
              Edit User
            </h2>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="mt-4">
              <label
                htmlFor="displayName"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Dispaly Name
              </label>
              <div className="mt-2">
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      displayName: e.target.value,
                    })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      displayName: e.target.value,
                    })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="flex gap-5 items-center mt-4">
              <label
                htmlFor="isAdmin"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Is Admin
              </label>
              <div>
                <input
                  id="isAdmin"
                  name="isAdmin"
                  type="checkbox"
                  value={formData.isAdmin}
                  checked={formData.isAdmin}
                  onChange={(e) =>
                    setFormData({ ...formData, isAdmin: e.target.checked })
                  }
                />
              </div>
            </div>
            <div className="flex gap-10 mt-5 items-center">
              <button
                onClick={handleUpdate}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
              <button
                onClick={() => setEditUser(null)}
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
