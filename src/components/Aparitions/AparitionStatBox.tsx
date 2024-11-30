import { ReactNode } from "react";

interface AparitionStatBoxProps {
  label: ReactNode;
  value: ReactNode;
}
function AparitionStatBox({ label, value }: AparitionStatBoxProps) {
  return (
    <div className="flex flex-col justify-center items-center border rounded-lg px-4 py-2 bg-background">
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}

export default AparitionStatBox;
