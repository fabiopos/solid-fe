import { Badge } from "../ui/badge";

interface PositionCategoryBadgeProps {
  category: string | null | undefined;
}

export default function PositionCategoryShortBadge({
  category,
}: PositionCategoryBadgeProps) {
  switch (category) {
    case "GOALKEEPER":
      return <Badge className="bg-orange-50/50 text-orange-600 dark:bg-white">GK</Badge>;
    case "DEFENDER":
      return <Badge className="bg-blue-50/50 text-blue-600 dark:bg-white">DF</Badge>;
    case "MIDFIELDER":
      return <Badge className="bg-green-50/50 text-green-600 dark:bg-white">MF</Badge>;
    case "FORWARD":
      return <Badge className="bg-red-50/50 text-red-600 dark:bg-white">FW</Badge>;
    default:
      return <Badge className="bg-cyan-50/50 text-cyan-600 dark:bg-white">UK</Badge>;
  }
}
