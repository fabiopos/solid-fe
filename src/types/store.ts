import { TeamSlice, TeamState } from "@/stores/team/team-slice";
import { SessionSlice, SessionState } from "../stores/session/session-slice";
import { SeasonSlice, SeasonState } from "@/stores/season/season-slice";
import { PlayerSlice, PlayerState } from "@/stores/player/player-slice";
import {
  PlayerInviteSlice,
  PlayerInviteState,
} from "@/stores/player/playerInvite-slice";
//import { UserSlice } from '@/store/user-slice';

export type Store = SessionSlice &
  TeamSlice &
  SeasonSlice &
  PlayerSlice &
  PlayerInviteSlice;

export type StoreState = SessionState &
  TeamState &
  SeasonState &
  PlayerState &
  PlayerInviteState;
