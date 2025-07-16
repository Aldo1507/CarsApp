import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import ContactModalForm from "./ContactModalForm";
import { useAppContext } from "../../hooks/use-app-context";
import { GoTrash } from "react-icons/go";
import { Edit } from "lucide-react";

export default function ContactTable({
  data,
  config,
  item,
  showDeleteModal,
  setShowDeleteModal,
  showEditModal,
  setShowEditModal,
}) {
  const { searchTerm, deleteContactById, editContactById } = useAppContext();
  const [firstName, setFirstName] = useState(item.firstName);
  const [lastName, setLastName] = useState(item.lastName);
  const [email, setEmail] = useState(item.email);
  const [phone, setPhone] = useState(item.phone);
  const [location, setLocation] = useState(item.location);
  const [isCustomer, setIsCustomer] = useState(item.isCustomer);

  useEffect(() => {
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setEmail(item.email);
    setPhone(item.phone);
    setLocation(item.location);
    setIsCustomer(item.isCustomer);
  }, [showEditModal]);

  const onCloseDelete = () => {
    setShowDeleteModal(false);
  };

  const onDelete = (e) => {
    e.preventDefault();
    deleteContactById(item.id);
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

  const onCloseEdit = () => {
    setShowEditModal(false);
  };

  const onEdit = (e) => {
    e.preventDefault();
    editContactById(item.id, {
      firstName,
      lastName,
      email,
      phone,
      location,
      isCustomer,
    });
    setShowEditModal(false);
  };

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

  const filteredData = data.filter((item) => {
    return item.firstName.toLowerCase().includes(searchTerm.toLowerCase());
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
          className="border border-gray-400 p-3 text-center"
        >
          {column.render(rowData)}
        </td>
      );
    });
    return (
      <tr
        key={rowData.id}
        className={classNames(
          "text-indigo-700 dark:text-white font-semibold",
          i % 2 === 0
            ? "bg-gray-100 dark:bg-gray-600"
            : "bg-gray-300 dark:bg-gray-800"
        )}
      >
        {renderCell}

        {showEditModal && (
          <Modal onClose={onCloseEdit} actionButon={actionEditButton}>
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
              title={"Edit Contact"}
            />
          </Modal>
        )}

        {showDeleteModal && (
          <Modal onClose={onCloseDelete} actionButon={actionDeleteButton}>
            <h1 className="text-xl font-bold text-red-600 text-center">
              Delete
            </h1>
            <p>
              Are you sure you want to delete this contact? All data will be
              deleted permanently. This action can not be reversed.
            </p>
          </Modal>
        )}
      </tr>
    );
  });

  return (
    <table className="w-full table-auto border-separate bg-blue-200 dark:bg-blue-800 rounded-md">
      <thead>
        <tr>{renderHeader}</tr>
      </thead>
      <tbody>{renderRows}</tbody>
    </table>
  );
}
