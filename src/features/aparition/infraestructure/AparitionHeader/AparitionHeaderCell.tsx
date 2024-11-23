import { ReactNode } from "react";

function AparitionHeaderCell({ children }: { children: ReactNode }) {
  return <div className="font-bold text-md text-center text-slate-500">{children}</div>;
}

export default AparitionHeaderCell;
