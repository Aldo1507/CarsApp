import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useAppContext } from "../../hooks/use-app-context";
import { Edit } from "lucide-react";
import CarModalForm from "./CarModalForm";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CarTable({
  data,
  config,
  item,
  showEditModal,
  setShowEditModal,
}) {
  const {
    searchTerm,
    fetchCars,
    editCar,
    setEditCar,
    setCarFormData,
    carFormData,
  } = useAppContext();

  useEffect(() => {
    setCarFormData({
      make: item.make,
      cost: item.cost,
      sold: item.sold,
    });
  }, [showEditModal]);

  ///// EDIT CAR /////

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

  const filteredData = data.filter((item) => {
    return item.make.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderHeader = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }

    return (
      <th key={column.label} className="border border-gray-400 p-3">
        {column.label}
      </th>
    );
  });

  const renderRows = filteredData.map((rowData, i) => {
    const renderCell = config.map((column) => {
      return (
        <td
          key={column.label}
          className="text-green-800 dark:text-white border border-gray-400 p-3 text-center"
        >
          {column.render(rowData)}
        </td>
      );
    });
    return (
      <tr
        key={rowData.id}
        className={classNames(
          "text-indigo-700 font-semibold",
          i % 2 === 0
            ? "bg-gray-100 dark:bg-gray-600"
            : "bg-gray-300 dark:bg-gray-800"
        )}
      >
        {renderCell}

        {showEditModal && (
          <Modal onClose={onCloseEdit} actionButon={actionEditButton}>
            <CarModalForm
              data={{
                carFormData,
                setCarFormData,
              }}
              title={"Edit Car"}
            />
          </Modal>
        )}
      </tr>
    );
  });

  return (
    <table className="w-full table-auto border-separate bg-green-200 dark:bg-green-800 rounded-md">
      <thead>
        <tr>{renderHeader}</tr>
      </thead>
      <tbody>{renderRows}</tbody>
    </table>
  );
}
