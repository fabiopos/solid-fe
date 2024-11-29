"use client";
import ActiveText from "@/components/ui/active-text";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TeamDelete } from "@/features/teams/application/TeamDelete";
import { FulfilledTeam } from "@/features/teams/domain/team.schema";
import TeamCreateDrawer from "@/features/teams/infraestructure/TeamCreateDrawer";
import { ApiClient } from "@/lib/ApiClient";
import { OctagonAlert } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

interface MyRivalsProps {
  teams: FulfilledTeam[];
}

function MyRivals({ teams }: MyRivalsProps) {
  const router = useRouter();
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const hasTeams = useMemo(() => teams.length > 0, [teams]);
  const handleDelete = useCallback(async (id: string) => {
    const teamDel = new TeamDelete(new ApiClient());
    await teamDel.deleteteam(id, data?.user.access_token ?? "");
    router.refresh();
  }, []);
  return (
    <div>
      {!hasTeams && (
        <Alert>
          <div className="flex justify-between items-center p-2">
            <div className="flex gap-5">
              <OctagonAlert />
              <div>
                <strong>No rivals found!</strong>
                <p>You don&apos;t have rivals created yet</p>
              </div>
            </div>
            <div className="flex justify-start">
              <Button onClick={() => setOpen(true)}>
                Create my first rival
              </Button>
            </div>
          </div>
        </Alert>
      )}
      <div className="flex justify-end my-2">
        <Button onClick={() => setOpen(true)} size="sm">
          Add rival
        </Button>
      </div>
      <ul className="space-y-2">
        {teams.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center gap-5 bg-slate-800/90 p-5"
          >
            <div className="flex flex-col">
              <span>{t.name}</span>
              <ActiveText isActive={t.active} />
            </div>
            <div>
              {t.id && (
                <Button
                  onClick={() => handleDelete(t.id!)}
                  variant="destructive"
                  size="sm"
                >
                  Delete
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <TeamCreateDrawer
        onClose={() => setOpen(false)}
        open={open}
        subtitle="This team can be used in Match setup"
        title="Add New Rival"
      />
    </div>
  );
}

export default MyRivals;
