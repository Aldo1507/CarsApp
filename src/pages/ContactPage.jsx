import SearchContact from "../components/contacts/SearchContact";
import TableContactPage from "../components/contacts/TableContactPage";

export default function ConatctPage() {
  return (
    <div className="sm:5xl sm:w-full flex flex-col gap-2">
      <SearchContact />
      <TableContactPage />
    </div>
  );
}
