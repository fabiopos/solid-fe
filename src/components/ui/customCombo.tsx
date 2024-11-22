import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import React, { ReactNode, useMemo } from "react";

interface ComboItemProps {
  value: string;
  label: string;
}
interface CustomComboProps {
  value: string;
  items: ComboItemProps[];
  onSelect: (item: ComboItemProps | undefined) => void;
  label: string;
  noItemFoundLabel: ReactNode;
  cmdPlaceHolder: string;
  onChange: (value: string) => void;
}

const DEFAULT_LABEL = "Select item...";
const NO_ITEM_FOUND = "No item found";
const DEFAULT_CMD_INPUT_PLACEHOLDER = "Search team...";

function CustomCombo({
  value,
  items,
  onSelect,
  label,
  noItemFoundLabel,
  cmdPlaceHolder,
  onChange,
}: CustomComboProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (item: ComboItemProps, currentValue: string) => {
    onChange(currentValue === value ? "" : currentValue);
    setOpen(false);
    if (currentValue === value) onSelect(undefined);
    else onSelect(item);
  };

  const buttonLabel = useMemo(() => {
    return label ?? DEFAULT_LABEL;
  }, [label]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? items.find((item) => item.label === value)?.label
            : buttonLabel}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={cmdPlaceHolder ?? DEFAULT_CMD_INPUT_PLACEHOLDER}
            className="h-9"
            onValueChange={(search) => onChange(search)}
          />
          <CommandList>
            <CommandEmpty>{noItemFoundLabel ?? NO_ITEM_FOUND}</CommandEmpty>
            <CommandGroup>
              {items.map((item: ComboItemProps) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={(currentValue) => handleSelect(item, currentValue)}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.label ? "opacity-100" : "opacity-0"
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

export default CustomCombo;
