import { useState } from "react";
import { useAppContext } from "../../hooks/use-app-context";

export default function CarForm() {
  const { createNewCar } = useAppContext();

  const [make, setMake] = useState("");
  const [cost, setCost] = useState(0);
  const [sold, setSold] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ make, cost });
    createNewCar({ make, cost, sold });
    setMake("");
    setCost(0);
    setSold(false);
  };

  return (
    <div className="flex min-h-full flex-col justify-center bg-slate-100  p-3 rounded-md outline-2 outline-slate-400 outline-offset-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create new car
        </h2>
      </div>

      <div className="mt-10 flex items-center justify-center">
        <form className="flex items-end gap-5" onSubmit={handleSubmit}>
          <div>
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
                // required
                autoComplete="brand"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="cost"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Cost
              </label>
            </div>
            <div className="mt-2">
              <input
                id="cost"
                name="cost"
                type="number"
                value={cost || ""}
                onChange={(e) => {
                  setCost(parseFloat(e.target.value) || 0);
                }}
                // required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="">
              <label
                htmlFor="sold"
                className="block text-sm/6 font-medium text-gray-900"
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
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
