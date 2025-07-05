import { Team } from "./types.common";

export interface PrivateLayoutData {
  teams: Team[];
  tree: unknown;
  isTeamSelected: boolean;
  selectedTeam: Team | undefined;
  selectedTeamId: string | undefined;
  error: string | undefined;
}
