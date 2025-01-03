import { Badge } from "../ui/badge";

interface PositionCategoryBadgeProps {
  category: string | null | undefined;
}

export default function PositionCategoryShortBadge({
  category,
}: PositionCategoryBadgeProps) {
  switch (category) {
    case "GOALKEEPER":
      return <Badge className="bg-orange-50/50 text-orange-600 dark:bg-white hover:bg-orange-100">GK</Badge>;
    case "DEFENDER":
      return <Badge className="bg-blue-50/50 text-blue-600 dark:bg-white hover:bg-blue-100">DF</Badge>;
    case "MIDFIELDER":
      return <Badge className="bg-green-50/50 text-green-600 dark:bg-white hover:bg-green-100">MF</Badge>;
    case "FORWARD":
      return <Badge className="bg-red-50/50 text-red-600 dark:bg-white hover:bg-red-100">FW</Badge>;
    default:
      return <Badge className="bg-cyan-50/50 text-cyan-600 dark:bg-white hover:bg-cyan-100">UK</Badge>;
  }
}
