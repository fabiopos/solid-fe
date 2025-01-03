import React from "react";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";

interface DateInputProps {
  value: Date | null | undefined;
  setDate: (date: Date | null) => void;
  label: string;
  className?: string
}
function DateInput({ setDate, value, label, className }: DateInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="dark:text-slate-800 font-bold">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal gap-2 border border-slate-600 dark:border-slate-300 dark:bg-white dark:text-background bg-slate-100",
              !value && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon size={18} />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            selected={value || undefined}
            onSelect={(date) => setDate(date || null)}
            initialFocus
            fromYear={1980}
            toYear={new Date().getFullYear() - 18}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateInput;
