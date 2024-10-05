import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { ProjectTaskFilters } from "../types";

function useProjectTaskFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const currentPage = searchParams.get("currentPage") || 1;
  const priority = searchParams.get("priority") || undefined;

  const setFilters = useCallback((filters: ProjectTaskFilters) => {
    setSearchParams((params) => {
      if (filters.search) params.set("search", filters.search);
      else params.delete("search");
      if (filters.currentPage)
        params.set("currentPage", filters.currentPage.toString());
      if (filters.priority) params.set("priority", filters.priority);
      else params.delete("priority");
      return params;
    });
  }, []);

  return {
    search,
    currentPage,
    setFilters,
    priority,
  };
}

export default useProjectTaskFilters;
