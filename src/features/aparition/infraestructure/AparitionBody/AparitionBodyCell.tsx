import { cn } from "@/lib/utils";
import { ReactNode } from "react";

function AparitionBodyCell({ children, className }: { children: ReactNode, className?: string }) {
  return <div className={cn("font-thin text-sm text-center", className)}>{children}</div>;
}

export default AparitionBodyCell;
