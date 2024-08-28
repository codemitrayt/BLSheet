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

  const setFilters = useCallback((filters: BLSheetFilter) => {
    setSearchParams((params) => {
      if (filters.search !== undefined) {
        params.set("search", filters.search);
      }

      if (filters.type) {
        params.set("type", filters.type);
      }

      if (filters.perPage) {
        params.set("perPage", filters.perPage.toString());
      }

      if (filters.currentPage) {
        params.set("currentPage", filters.currentPage.toString());
      }

      return params;
    });
  }, []);

  return {
    search,
    type,
    perPage,
    currentPage,
    setFilters,
  };
}

export default useBLSheetFilters;
