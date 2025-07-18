"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSolidStore } from "@/providers/store.provider";
import { selectFieldPositions, selectSelectedPlayer } from "@/stores/selectors";

interface FieldPositionComboProps {
  defaultValue?: string;
}

function FieldPositionCombo({}: FieldPositionComboProps) {
  const selectedPlayer = useSolidStore(selectSelectedPlayer);
  const setFavPosition = useSolidStore((state) => state.setFavPosition);
  const allFieldPositions = useSolidStore(selectFieldPositions);
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {selectedPlayer?.favPositionId
            ? allFieldPositions.find(
                (f) => f.id === selectedPlayer?.favPositionId
              )?.id
            : "Select field position..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput
            placeholder="Search field position..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No field position found.</CommandEmpty>
            <CommandGroup>
              {allFieldPositions.map((fp) => (
                <CommandItem
                  key={fp.id}
                  value={fp.id}
                  onSelect={(currentValue) => {
                    setFavPosition(
                      currentValue === selectedPlayer?.favPositionId
                        ? ""
                        : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {fp.id} - {fp.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedPlayer?.favPositionId === fp.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FieldPositionCombo;
