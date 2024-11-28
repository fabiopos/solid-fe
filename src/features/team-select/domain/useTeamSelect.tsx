import { setCookieTeamId } from "@/app/actions";
import { useAuthStore } from "@/context/AuthCtx";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

export const useTeamSelect = () => {
  const pathName = usePathname();
  const { status } = useSession();
  const { accountData, setTeamId, fetchTeams, session, fetchTeamsStatus } =
    useAuthStore((state) => state);
  const teams = useMemo(() => accountData.teams, [accountData]);
  const hasTeams = useMemo(() => teams.length > 0, [teams]);
  const teamsCount = useMemo(() => (teams ?? []).length, [teams]);

  const isModalOpen = useMemo(() => {
    if (pathName === "/login") return false;
    if (status === "loading") return false;
    if (fetchTeamsStatus === "IN_PROGRESS") return false;
    return !accountData.selectedTeamId || !!session?.user;
  }, [
    accountData.selectedTeamId,
    session?.user,
    status,
    fetchTeamsStatus,
    pathName,
  ]);

  // console.log(isModalOpen, { selectedTeamId: accountData.selectedTeamId, user: !!session?.user })

  const showNoTeamsAlert = useMemo(() => {
    if (status === "loading" || status === "unauthenticated") return false;
    if (fetchTeamsStatus === "DONE" && !hasTeams) return true;
    return false;
  }, [fetchTeamsStatus, hasTeams, status]);

  const onTryAgainClick = useCallback(() => {
    fetchTeams(session?.user.access_token ?? "");
  }, [fetchTeams, session?.user.access_token]);

  const onSelectTeam = useCallback((id: string) => setTeamId(id), [setTeamId]);

  const handleSelectTeam = useCallback((teamId: string) => {
    setCookieTeamId(teamId);
    setTeamId(teamId);
  }, []);

  // if one team - then autoselect this team
  useEffect(() => {
    if (teamsCount === 1) handleSelectTeam(teams[0].id);
  }, [teamsCount]);

  useEffect(() => {
    fetchTeams(session?.user.access_token ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.access_token]);

  return {
    isModalOpen,
    showNoTeamsAlert,
    teams,
    teamsCount,
    onTryAgainClick,
    onSelectTeam,
    hasTeams,
  };
};
