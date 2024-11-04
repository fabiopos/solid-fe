import { Badge } from "../ui/badge";

interface PositionCategoryBadgeProps {
  category: string | null | undefined;
}

export default function PositionCategoryBadge({
  category,
}: PositionCategoryBadgeProps) {
  switch (category) {
    case "GOALKEEPER":
      return <Badge className="bg-orange-400">{category}</Badge>;
    case "DEFENDER":
      return <Badge className="bg-blue-500">{category}</Badge>;
    case "MIDFIELDER":
      return <Badge className="bg-green-400">{category}</Badge>;
    case "FORWARD":
      return <Badge variant="destructive">{category}</Badge>;
    default:
      return <Badge className="bg-slate-400">No Position</Badge>;
  }
}
