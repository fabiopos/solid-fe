import { useAuthStore } from "@/context/AuthCtx";

export const useTeamId = () => {
  const { accountData } = useAuthStore((state) => state);
  const teamId = accountData.selectedTeamId;
  return teamId;
};
