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
  const allTeams = useMemo(() => accountData.teams ?? [], [accountData.teams]);

  const myTeams = useMemo(() => {
    return allTeams.filter((x) => x.hasSubscription);
  }, [allTeams]);

  const hasTeams = useMemo(() => myTeams.length > 0, [myTeams]);
  const teamsCount = useMemo(() => (myTeams ?? []).length, [myTeams]);

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

  console.log(fetchTeamsStatus, allTeams, accountData);
  // console.log(isModalOpen, { selectedTeamId: accountData.selectedTeamId, user: !!session?.user })

  const showNoTeamsAlert = useMemo(() => {
    if (status === "loading" || status === "unauthenticated") return false;
    if (fetchTeamsStatus === "DONE" && !hasTeams) return true;
    return false;
  }, [fetchTeamsStatus, hasTeams, status]);

  const onTryAgainClick = useCallback(() => {
    fetchTeams(session?.user.access_token ?? "");
  }, [fetchTeams, session?.user.access_token]);

  const onSelectTeam = useCallback(
    (id: string) => {
      setTeamId(id);
      setCookieTeamId(id);
    },
    [setTeamId, setCookieTeamId]
  );

  // if one team - then autoselect this team
  // useEffect(() => {
  //   if (myTeams.length === 1) handleSelectTeam(myTeams[0].id);
  // }, [myTeams]);

  useEffect(() => {
    fetchTeams(session?.user.access_token ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.access_token]);

  return {
    isModalOpen,
    showNoTeamsAlert,
    allTeams,
    myTeams,
    teamsCount,
    onTryAgainClick,
    onSelectTeam,
    hasTeams,
  };
};
