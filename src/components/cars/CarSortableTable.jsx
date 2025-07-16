import { useState } from "react";
import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowDownWideNarrow,
} from "lucide-react";
import CarTable from "./CarTable";

export default function CarSortableTable(props) {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setsortBy] = useState(null);

  const { data, config, keyFn } = props;

  const handleClick = (label) => {
    if (sortBy && label !== sortBy) {
      setSortOrder("asc");
      setsortBy(label);
      return;
    }

    if (sortOrder === null) {
      setSortOrder("asc");
      setsortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setsortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setsortBy(null);
    }
  };

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th
          onClick={() => handleClick(column.label)}
          className="bg-green-400 dark:bg-green-900 cursor-pointer"
        >
          <div className="flex items-center justify-center gap-3">
            {column.label}
            {getIcons(column.label, sortBy, sortOrder)}
          </div>
        </th>
      ),
    };
  });

  let sortData = data;

  if (sortOrder && sortBy) {
    const { sortValue } = config.find((column) => column.label === sortBy);

    sortData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  return (
    <div>
      <CarTable
        {...props}
        config={updatedConfig}
        data={sortData}
        keyFn={keyFn}
      />
    </div>
  );
}

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        <ArrowDownUp className="w-4 h-4" />
      </div>
    );
  }

  if (sortOrder === null) {
    return (
      <div>
        <ArrowDownUp className="w-4 h-4" />
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div>
        <ArrowDownNarrowWide className="w-4 h-4" />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div>
        <ArrowDownWideNarrow className="w-4 h-4" />
      </div>
    );
  }
}
