import { ReactNode } from "react";

interface SettingsItemProps {
  label: ReactNode;
  value: ReactNode;
}
const SettingsItem = ({ label, value }: SettingsItemProps) => {
  return (
    <>
      <div className="border-r pr-5">{label}</div>
      <div>
        <div className="flex items-center space-x-2">{value}</div>
      </div>
    </>
  );
};

export default SettingsItem;
