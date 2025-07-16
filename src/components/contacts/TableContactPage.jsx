import { useAppContext } from "../../hooks/use-app-context";
import Button from "../ui/Button";
import { Check, Edit, X } from "lucide-react";
import { useState } from "react";
import { GoTrash } from "react-icons/go";
import ContactSortableTable from "./ContactSortableTable";

export default function TableContactPage() {
  const { contacts } = useAppContext();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [item, setItem] = useState({});

  const config = [
    {
      label: "First Name",
      render: (item) => item.firstName,
      sortValue: (item) => item.firstName,
    },
    {
      label: "Last Name",
      render: (item) => item.lastName,
      sortValue: (item) => item.lastName,
    },
    {
      label: "Email",
      render: (item) => item.email,
      sortValue: (item) => item.email,
    },
    {
      label: "Phone",
      render: (item) => item.phone,
    },
    {
      label: "Location",
      render: (item) => item.location,
      sortValue: (item) => item.location,
    },
    {
      label: "Is Customer",
      render: (item) => (
        <div className="flex items-center justify-center">
          {item.isCustomer ? <Check /> : <X />}
        </div>
      ),
      sortValue: (item) => item.isCustomer,
    },
    {
      label: "Edit",
      render: (item) => (
        <div className="flex items-center justify-center">
          <Button
            info
            rounded
            disabled={item.isCustomer}
            className="px-5 py-1.5 cursor-pointer"
            onClick={() => {
              setItem(item);
              setShowEditModal(true);
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
            disabled={item.isCustomer}
            className="px-5 py-1.5 cursor-pointer"
            onClick={() => {
              setItem(item);
              setShowDeleteModal(true);
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
    <ContactSortableTable
      data={contacts}
      config={config}
      item={item}
      showDeleteModal={showDeleteModal}
      setShowDeleteModal={setShowDeleteModal}
      showEditModal={showEditModal}
      setShowEditModal={setShowEditModal}
    />
  );
}
