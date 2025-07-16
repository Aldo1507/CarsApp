import { useState } from "react";
import Button from "../ui/Button";
import { useAppContext } from "../../hooks/use-app-context";

export default function EditCars({ car, onClose }) {
  const { editCarById } = useAppContext();
  const [make, setMake] = useState(car.make);
  const [cost, setCost] = useState(car.cost);
  const [sold, setSold] = useState(car.sold);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(car.id, { make, cost, sold });
    editCarById(car.id, { make, cost, sold });
    onClose();
  };

  return (
    <div className="flex justify-between px-20">
      <form className="flex gap-5 justify-between" onSubmit={handleSubmit}>
        <div className="flex gap-10 items-center">
          <label
            htmlFor="make"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Make
          </label>
          <div className="mt-2">
            <input
              id="make"
              name="make"
              type="text"
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
              }}
              autoComplete="make"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="flex gap-10 items-center">
          <label
            htmlFor="cost"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Cost
          </label>
          <div className="mt-2">
            <input
              id="cost"
              name="cost"
              type="number"
              value={cost || ""}
              onChange={(e) => {
                setCost(parseFloat(e.target.value) || 0);
              }}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="">
            <label
              htmlFor="sold"
              className="inline-block text-sm/6 font-medium text-gray-900"
            >
              Sold
            </label>
          </div>
          <div className="mt-2">
            <input
              id="sold"
              name="sold"
              type="checkbox"
              checked={sold}
              onChange={(e) => {
                setSold(e.target.checked);
              }}
              // required
              className="inline-block w-full rounded-md bg-white  -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      </form>
      <div className="flex gap-10 items-center">
        <Button onClick={handleSubmit} primary rounded>
          Update
        </Button>
        <Button onClick={onClose} primary outline rounded>
          Cancel
        </Button>
      </div>
    </div>
  );
}
