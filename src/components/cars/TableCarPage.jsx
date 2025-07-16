import { useAppContext } from "../../hooks/use-app-context";
import Button from "../ui/Button";
import { Check, Edit, X } from "lucide-react";
import { useState } from "react";
import { GoTrash } from "react-icons/go";
import CarSortableTable from "./CarSortableTable";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default function TableCarPage() {
  const { cars, setEditCar, setCarFormData, fetchCars } = useAppContext();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [item, setItem] = useState({});

  ///// EDIT CAR /////
  const handleEdit = async (car) => {
    setCarFormData({
      make: car.make,
      sold: car.sold,
      sold: car.sold,
    });

    setEditCar(car.id);
  };

  ///// DELETE CAR /////

  const deleteCar = async (carId) => {
    try {
      await deleteDoc(doc(db, "cars", carId));
    } catch (error) {
      console.log("Error deleting car: " + error);
    }
  };

  const handleDelete = async (carId) => {
    await deleteCar(carId);
    fetchCars();
  };

  const config = [
    {
      label: "Make",
      render: (item) => item.make,
      sortValue: (item) => item.make,
    },
    {
      label: "Cost",
      render: (item) => item.cost,
      sortValue: (item) => item.cost,
    },
    {
      label: "Sold",
      render: (item) => (
        <div className="flex items-center justify-center">
          {item.sold ? <Check /> : <X />}
        </div>
      ),
      sortValue: (item) => item.sold,
    },
    {
      label: "Edit",
      render: (item) => (
        <div className="flex items-center justify-center">
          <Button
            success
            rounded
            disabled={item.sold}
            className="px-5 py-1.5 cursor-pointer"
            onClick={() => {
              setItem(item);
              setShowEditModal(true);
              handleEdit(item);
            }}
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        </div>
      ),
    },
    {
      label: "Delete",
      render: (item) => (
        <div className="flex items-center justify-center">
          <Button
            danger
            rounded
            disabled={item.sold}
            className="px-5 py-1.5 cursor-pointer"
            onClick={() => {
              setItem(item);
              handleDelete(item.id);
            }}
          >
            <GoTrash className="w-4 h-4" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <CarSortableTable
      data={cars}
      config={config}
      item={item}
      showDeleteModal={showDeleteModal}
      setShowDeleteModal={setShowDeleteModal}
      showEditModal={showEditModal}
      setShowEditModal={setShowEditModal}
    />
  );
}
