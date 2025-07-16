import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase"; // 1
import { onAuthStateChanged, signOut } from "firebase/auth"; // 2
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";

const AppContext = createContext();

function Provider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [editCar, setEditCar] = useState(null);
  const [carFormData, setCarFormData] = useState({
    make: "",
    cost: 0,
    sold: false,
  });
  // 3 Firebase context
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);

      if (user) {
        setIsLogin(true);
      }
    });

    return unsubscribed;
  }, []);

  const logout = () => {
    navigation("/");
    return signOut(auth);
  };

  ///////// NAVIGATION /////////

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handler);

    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []);

  const navigation = (to) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  };

  ///////// CAR FUNCTIONS /////////

  const getCars = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cars"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCars = async () => {
    const cars = await getCars();
    setCars(cars);
  };

  const createCar = async (formData) => {
    try {
      await addDoc(collection(db, "cars"), formData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  ///////// USER FUNCTIONS /////////

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  const createNewUser = async (formdata) => {
    const response = await axios.post(`http://localhost:3001/users`, formdata);
    const update = [...users, response.data];
    setUsers(update);
  };

  const editUserById = async (id, formdata) => {
    console.log("edit by id", id, formdata);
    const response = await axios.put(
      `http://localhost:3001/users/${id}`,
      formdata
    );
    const update = users.map((item) => {
      if (item.id === id) {
        return { ...item, ...response.data };
      }
    });

    setUsers(update);
  };

  const deleteUserById = async (id) => {
    console.log("delete by id", id);
    await axios.delete(`http://localhost:3001/users/${id}`);
    const update = users.filter((item) => {
      return item.id !== id;
    });

    setUsers(update);
  };

  ///////// USER FUNCTIONS /////////

  const getContacts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchContacts = async () => {
    const contacts = await getContacts();
    setContacts(contacts);
  };

  const createNewContact = async (formdata) => {
    const response = await axios.post(
      `http://localhost:3001/contacts`,
      formdata
    );
    const update = [...contacts, response.data];
    setContacts(update);
  };

  const editContactById = async (id, formdata) => {
    const response = await axios.put(
      `http://localhost:3001/contacts/${id}`,
      formdata
    );
    const update = contacts.map((item) => {
      if (item.id === id) {
        return { ...item, ...response.data };
      }
    });

    setContacts(update);
  };

  const deleteContactById = async (id) => {
    await axios.delete(`http://localhost:3001/contacts/${id}`);
    const update = contacts.filter((item) => {
      return item.id !== id;
    });

    setContacts(update);
  };

  const valueToShare = {
    authUser,
    setAuthUser,
    loading,
    setLoading,
    isLogin,
    setIsLogin,
    logout,
    //////////////
    searchTerm,
    setSearchTerm,
    cars,
    setCars,
    users,
    setUsers,
    contacts,
    setContacts,
    //////////////
    currentPath,
    setCurrentPath,
    navigation,
    //////////////
    getCars,
    fetchCars,
    // createNewCar,
    createCar,
    editCar,
    setEditCar,
    carFormData,
    setCarFormData,
    //////////////
    getUsers,
    createNewUser,
    editUserById,
    deleteUserById,
    //////////////
    fetchContacts,
    createNewContact,
    editContactById,
    deleteContactById,
  };

  return (
    <AppContext.Provider value={valueToShare}>{children}</AppContext.Provider>
  );
}

export { Provider };
export default AppContext;
