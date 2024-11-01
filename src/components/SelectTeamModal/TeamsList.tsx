import { Team } from "@/types/types.common";
import { Button } from "@/components/ui/button";

interface TeamsListProps {
  teams: Team[];
  onSelectTeam(id: string): void;
}

export default function TeamsList({ teams, onSelectTeam }: TeamsListProps) {
  return (
    <div className="grid grid-cols-2 items-center gap-4">
      {teams.map((team) => (
        <Button
          key={team.id}
          onClick={() => onSelectTeam(team.id)}
          variant="ghost"
        >
          {team.name}
        </Button>
      ))}
    </div>
  );
}
