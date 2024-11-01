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
import { useAuthStore } from "@/context/AuthCtx";
import { useEffect, useMemo } from "react";
import { Alert } from "@/components/ui/alert";
import TeamsList from "./TeamsList";

export default function SelectTeamModal() {
  const { accountData, setTeamId, fetchTeams, session, fetchTeamsStatus } =
    useAuthStore((state) => state);
  const teams = useMemo(() => accountData.teams, [accountData]);
  const hasTeams = useMemo(() => teams.length > 0, [teams]);
  const modalOpen = useMemo(() => {
    return !accountData.selectedTeamId && !!session?.user;
  }, [accountData.selectedTeamId, session?.user]);

  const showNoTeamsAlert = useMemo(() => {
    if (fetchTeamsStatus === "IN_PROGRESS" && !hasTeams) return true;
    return false;
  }, [fetchTeamsStatus, hasTeams]);

  useEffect(() => {
    fetchTeams(session?.user.access_token ?? "");
  }, [session?.user.access_token]);

  return (
    <Dialog open={modalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select your Team</DialogTitle>
          <DialogDescription>
            Choose one of your teams to work on
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {hasTeams && <TeamsList teams={teams} onSelectTeam={setTeamId} />}
          {showNoTeamsAlert && (
            <Alert variant="destructive">
              You don't have teams configured, please consider contact the app
              administrator.{" "}
              <Button
                variant="link"
                onClick={() => fetchTeams(session?.user.access_token ?? "")}
              >
                Try again
              </Button>
            </Alert>
          )}
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
