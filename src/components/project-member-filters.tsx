import { Input, Select } from "antd";
import { useEffect, useState } from "react";

import { useDebounce } from "../hooks/useDebounce";
import useProjectMemberFilters from "../hooks/useProjectMemberFilters";

import { PROJECT_MEMBER_STATUS } from "../constants";
import { ProjectMemberStatus } from "../types";

const ProjectMemberFilters = () => {
  const { memberEmail, memberStatus, setFilters } = useProjectMemberFilters();
  const [localSearch, setLocalSearch] = useState<string | undefined>(
    memberEmail
  );
  const debouncedSearch = useDebounce(localSearch);

  useEffect(() => {
    setFilters({ memberEmail: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <div className="flex items-center space-x-2">
      <Select
        className="w-[120px]"
        defaultValue={memberStatus as ProjectMemberStatus}
        options={PROJECT_MEMBER_STATUS}
        placeholder="Status"
        onChange={(value: ProjectMemberStatus | "all") =>
          setFilters({ status: value })
        }
      />

      <Input.Search
        value={localSearch}
        placeholder="Search member"
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-[300px]"
      />
    </div>
  );
};

export default ProjectMemberFilters;
