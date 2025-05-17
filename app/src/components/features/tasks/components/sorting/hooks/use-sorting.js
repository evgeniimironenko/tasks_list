import { useEffect, useState } from "react";

export function useSorting({ onHandleSortType, selectedStatus }) {
  const [value, setValue] = useState("date_newest");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!selectedStatus) {
      setItems([
        { label: "Спочатку нові", value: "date_newest" },
        { label: "Спочатку старі", value: "date_oldest" },
        { label: "По статусу", value: "status" },
      ]);
    } else {
      setItems([
        { label: "Спочатку нові", value: "date_newest" },
        { label: "Спочатку старі", value: "date_oldest" },
      ]);
    }
  }, [selectedStatus]);

  useEffect(() => {
    if (value === "date_newest") {
      onHandleSortType("date_newest");
    } else if (value === "date_oldest") {
      onHandleSortType("date_oldest");
    } else if (value === "status") {
      onHandleSortType("status");
    }
  }, [value, onHandleSortType]);

  return {
    models: {
      value,
      items,
    },
    operations: {
      setValue,
    },
  };
}
