import { cn } from "@/lib/utils";

function ActiveText({ isActive }: { isActive: boolean | undefined | null }) {
  return (
    <small className={cn(isActive ? "text-green-400" : "text-red-400")}>
      {isActive ? "Active" : "Inactive"}
    </small>
  );
}

export default ActiveText;
