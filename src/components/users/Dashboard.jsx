import { useEffect, useState } from "react";
import { useAppContext } from "../../hooks/use-app-context";
import Button from "../ui/Button";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import UserProfile from "./UserProfile";

export default function Dashboard() {
  const { authUser, getUsers } = useAppContext();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loggedUser, setLoggedUser] = useState({});

  ///// GET USERS/////

  const fetchUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  // console.log(users);

  ///// GET AUTH USER /////

  // const getLoggedUser = () => {
  //   users.map((user) => {
  //     if (user.id === authUser.uid) {
  //       setLoggedUser(user);
  //     }
  //   });
  // };

  //   useEffect(() => {
  //   getLoggedUser();
  // }, [users]);

  const getLoggedUser = async () => {
    try {
      const user = await getDoc(doc(db, "users", authUser.uid));
      if (user.exists()) {
        setLoggedUser(user.data());
      } else {
        console.log("User not found");
        setError("User not found");
      }
    } catch (error) {
      // console.log("User not found " + error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (authUser) {
      getLoggedUser();
    }
  }, []);

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

  ///// DELETE USER /////

  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
    } catch (error) {
      console.log("Error deleting user: " + error);
    }
  };

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    fetchUsers();
  };

  return (
    <>
      <div className="max-w-xl mx-auto px-4 py-2 dark:text-white rounded-lg mb-6">
        <h1 className="text-xl font-semibold mb-4">
          {loggedUser.isAdmin ? "Admin Dashboar" : "User Dashboard"}
        </h1>
        <UserProfile loggedUser={loggedUser} fetchUsers={fetchUsers} />
      </div>
      {loggedUser.isAdmin && (
        <div className="max-w-xl mx-auto p-6 rounded-lg dark:text-white">
          <p className="text-xl font-semibold mb-2">Users Data</p>
          <ul className="space-y-2">
            {users &&
              users.map((user) => (
                <li
                  key={user.id}
                  className="flex flex-col gap-2 sm:flex-row justify-between p-3 border rounded-md"
                >
                  <div>
                    {user.displayName} ({user.email}) -
                    {user.isAdmin ? "Admin" : "User"}
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row ">
                    <Button
                      info
                      className="rounded h-8"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      danger
                      className="rounded h-8"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
          </ul>

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
      )}
    </>
  );
}
