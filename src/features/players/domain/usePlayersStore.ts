import { createStore } from "zustand/vanilla";
import { PlayerUpdateType } from "./player.schema";
import { PlayerGet } from "../application/PlayerGet";
import { ApiClient } from "@/lib/ApiClient";
import { PlayerStatus, RequestStatus } from "@/types/types.common";
import { PlayerUpdate } from "../application/PlayerUpdate";
import { PlayerDelete } from "../application/PlayerDelete";
import { FulfilledFieldPosition } from "@/features/fieldPosition/domain/field-position.schema";
import { FulfilledPlayer } from "./player.effect.schema";

export type PlayersStoreState = {
  fetchPlayersStatus: RequestStatus;
  playerStatusUpdate: { id: string | null; status: RequestStatus };
  playerStatusDelete: { id: string | null; status: RequestStatus };
  error: string | null;
  players: FulfilledPlayer[];
  allFieldPositions: FulfilledFieldPosition[];
  selectedPlayer: FulfilledPlayer | null;
};
export type PlayersStoreActions = {
  fetchPlayers(teamId: string, access_token: string): Promise<void>;
  updatePlayer(
    playerId: string,
    player: PlayerUpdateType,
    access_token: string
  ): Promise<void>;
  setPlayerStatus(playerId: string, playerStatus: PlayerStatus): void;
  setPlayerInactive(playerId: string, active: boolean): void;
  setSelectedPlayer(player: FulfilledPlayer | null): void;
  updateSelectedPlayer(player: FulfilledPlayer): void;
  updateSelectedPlayerPositions(newPositions: string[]): void;
  deletePlayer(playerId: string, token: string): Promise<void>;
  patchPlayerFieldPositions(token: string): Promise<void>;
};

export type PlayersStore = PlayersStoreState & PlayersStoreActions;

const defaultInitState: PlayersStoreState = {
  players: [],
  fetchPlayersStatus: "IDLE",
  error: null,
  playerStatusUpdate: { id: null, status: "IDLE" },
  playerStatusDelete: { id: null, status: "IDLE" },
  allFieldPositions: [],
  selectedPlayer: null,
};
export const makePlayersStore = (
  initState: PlayersStoreState = defaultInitState
) => {
  return createStore<PlayersStore>()((set, get) => ({
    ...initState,
    async fetchPlayers(teamId, access_token) {
      set(() => ({ fetchPlayersStatus: "IN_PROGRESS" }));

      const client = new PlayerGet(new ApiClient());

      try {
        const result = await client.getAllPlayers(teamId, access_token);
        set(() => ({
          fetchPlayersStatus: "DONE",
          players: result,
        }));

        return;
      } catch (error) {
        if (error instanceof Error)
          set(() => ({ fetchPlayersStatus: "ERROR", error: error.message }));
        else
          set(() => ({
            fetchPlayersStatus: "ERROR",
            error: "Something is wrong!",
          }));
      }
    },
    setPlayerStatus(playerId: string, playerStatus: PlayerStatus) {
      const players = get().players;

      set(() => ({
        players: players.map((p) => {
          if (p.id === playerId) return { ...p, status: playerStatus };
          return p;
        }),
      }));
    },
    setPlayerInactive(playerId: string, active: boolean) {
      const players = get().players;

      set(() => ({
        players: players.map((p) => {
          if (p.id === playerId) return { ...p, active };
          return p;
        }),
      }));
    },
    async updatePlayer(
      playerId: string,
      player: PlayerUpdateType,
      token: string
    ) {
      set(() => ({
        playerStatusUpdate: { id: playerId, status: "IN_PROGRESS" },
      }));
      const client = new PlayerUpdate(new ApiClient());
      await client.editPlayer(playerId, player, token);
      set(() => ({
        playerStatusUpdate: { id: playerId, status: "DONE" },
      }));
    },
    async deletePlayer(pid, token) {
      const allPlayers = get().players;
      set(() => ({ playerStatusDelete: { id: pid, status: "IN_PROGRESS" } }));
      const api = new PlayerDelete(new ApiClient());
      const result = await api.deletePlayer(pid, token);

      if (result) {
        set(() => ({ players: allPlayers.filter((x) => x.id !== pid) }));
      }

      set(() => ({
        playerStatusDelete: { id: pid, status: result ? "DONE" : "ERROR" },
      }));
    },
    setSelectedPlayer(player) {
      set(() => ({ selectedPlayer: player }));
    },
    updateSelectedPlayer(player) {
      const players = get().players;
      set(() => ({
        players: players.map((p) => {
          if (p.id === player.id) return player;
          return p;
        }),
      }));
    },
    updateSelectedPlayerPositions(newPositions) {
      const player = get().selectedPlayer;
      if (!player) return;
      set(() => ({
        selectedPlayer: {
          ...player,
          playerPositions: newPositions.map((x) => ({
            fieldPosition: { id: FulfilledFieldPosition.make({ id: x }).id },
          })),
        },
      }));
    },
    async patchPlayerFieldPositions(token) {
      const player = get().selectedPlayer;
      if (!player || !player.id) return;
      const client = new PlayerUpdate(new ApiClient());

      set(() => ({
        playerStatusUpdate: { id: player.id!, status: "IN_PROGRESS" },
      }));

      await client.updatePlayerPositions(
        player.id!,
        player.favPosition?.id ?? "",
        (player.playerPositions ?? []).map((x) => x.fieldPosition?.id ?? ""),
        token
      );
      get().setSelectedPlayer(null);

      // if (player.team?.id) get().fetchPlayers(player.team.id, token);
      set(() => ({
        players: get().players.map((p) => {
          if (p.id === player.id) return player;
          return p;
        }, {}),
        playerStatusUpdate: { id: player.id!, status: "DONE" },
      }));
    },
  }));
};
