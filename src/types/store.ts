import { TeamSlice, TeamState } from "@/stores/team/team-slice";
import { SessionSlice, SessionState } from "../stores/session/session-slice";
import { SeasonSlice, SeasonState } from "@/stores/season/season-slice";
//import { UserSlice } from '@/store/user-slice';

export type Store = SessionSlice & TeamSlice & SeasonSlice;

export type StoreState = SessionState & TeamState & SeasonState;
