export default function ContactModalForm({ data, title }) {
  const {
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
  } = data;

  return (
    <div>
      <h1 className="text-xl font-bold text-center">{title}</h1>
      <form className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm/6 font-medium text-gray-900"
          >
            First Name
          </label>
          <div className="mt-2">
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName || ""}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="lastname"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Last Name
            </label>
          </div>
          <div className="mt-2">
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={lastName || ""}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
          </div>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email || ""}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="phone"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Phone
            </label>
          </div>
          <div className="mt-2">
            <input
              id="phone"
              name="phone"
              type="text"
              value={phone || ""}
              onChange={(e) => {
                setPhone(parseInt(e.target.value) || 0);
              }}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="location"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Location
            </label>
          </div>
          <div className="mt-2">
            <input
              id="location"
              name="location"
              type="text"
              value={location || ""}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="">
            <label
              htmlFor="isCustomer"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Is Customer
            </label>
          </div>
          <div className="mt-2">
            <input
              id="isCustomer"
              name="isCustomer"
              type="checkbox"
              checked={isCustomer || ""}
              onChange={(e) => {
                setIsCustomer(e.target.checked);
              }}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
