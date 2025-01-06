import { Badge } from "../ui/badge";

interface PositionCategoryBadgeProps {
  category: string | null | undefined;
}

export default function PositionCategoryBadge({
  category,
}: PositionCategoryBadgeProps) {
  switch (category) {
    case "GOALKEEPER":
      return <Badge className="bg-orange-50/50 hover:bg-orange-100 text-orange-600 dark:bg-background">{category}</Badge>;
    case "DEFENDER":
      return <Badge className="bg-blue-50/50 hover:bg-blue-100 text-blue-600 dark:bg-background">{category}</Badge>;
    case "MIDFIELDER":
      return <Badge className="bg-green-50/50 hover:bg-green-100 text-green-600 dark:bg-background">{category}</Badge>;
    case "FORWARD":
      return <Badge className="bg-red-50/50 hover:bg-red-100 text-red-600 dark:bg-background">{category}</Badge>;
    default:
      return <Badge className="bg-cyan-50/50 hover:bg-cyan-100 text-cyan-600 dark:bg-background">No Position</Badge>;
  }
}
