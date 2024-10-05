import { Input, Select } from "antd";
import { useEffect, useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";
import { TASK_PRIORITY } from "../../constants";
import useProjectTaskFilters from "../../hooks/useProjectTaskFilters";

enum TaskPriority {
  ALL = "all",
  Low = "low",
  Medium = "medium",
  High = "high",
}

const ProjectTaskFilters = () => {
  const { search, priority, setFilters } = useProjectTaskFilters();
  const [localSearch, setLocalSearch] = useState<string | undefined>(search);
  const debouncedSearch = useDebounce(localSearch);

  useEffect(() => {
    setFilters({ search: debouncedSearch, priority });
  }, [debouncedSearch]);

  return (
    <div className="flex items-center space-x-2">
      <Input.Search
        allowClear
        value={localSearch}
        placeholder="Search all tasks"
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-[300px]"
      />

      <Select
        className="w-[120px]"
        defaultValue={priority as TaskPriority}
        options={[{ label: "All", value: "all" }, ...TASK_PRIORITY]}
        placeholder="Priority"
        onChange={(value: TaskPriority) =>
          setFilters({ priority: value, search })
        }
      />
    </div>
  );
};

export default ProjectTaskFilters;
