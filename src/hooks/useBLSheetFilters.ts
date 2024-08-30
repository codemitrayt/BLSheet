import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { BLSheetFilter } from "../types";

function useBLSheetFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || undefined;
  const type = searchParams.get("type") || undefined;
  const currentPage = searchParams.get("currentPage")
    ? parseInt(searchParams.get("currentPage") as string)
    : undefined;
  const perPage = searchParams.get("perPage")
    ? parseInt(searchParams.get("perPage") as string)
    : undefined;
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;

  const setFilters = useCallback((filters: BLSheetFilter) => {
    setSearchParams((params) => {
      if (filters.search !== undefined) params.set("search", filters.search);

      if (filters.type) params.set("type", filters.type);

      if (filters.currentPage)
        params.set("currentPage", filters.currentPage.toString());

      if (filters.startDate) params.set("startDate", filters.startDate);
      else params.delete("startDate");

      if (filters.endDate) params.set("endDate", filters.endDate);
      else params.delete("endDate");

      return params;
    });
  }, []);

  return {
    search,
    type,
    perPage,
    currentPage,
    startDate,
    endDate,
    setFilters,
  };
}

export default useBLSheetFilters;
