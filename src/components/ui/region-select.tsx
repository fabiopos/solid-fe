import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterRegions } from "@/lib/helpers";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
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

interface RegionSelectProps {
  countryCode: string;
  priorityOptions?: string[];
  whitelist?: string[];
  blacklist?: string[];
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  value?: string;
}

function RegionSelect({
  countryCode,
  priorityOptions = [],
  whitelist = [],
  blacklist = [],
  onChange = () => {},
  className,
  placeholder = "Region",
  value,
}: RegionSelectProps) {
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    const regions = countryRegionData.find(
      (country: CountryRegion) => country.countryShortCode === countryCode
    );

    if (regions) {
      setRegions(
        filterRegions(regions.regions, priorityOptions, whitelist, blacklist)
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode]);

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
        {regions.map(({ name, shortCode }) => (
          <SelectItem key={shortCode} value={shortCode}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default RegionSelect;
