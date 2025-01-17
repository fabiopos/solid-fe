import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterCountries } from "@/lib/helpers";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import countryRegionData from "country-region-data/dist/data-umd";
import { useEffect, useState } from "react";

export interface Region {
  name: string;
  shortCode: string;
}

export interface CountryRegion {
  countryName: string;
  countryShortCode: string;
  regions: Region[];
}

interface CountrySelectProps {
  priorityOptions?: string[];
  whitelist?: string[];
  blacklist?: string[];
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  value?: string
}

function CountrySelect({
  priorityOptions = [],
  whitelist = [],
  blacklist = [],
  onChange = () => {},
  className,
  placeholder = "Country",
  value,
}: CountrySelectProps) {
  const [countries, setCountries] = useState<CountryRegion[]>([]);

  useEffect(() => {
    setCountries(
      filterCountries(countryRegionData, priorityOptions, whitelist, blacklist)
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priorityOptions]);

  return (
    <Select
      onValueChange={(value: string) => {
        onChange(value);
      }}
      value={value}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {countries.map(({ countryName, countryShortCode }) => (
          <SelectItem key={countryShortCode} value={countryShortCode}>
            {countryName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CountrySelect;
