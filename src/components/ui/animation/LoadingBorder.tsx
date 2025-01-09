import { cn } from "@/lib/utils";
import { BorderTrail } from "../border-trail";

interface LoadingBorderProps {
  className?: string;
}
function LoadingBorder({ className }: LoadingBorderProps) {
  return (
    <BorderTrail
      className={cn(
        "bg-gradient-to-l from-blue-200 via-blue-500 to-blue-200 dark:from-blue-400 dark:via-blue-500 dark:to-blue-700",
        className
      )}
      size={120}
    />
  );
}

export default LoadingBorder;
