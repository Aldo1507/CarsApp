import { useAppContext } from "../../hooks/use-app-context";
import CarDetails from "./CarDetails";

export default function CarList() {
  const { cars, searchTerm } = useAppContext();

  const data = cars.filter((item) => {
    return item.make.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderCars = data.map((item) => {
    // return (
    //   <li key={item.id}>
    //     {item.make} -{item.cost}{" "}
    //   </li>
    // );
    return <CarDetails key={item.id} item={item} />;
  });

  return (
    <div className=" bg-slate-100 text-sm lg:text-lg p-3 rounded-md outline-2 outline-slate-400 outline-offset-4">
      {renderCars}
    </div>
  );
}
