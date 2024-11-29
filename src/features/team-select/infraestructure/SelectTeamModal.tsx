"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert";
import { useTeamSelect } from "../domain/useTeamSelect";
import TeamsList from "@/components/TeamList/TeamsList";
import { Team } from "@/types/types.common";
import { useEffect } from "react";
import { useAuthStore } from "@/context/AuthCtx";
import { signOut } from "@/auth";
import { SolidAuth } from "@/features/auth/application/SolidAuth";

interface SelectTeamModalProps {
  teams: Team[];
}

export default function SelectTeamModal({ teams }: SelectTeamModalProps) {
  const { setTeams } = useAuthStore((state) => state);
  const {
    isModalOpen,
    hasTeams,
    showNoTeamsAlert,
    onSelectTeam,
  } = useTeamSelect();
  useEffect(() => {
    setTeams(teams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teams]);

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select your Team</DialogTitle>
          <DialogDescription>
            Choose one of your teams to work on
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {hasTeams && <TeamsList teams={teams} onSelectTeam={onSelectTeam} />}
          {showNoTeamsAlert && (
            <Alert variant="destructive">
              You don&apos;t have teams configured, please consider contact the
              app administrator.
              <Button variant="link" onClick={() => SolidAuth.logout()}>
                Log out
              </Button>
            </Alert>
          )}
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
