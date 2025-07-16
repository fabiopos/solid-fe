import { useSolidStore } from "@/providers/store.provider";

export function useTree() {
  const tree = useSolidStore((state) => state.tree);
  return tree;
}

export function useMyRivals() {
  const myRivals = useSolidStore((state) =>
    state.teams.filter((x) => !x.hasSubscription)
  );
  return myRivals;
}

export function useMyTeams() {
  const myTeams = useSolidStore((state) =>
    state.teams.filter((x) => x.hasSubscription)
  );
  return myTeams;
}

export function useSelectedTeam() {
  const selectedTeam = useSolidStore((state) =>
    state.teams.find((x) => x.id === state.selectedTeamId)
  );
  return selectedTeam;
}

export function useAppSidebar() {
  const { selectedTeamId, teams } = useSolidStore((state) => state);
  const tree = useTree();

  const myTeams = teams.filter((x) => x.hasSubscription);
  const selectedTeam = myTeams.find((x) => x.id === selectedTeamId);

  return { tree, selectedTeam, myTeams };
}
