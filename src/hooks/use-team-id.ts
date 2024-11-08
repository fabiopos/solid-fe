import { useAuthStore } from "@/context/AuthCtx";

export const useTeamId = () => {
  const { accountData } = useAuthStore((state) => state);
  const teamId = accountData.selectedTeamId;
  return teamId;
};

export const useSelectedTeam = () => {
  const { accountData } = useAuthStore((state) => state);
  const teamId = accountData.selectedTeamId;
  const selectedTeam = (accountData.teams ?? []).find((x) => x.id === teamId);
  return selectedTeam;
};
