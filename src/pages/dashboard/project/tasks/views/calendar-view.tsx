import { useState } from "react";

import {
  format,
  getDay,
  parse,
  startOfWeek,
  addMonths,
  subMonths,
} from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { enIN } from "date-fns/locale";

import CustomToolBar from "./custom-toolbar";
import EventCard from "../cards/event-card";
import { ProjectTask } from "../../../../../types";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

const locales = {
  enIn: enIN,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarView {
  tasks: ProjectTask[];
  refetch: () => void;
}

const CalendarView = ({ tasks }: CalendarView) => {
  const [value, setValue] = useState(
    tasks.length > 0 ? new Date(tasks[0].startDate) : new Date()
  );

  const events = tasks.map((task) => ({
    start: new Date(task.startDate),
    end: new Date(task.endDate),
    id: task._id,
    ...task,
  }));

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") setValue(subMonths(value, 1));
    else if (action === "NEXT") setValue(addMonths(value, 1));
    else setValue(new Date());
  };

  return (
    <div className="p-2 h-[calc(100vh_-220px)] overflow-y-auto">
      <Calendar
        localizer={localizer}
        date={value}
        events={events}
        views={["month"]}
        defaultView="month"
        toolbar
        showAllEvents
        className="h-full"
        max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        formats={{
          weekdayFormat: (date, culture, localizer) =>
            localizer?.format(date, "EEE", culture) ?? "",
        }}
        components={{
          eventWrapper: ({ event }) => (
            <EventCard key={event.id} task={event as unknown as ProjectTask} />
          ),
          toolbar: () => (
            <CustomToolBar date={value} onNavigate={handleNavigate} />
          ),
        }}
      />
    </div>
  );
};

export default CalendarView;
