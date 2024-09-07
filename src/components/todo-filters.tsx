import dayjs from "dayjs";
import { DatePicker } from "antd";

import dateformat from "dateformat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useTodoFilters from "../hooks/userTodoFilters";

dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

const TodoFilters = () => {
  const { date, setFilters } = useTodoFilters();

  return (
    <div className="flex items-center">
      <DatePicker
        defaultValue={
          date ? dayjs(dateformat(date, "dd/mm/yyyy"), dateFormat) : null
        }
        onChange={(date) => {
          if (date) setFilters({ date: date.toISOString() });
          else setFilters({ date: undefined });
        }}
        format={dateFormat}
        placeholder={"Filter Date"}
      />
    </div>
  );
};

export default TodoFilters;
