"use client";
import { Calendar } from "../ui/calendar";
import { DayModifiers, ModifiersClassNames } from "react-day-picker";
import EventCell from "./EventCell";
import { sub } from "date-fns";

interface TeamCalendarCompProps {
  minDate: Date;
  modifiers?: DayModifiers;
  modifiersClassNames?: ModifiersClassNames;
  range: {
    from: Date;
    to: Date;
  };
}
function TeamCalendarComp({
  modifiers,
  modifiersClassNames,
  range,
}: TeamCalendarCompProps) {
  return (
    <Calendar
      mode="multiple"
      defaultMonth={sub(new Date(), { months: 6 })}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      fromDate={range.from}
      toDate={range.to}
      numberOfMonths={12}
      components={{
        DayContent: (props) => <EventCell {...props} />,
      }}
      showOutsideDays={true}
      pagedNavigation
      classNames={{
        cell: "h-9 w-9",
        caption_label: "p-1",
        day_today: "outline outline-gray-500",
        months:
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(265px,_1fr))]  gap-2 xl:gap-4",
        month: "border border-gray-200 rounded-xl p-2",
        table: "mx-auto",
        day_outside: "bg-transparent text-muted-foreground opacity-50",
      }}
    />
  );
}

export default TeamCalendarComp;
