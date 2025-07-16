export default function CarListHead() {
  const data = ["Brand", "Cost", "Status"];

  const renderCarsHeaderList = data.map((item, i) => (
    <div key={i} className="font-bold">
      {item}
    </div>
  ));

  return (
    <div className=" bg-slate-100 text-sm lg:text-lg rounded-md outline-2 outline-slate-400 outline-offset-4">
      <div className="grid grid-cols-4 items-center border border-gray-300 px-6 py-4 rounded-md">
        {renderCarsHeaderList}
        <div className="text-center font-bold">Actions</div>
      </div>
    </div>
  );
}
