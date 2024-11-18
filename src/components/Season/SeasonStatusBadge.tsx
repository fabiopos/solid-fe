import { SeasonStatusEnum } from "@/shared/enums/seasonStatusEnum";
import { Badge } from "../ui/badge";

interface SeasonStatusBadgeProps {
  status: SeasonStatusEnum | null | undefined;
}
function SeasonStatusBadge(props: SeasonStatusBadgeProps) {
  switch (props.status) {
    case SeasonStatusEnum.IN_PROGRESS:
      return <Badge className="bg-orange-200">In Progress</Badge>;

    case SeasonStatusEnum.COMPLETED:
      return <Badge className="bg-green-200">Completed</Badge>;

    case SeasonStatusEnum.CANCELLED:
      return <Badge className="bg-red-200">Cancelled</Badge>;

    default:
      return null;
  }
}

export default SeasonStatusBadge;
