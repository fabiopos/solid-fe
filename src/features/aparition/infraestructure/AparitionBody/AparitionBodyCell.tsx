import { ReactNode } from "react";

function AparitionBodyCell({ children }: { children: ReactNode }) {
  return <div className="font-thin text-sm text-center">{children}</div>;
}

export default AparitionBodyCell;
