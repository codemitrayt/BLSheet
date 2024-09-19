import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { ProjectMemberFilters } from "../types";

function useProjectMemberFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const memberEmail = searchParams.get("memberEmail") || undefined;
  const currentPage = searchParams.get("currentPage") || 1;
  const memberStatus = searchParams.get("memberStatus") || undefined;

  const setFilters = useCallback((filters: ProjectMemberFilters) => {
    setSearchParams((params) => {
      if (filters.memberEmail) params.set("memberEmail", filters.memberEmail);
      else params.delete("memberEmail");

      if (filters.currentPage)
        params.set("currentPage", filters.currentPage.toString());

      if (filters.status) params.set("memberStatus", filters.status);
      else params.delete("memberStatus");

      return params;
    });
  }, []);

  return {
    memberEmail,
    currentPage,
    setFilters,
    memberStatus,
  };
}

export default useProjectMemberFilters;
