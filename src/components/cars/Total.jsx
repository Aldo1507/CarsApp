import { useAppContext } from "../../hooks/use-app-context";

export default function Total() {
  const { cars, searchTerm } = useAppContext();

  const totals = cars
    .filter((item) => {
      return item.make.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .reduce((total, item) => {
      return total + item.cost;
    }, 0);

  return (
    <div className="grid grid-cols-2 bg-green-100 dark:bg-green-800 p-3 rounded-md outline-2 outline-green-400 dark:outline-green-800 outline-offset-4">
      <div className="grid grid-cols-2 font-bold">
        <p>Total:</p>
        <p className="justify-self-start">${totals}</p>
      </div>
      <div>&nbsp;</div>
    </div>
  );
}
