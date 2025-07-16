import CarForm from "../components/cars/CarForm";
import CarList from "../components/cars/CarList";
import CarListHead from "../components/cars/CarListHead";
import SearchCar from "../components/cars/SearchCar";
import Total from "../components/cars/Total";
import TableCarPage from "../components/cars/TableCarPage";

export default function CarsPage({
  createNewCar,
  searchTerm,
  setSearchTerm,
  cars,
}) {
  return (
    <div className="sm:5xl sm:w-full flex flex-col gap-2">
      <SearchCar />
      {/* <CarListHead /> */}
      {/* <CarList /> */}
      <TableCarPage />
      <Total />
    </div>
  );
}
