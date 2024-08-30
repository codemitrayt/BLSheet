import dayjs from "dayjs";
import { DatePicker, Input, Select } from "antd";
import { useEffect, useState } from "react";
import dateformat from "dateformat";
import customParseFormat from "dayjs/plugin/customParseFormat";

import useBLSheetFilters from "../hooks/useBLSheetFilters";
import { useDebounce } from "../hooks/useDebounce";

import { BL_SHEET_TYPES } from "../constants";
import { SheetType } from "../types";

dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

const BLSheetFilters = () => {
  const { search, type, setFilters, startDate, endDate } = useBLSheetFilters();
  const [localSearch, setLocalSearch] = useState<string | undefined>(search);
  const debouncedSearch = useDebounce(localSearch);

  useEffect(() => {
    setFilters({ search: debouncedSearch, startDate, endDate });
  }, [debouncedSearch]);

  return (
    <div className="flex items-center justify-center w-full space-x-6 p-2">
      <Input.Search
        value={localSearch}
        placeholder="search sheet"
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-full"
      />
      <Select
        className="w-full"
        defaultValue={type as SheetType}
        options={[...BL_SHEET_TYPES, { label: "All", value: "all" }]}
        placeholder="Filter by type"
        onChange={(value: SheetType | "all") =>
          setFilters({ type: value, startDate, endDate })
        }
      />
      <DatePicker.RangePicker
        className="w-full"
        defaultValue={[
          startDate
            ? dayjs(dateformat(startDate, "dd/mm/yyyy"), dateFormat)
            : null,
          endDate ? dayjs(dateformat(endDate, "dd/mm/yyyy"), dateFormat) : null,
        ]}
        format={dateFormat}
        placeholder={["start date", "end date"]}
        onChange={(dates) => {
          if (dates)
            setFilters({
              startDate: dates[0]?.toISOString(),
              endDate: dates[1]?.toISOString(),
            });
          else {
            setFilters({
              startDate: undefined,
              endDate: undefined,
            });
          }
        }}
      />
    </div>
  );
};

export default BLSheetFilters;
