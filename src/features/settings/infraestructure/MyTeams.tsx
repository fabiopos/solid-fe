import ActiveText from "@/components/ui/active-text";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FulfilledTeam } from "@/features/teams/domain/team.schema";
import { OctagonAlert } from "lucide-react";
import { useMemo } from "react";

interface MyTeamsProps {
  teams: FulfilledTeam[];
}

function MyTeams({ teams }: MyTeamsProps) {
  const hasTeams = useMemo(() => teams.length > 0, [teams]);
  return (
    <div>
      {!hasTeams && (
        <Alert>
          <div className="flex justify-between items-center p-2">
            <div className="flex gap-5">
              <OctagonAlert />
              <div>
                <strong>No teams found!</strong>
                <p>You don&apos;t have rivals created yet</p>
              </div>
            </div>
            <div className="flex justify-start">
              <Button>Create my first team</Button>
            </div>
          </div>
        </Alert>
      )}
      <ul>
        {teams.map((t) => (
          <li key={t.id} className="bg-slate-800/90 p-5">
            <div>
              <div className="flex gap-5">
                <strong className="text-right w-full">Team Name</strong>
                <span className="text-left w-full">{t.name}</span>
              </div>
              <div className="flex justify-between gap-5">
                <strong className="text-right w-full">Players Count</strong>
                <span className="text-left w-full">
                  {t.players?.length ?? 0}
                </span>
              </div>

              <div className="flex justify-between gap-5">
                <strong className="text-right w-full">Status</strong>
                <span className="text-left w-full"><ActiveText isActive={t.active} /></span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyTeams;
