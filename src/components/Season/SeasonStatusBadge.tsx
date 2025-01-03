import { SeasonStatusEnum } from "@/shared/enums/seasonStatusEnum";
import { Badge } from "../ui/badge";

interface SeasonStatusBadgeProps {
  status: SeasonStatusEnum | null | undefined;
}
function SeasonStatusBadge(props: SeasonStatusBadgeProps) {
  switch (props.status) {
    case SeasonStatusEnum.IN_PROGRESS:
      return <Badge className="bg-orange-500 hover:bg-orange-400">In Progress</Badge>;

    case SeasonStatusEnum.COMPLETED:
      return <Badge className="bg-green-500 hover:bg-green-400">Completed</Badge>;

    case SeasonStatusEnum.CANCELLED:
      return <Badge className="bg-red-500 hover:bg-red-400">Cancelled</Badge>;

    default:
      return null;
  }
}

export default SeasonStatusBadge;
