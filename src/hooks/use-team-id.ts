import { useAuthStore } from "@/context/AuthCtx";
import { useMemo } from "react";

export const useTeamId = () => {
  const { accountData } = useAuthStore((state) => state);
  const teamId = accountData.selectedTeamId;
  return teamId;
};

export const useSelectedTeam = () => {
  const { accountData, fetchTeamsStatus } = useAuthStore((state) => state);

  const teamId = useMemo(() => accountData.selectedTeamId, [accountData]);

  const selectedTeam = useMemo(() => {
    if (fetchTeamsStatus === "IN_PROGRESS") return null;
    console.log(accountData)
    return (accountData.teams).find((x) => x.id === teamId);
  }, [accountData, teamId, fetchTeamsStatus]);

  console.log(accountData, selectedTeam)

  return selectedTeam;
};
