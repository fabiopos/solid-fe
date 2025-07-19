import { createStore } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Store, StoreState } from "../types/store";
import { createSessionSlice } from "./session/session-slice";
import { createTeamSlice } from "./team/team-slice";
import { createSeasonSlice } from "./season/season-slice";
import { createPlayerSlice } from "./player/player-slice";

//import { createCartSlice } from "./cart-slice";

const defaultState: StoreState = {
  isSignedIn: false,
  user: undefined,
  selectedTeamId: undefined,
  teams: [],
  tree: [],
  fieldPositions: [],
  players: [],
  onlyActive: true,
  selectedPlayer: null,
  tab: "all",
};

export const createSolidStore = (
  initialState: Partial<StoreState> = defaultState
) =>
  createStore<Store>()(
    devtools(
      persist(
        subscribeWithSelector(
          immer((...a) => ({
            ...createSessionSlice(...a),
            ...createTeamSlice(...a),
            ...createSeasonSlice(...a),
            ...createPlayerSlice(...a),
            ...initialState,
          }))
        ),
        {
          name: "local-storage",
        }
      )
    )
  );
