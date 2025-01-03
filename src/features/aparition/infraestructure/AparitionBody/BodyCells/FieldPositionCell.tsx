import { ReactNode } from "react";

function FieldPositionBodyCell({ children }: { children: ReactNode }) {
  return <div className="font-thin text-sm text-left">{children}</div>;
}

export default FieldPositionBodyCell;
