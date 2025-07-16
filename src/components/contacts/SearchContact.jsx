import { FaSearch } from "react-icons/fa";
import { useAppContext } from "../../hooks/use-app-context";
import Button from "../ui/Button";
import { useState } from "react";
import { Edit } from "lucide-react";
import Modal from "../ui/Modal";
import ContactModalForm from "./ContactModalForm";

export default function SearchContact() {
  const { createNewContact, setSearchTerm, searchTerm } = useAppContext();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [location, setLocation] = useState("");
  const [isCustomer, setIsCustomer] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const onCloseCreate = () => {
    setShowCreateModal(false);
  };

  const onCreate = (e) => {
    e.preventDefault();
    createNewContact({
      firstName,
      lastName,
      email,
      phone,
      location,
      isCustomer,
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone(0);
    setLocation("");
    setIsCustomer(false);
    setShowCreateModal(false);
  };

  const actionCreateButton = (
    <div className="flex gap-5">
      <Button secondary rounded className="px-5" onClick={onCloseCreate}>
        Cancel
      </Button>

      <Button primary rounded className="px-5" onClick={onCreate}>
        <Edit size={20} />
        Create
      </Button>
    </div>
  );

  return (
    <div className="flex justify-between bg-blue-100 dark:bg-blue-800 p-3 rounded-md outline-2 outline-blue-400 dark:outline-blue-800 outline-offset-4">
      <Button info rounded onClick={() => setShowCreateModal(!showCreateModal)}>
        Create Contact
      </Button>

      {showCreateModal && (
        <Modal onClose={onCloseCreate} actionButon={actionCreateButton}>
          <ContactModalForm
            data={{
              firstName,
              lastName,
              email,
              phone,
              location,
              isCustomer,
              setFirstName,
              setLastName,
              setEmail,
              setPhone,
              setLocation,
              setIsCustomer,
            }}
            title={"Create new Contact"}
          />
        </Modal>
      )}

      <div className="relative">
        <FaSearch className=" absolute top-[6px] left-[7px] w-6 h-6 text-blue-300" />
        <input
          placeholder="Search for what you want..."
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          autoComplete="brand"
          className="block w-full rounded-md bg-white px-3 pl-10 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
}
