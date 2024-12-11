'use client'
import { Calendar } from "../ui/calendar";
import { DayModifiers, ModifiersClassNames } from "react-day-picker";
import EventCell from "./EventCell";

interface TeamCalendarCompProps {
    minDate: Date;
    modifiers?: DayModifiers;
    modifiersClassNames?: ModifiersClassNames;
    range: {
        from: Date;
        to: Date;
    }
}
function TeamCalendarComp({ minDate, modifiers, modifiersClassNames, range }:TeamCalendarCompProps) {
  return (
    <Calendar
      mode="multiple"
      defaultMonth={minDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}  
      fromDate={range.from}    
      toDate={range.to}
      numberOfMonths={12}
      components={{
        DayContent: (props) => <EventCell {...props} />,

      }}
      showOutsideDays={false}
      pagedNavigation
      classNames={{
        cell: "h-9 w-9",
        caption_label: "p-2",
        day_today: "outline outline-neutral-500",
        months: "grid grid-cols-4 gap-4",
        month: "border p-2",
      }}
    />
  );
}

export default TeamCalendarComp;
