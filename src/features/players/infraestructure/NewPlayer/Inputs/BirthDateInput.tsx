"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

function BirthDateInput() {
  const { birthDate, setBirthDate } = useNewPlayerStore((state) => state);
  return (
    <div className="flex flex-col gap-2">
      <Label className="dark:text-slate-800 font-bold">Birth Date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "w-[240px] justify-start text-left font-normal gap-2 border border-slate-300 bg-white",
              !birthDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon size={18} />
            {birthDate ? format(birthDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            selected={birthDate || undefined}
            onSelect={(date) => setBirthDate(date || null)}
            initialFocus
            fromYear={1980}
            toYear={new Date().getFullYear() - 18}            
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default BirthDateInput;
