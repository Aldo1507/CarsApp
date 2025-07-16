import { FaSearch } from "react-icons/fa";
import { useAppContext } from "../../hooks/use-app-context";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useState } from "react";
import { Edit } from "lucide-react";
import CarModalForm from "./CarModalForm";

export default function SearchCar() {
  const {
    setSearchTerm,
    searchTerm,
    createCar,
    fetchCars,
    carFormData,
    setCarFormData,
  } = useAppContext();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const onCloseCreate = () => {
    setShowCreateModal(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createCar(carFormData);
    setCarFormData({
      make: "",
      cost: 0,
      sold: false,
    });
    setShowCreateModal(false);
    fetchCars();
  };

  const actionCreateButton = (
    <div className="flex gap-5">
      <Button secondary rounded className="px-5" onClick={onCloseCreate}>
        Cancel
      </Button>

      <Button primary rounded className="px-5" onClick={handleCreate}>
        <Edit size={20} />
        Create
      </Button>
    </div>
  );

  return (
    <div className="flex items-center justify-between bg-green-100 dark:bg-green-800 p-3 rounded-md outline-2 outline-green-400 dark:outline-green-800 outline-offset-4">
      <Button
        success
        rounded
        onClick={() => {
          setShowCreateModal(!showCreateModal);
          setCarFormData({
            make: "",
            cost: 0,
            sold: false,
          });
        }}
      >
        Create Car
      </Button>

      {showCreateModal && (
        <Modal onClose={onCloseCreate} actionButon={actionCreateButton}>
          <CarModalForm
            data={{ carFormData, setCarFormData }}
            title={"Create new Car"}
          />
        </Modal>
      )}

      <div className="relative">
        <FaSearch className=" absolute top-[6px] left-[7px] w-6 h-6 text-green-300" />
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
