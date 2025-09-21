export default function CarModalForm({ data, title }) {
  const { carFormData, setCarFormData } = data;

  return (
    <div>
      <h1 className="text-xl font-bold text-center">{title}</h1>
      <form className="flex flex-col gap-5">
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
              value={carFormData.make || ""}
              onChange={(e) => {
                setCarFormData({
                  ...carFormData,
                  make: e.target.value,
                });
              }}
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
              value={carFormData.cost || ""}
              onChange={(e) => {
                setCarFormData({
                  ...carFormData,
                  cost: parseInt(e.target.value),
                });
              }}
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
              checked={carFormData.sold || ""}
              onChange={(e) => {
                setCarFormData({
                  ...carFormData,
                  sold: e.target.value,
                });
              }}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
