"use client";

import { Badge } from "@/components/ui/badge";
import { Variant } from "@/types/types.common";

interface CompetitionBadgesProps {
  competitions: {
    key: string;
    name: string | undefined;
    variant: Variant;
  }[];
}

function CompetitionBadges({ competitions }: CompetitionBadgesProps) {
  return (
    <div className="mx-2 my-5 flex justify-end gap-2 text-xs xl:text-lg flex-wrap">
      {competitions.map((x) => (
        <Badge key={x.key} variant={x.variant}>
          {x.name}
        </Badge>
      ))}
    </div>
  );
}

export default CompetitionBadges;
