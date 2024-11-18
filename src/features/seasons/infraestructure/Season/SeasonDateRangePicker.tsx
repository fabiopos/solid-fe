"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSeasonStore } from "@/context/SeasonCtx";

interface SeasonDateRangePickerProps {
  from?: Date | undefined;
  to?: Date | undefined;
}

const DEFAULT_FROM = new Date();
const DEFAULT_TO = addDays(new Date(), 20);

export function SeasonDateRangePicker({
  from,
  to,
  className,
}: SeasonDateRangePickerProps & React.HTMLAttributes<HTMLDivElement>) {
  const { selectedSeason, updateSelectedSeason } = useSeasonStore(
    (state) => state
  );
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: from ?? DEFAULT_FROM,
    to: to ?? DEFAULT_TO,
  });

  const handleChangeRange = React.useCallback((date: DateRange | undefined) => {
    setDate(date);
    updateSelectedSeason({ endDate: date?.to, startDate: date?.from });
  }, []);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start items-center text-left font-normal text-white",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-3" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleChangeRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
