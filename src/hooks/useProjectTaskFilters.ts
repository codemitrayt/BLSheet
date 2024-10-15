import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { ProjectTaskFilters } from "../types";

function useProjectTaskFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const currentPage = searchParams.get("currentPage") || 1;
  const priority = searchParams.get("priority") || undefined;
  const sortByCreatedAt = searchParams.get("sortByCreatedAt") || undefined;
  const assignedToMe = searchParams.get("assignedToMe") || undefined;
  const createdByMe = searchParams.get("createdByMe") || undefined;
  const view = searchParams.get("view") || "board";

  const setFilters = useCallback((filters: ProjectTaskFilters) => {
    setSearchParams((params) => {
      if (filters.view) params.set("view", filters.view);
      if (filters.search) params.set("search", filters.search);
      else params.delete("search");
      if (filters.currentPage)
        params.set("currentPage", filters.currentPage.toString());
      if (filters.priority) params.set("priority", filters.priority);
      else params.delete("priority");
      if (filters.sortByCreatedAt)
        params.set(
          "sortByCreatedAt",
          filters?.sortByCreatedAt ? "true" : "false"
        );
      else params.delete("sortByCreatedAt");
      if (filters.assignedToMe)
        params.set("assignedToMe", filters.assignedToMe ? "true" : "false");
      else params.delete("assignedToMe");
      if (filters.createdByMe)
        params.set("createdByMe", filters.createdByMe ? "true" : "false");
      else params.delete("createdByMe");
      return params;
    });
  }, []);

  return {
    search,
    currentPage,
    setFilters,
    priority,
    sortByCreatedAt,
    assignedToMe,
    createdByMe,
    view,
  };
}

export default useProjectTaskFilters;
