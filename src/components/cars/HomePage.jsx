import benzImage from "../../assets/images/benz.jpg";
import bmwImage from "../../assets/images/bmw.jpg";
import audiImage from "../../assets/images/audi.jpg";
import toyotaImage from "../../assets/images/toyota.jpg";
import fiatImage from "../../assets/images/fiat.jpg";
import { useAppContext } from "../../hooks/use-app-context";
import classNames from "classnames";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import CarModalForm from "./CarModalForm";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const imagesMap = {
  Benz: benzImage,
  BMW: bmwImage,
  Audi: audiImage,
  Toyota: toyotaImage,
  Fiat: fiatImage,
};

export default function HomePage() {
  const {
    cars,
    isLogin,
    carFormData,
    setCarFormData,
    fetchCars,
    editCar,
    setEditCar,
  } = useAppContext();

  const [showEditModal, setShowEditModal] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    setCarFormData({
      make: item.make,
      cost: item.cost,
      sold: item.sold,
    });
  }, [showEditModal]);

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

  ///// EDIT CAR /////
  const handleEdit = async (car) => {
    setCarFormData({
      make: car.make,
      sold: car.sold,
      sold: car.sold,
    });

    setEditCar(car.id);
  };

  const updateCar = async () => {
    try {
      const carRef = doc(db, "cars", editCar);

      await updateDoc(carRef, carFormData);
    } catch (error) {
      console.log("Error updating car: " + error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editCar) {
      return;
    }
    await updateCar();
    setEditCar(null);
    setShowEditModal(false);
    fetchCars();
  };

  const onCloseEdit = () => {
    setShowEditModal(false);
  };

  const actionEditButton = (
    <div className="flex gap-5">
      <Button secondary rounded className="px-5" onClick={onCloseEdit}>
        Cancel
      </Button>

      <Button primary rounded className="px-5" onClick={handleUpdate}>
        <Edit className="w-4 h-4" />
        Edit
      </Button>
    </div>
  );

  return (
    <>
      <div>
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => {
            return (
              <li
                key={car.id}
                className="rounded-lg flex flex-col gap-4 shadow-lg p-5 dark:shadow-orange-500 dark:text-white"
              >
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <img
                    src={imagesMap[car.make]}
                    alt={car.make}
                    width={250}
                    className="rounded-md object-cover object-center"
                  />
                  <div className="flex md:flex-col gap-2 justify-center items-end p-3">
                    <p>{car.make}</p>
                    <p>{car.cost}€</p>
                    <p
                      className={classNames(
                        "font-semibold",
                        car.sold ? "text-red-500" : "text-green-500"
                      )}
                    >
                      {car.sold ? "Sold" : "Available"}
                    </p>
                  </div>
                </div>
                {isLogin && (
                  <div className="flex gap-2 justify-end">
                    <Button
                      onClick={() => {
                        setShowEditModal(true);
                        handleEdit(car);
                        setItem(car);
                      }}
                      info
                      disabled={car.sold}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => {
                        handleDelete(car.id);
                      }}
                      danger
                      disabled={car.sold}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </li>
            );
          })}

          {showEditModal && (
            <Modal onClose={onCloseEdit} actionButon={actionEditButton}>
              <CarModalForm
                data={{ carFormData, setCarFormData }}
                title={"Edit Car"}
              />
            </Modal>
          )}
        </ul>
      </div>
    </>
  );
}
