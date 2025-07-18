import { Team } from "./types.common";

export interface PrivateLayoutData {
  teams: Team[] | undefined;
  tree: unknown;
  isTeamSelected: boolean;
  selectedTeam: Team | undefined;
  selectedTeamId: string | undefined;
  error: string | undefined;
  token: string | undefined;
  isSignedIn: boolean;
}
