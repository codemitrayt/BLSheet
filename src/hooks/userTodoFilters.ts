import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { TodoFilter } from "../types";

function useTodoFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get("date") || undefined;

  const setFilters = useCallback((filters: TodoFilter) => {
    setSearchParams((params) => {
      if (filters.date) params.set("date", filters.date.toString());
      else params.delete("date");
      return params;
    });
  }, []);

  return {
    date,
    setFilters,
  };
}

export default useTodoFilters;
