import { CompetitionStatusEnum } from "@/shared/enums/competitionStatusEnum";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface CompetitionStatusTextProps {
  status: CompetitionStatusEnum | null | undefined;
  className?: string;
}
function CompetitionStatusText({
  status,
  className,
}: CompetitionStatusTextProps) {
  switch (status) {
    case CompetitionStatusEnum.IN_PROGRESS:
      return (
        <span className={cn("dark:text-orange-500 text-orange-500", className)}>
          In Progress
        </span>
      );

    case CompetitionStatusEnum.CANCELLED:
      return (
        <span className={cn("dark:text-red-500 text-red-500", className)}>
          Cancelled
        </span>
      );

    case CompetitionStatusEnum.COMPLETED:
      return (
        <span className={cn("dark:text-green-500 text-green-500", className)}>
          Completed
        </span>
      );

    case CompetitionStatusEnum.DELAYED:
      return (
        <span className={cn("dark:text-red-500 text-red-600", className)}>
          Delayed
        </span>
      );

    default:
      return "unrecognized";
  }
}

export default CompetitionStatusText;
