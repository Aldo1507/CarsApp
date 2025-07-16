import classNames from "classnames";
import Button from "../ui/Button";
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { Edit, PhoneCall } from "lucide-react";
import { useState } from "react";
import Modal from "../ui/Modal";
import { useAppContext } from "../../hooks/use-app-context";
import CarModalForm from "./CarModalForm";

export default function CarDetails({ item }) {
  const { editCarById, deleteCarById } = useAppContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [make, setMake] = useState(item.make);
  const [cost, setCost] = useState(item.cost);
  const [sold, setSold] = useState(item.sold);

  const onCloseDelete = () => {
    setShowDeleteModal(false);
  };

  const onCloseEdit = () => {
    setShowEditModal(false);
  };

  const onDelete = (e) => {
    e.preventDefault();
    console.log(item.id);
    deleteCarById(item.id);
    setShowDeleteModal(false);
  };

  const onEdit = (e) => {
    e.preventDefault();
    editCarById(item.id, { make, cost, sold });
    setShowDeleteModal(false);
  };

  const actionDeleteButton = (
    <div className="flex gap-5">
      <Button secondary rounded className="px-5" onClick={onCloseDelete}>
        Cancel
      </Button>

      <Button danger rounded className="px-5" onClick={onDelete}>
        <GoTrash className="w-4 h-4" />
        Delete
      </Button>
    </div>
  );

  const actionEditButton = (
    <div className="flex gap-5">
      <Button secondary rounded className="px-5" onClick={onCloseEdit}>
        Cancel
      </Button>

      <Button primary rounded className="px-5" onClick={onEdit}>
        <Edit className="w-4 h-4" />
        Edit
      </Button>
    </div>
  );

  let content = (
    <>
      <div>{item.make}</div>
      <div>{item.cost}</div>
      <div
        className={classNames(
          "font-medium text-sm md:text-base lg:text-xl xl:text-2xl flex gap-1.5 items-center",
          item.sold ? "text-green-500" : "text-orange-400"
        )}
      >
        <PhoneCall size={20} />
        {item.sold ? "Sold" : "Available"}
      </div>
    </>
  );

  return (
    <div className="grid mb-2 items-center border border-gray-300 px-6 py-4 rounded-md grid-cols-4">
      {content}

      {showDeleteModal && (
        <Modal onClose={onCloseDelete} actionButon={actionDeleteButton}>
          <h1 className="text-xl font-bold text-red-600 text-center">Delete</h1>
          <p>
            Are you sure you want to delete this car? All data will be deleted
            permanently. This action can not be reversed.
          </p>
        </Modal>
      )}

      {showEditModal && (
        <Modal onClose={onCloseEdit} actionButon={actionEditButton}>
          <CarModalForm
            data={{ make, cost, sold, setMake, setCost, setSold }}
            title={"Edit Car"}
          />
        </Modal>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Button
          primary
          rounded
          disabled={item.sold}
          onClick={() => setShowEditModal(!showEditModal)}
        >
          <FiEdit className="w-4 h-4" />
          Edit
        </Button>
        <Button
          danger
          rounded
          disabled={item.sold}
          onClick={() => setShowDeleteModal(!showDeleteModal)}
        >
          <GoTrash className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
