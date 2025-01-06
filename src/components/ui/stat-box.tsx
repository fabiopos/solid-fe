import { ReactNode } from "react";

interface StatBoxProps {
  label: ReactNode;
  value: ReactNode;
}
function StatBox({ label, value }: StatBoxProps) {
  return (
    <article className="flex flex-col justify-center items-center border p-2 rounded-lg">
      <div>{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </article>
  );
}

export default StatBox;
