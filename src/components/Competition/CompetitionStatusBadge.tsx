import { CompetitionStatusEnum } from "@/shared/enums/competitionStatusEnum";
import { Badge } from "../ui/badge";

interface CompetitionStatusBadgeProps {
  status: CompetitionStatusEnum | null | undefined;
}
function CompetitionStatusBadge({ status }: CompetitionStatusBadgeProps) {
  switch (status) {
    case CompetitionStatusEnum.IN_PROGRESS:
      return <Badge className="dark:bg-orange-500 bg-orange-500">In Progress</Badge>;

    case CompetitionStatusEnum.CANCELLED:
      return <Badge className="dark:bg-red-500 bg-red-500">Cancelled</Badge>;

    case CompetitionStatusEnum.COMPLETED:
      return <Badge className="dark:bg-green-500 bg-green-500">Completed</Badge>;

    case CompetitionStatusEnum.DELAYED:
      return <Badge className="dark:bg-red-500 bg-red-600">Delayed</Badge>;

    default:
      return null;
  }
}

export default CompetitionStatusBadge;
