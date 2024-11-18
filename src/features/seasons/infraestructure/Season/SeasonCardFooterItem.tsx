import React from "react";
interface SeasonCardFooterItemProps {
  label: string;
  value: string | number;
}
export default function SeasonCardFooterItem(props: SeasonCardFooterItemProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-2xl font-bold">{props.value}</span>
      <span className="text-sm">{props.label}</span>
    </div>
  );
}
