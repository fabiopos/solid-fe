import { ReactNode } from "react";

interface SettingsItemProps {
  label: ReactNode;
  value: ReactNode;
}
const SettingsItem = ({ label, value }: SettingsItemProps) => {
  return (
    <li className="flex justify-between my-5">
      <div className="pr-5 font-bold text-right w-full">{label}:</div>
      <div className="flex items-center space-x-2 w-full">{value}</div>
    </li>
  );
};

export default SettingsItem;
