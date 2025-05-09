import {createStore} from "zustand/vanilla";
import {persist} from "zustand/middleware";
import {PlayerUpdateType} from "./player.schema";
import {PlayerGet} from "../application/PlayerGet";
import {ApiClient} from "@/lib/ApiClient";
import {PlayerStatus, RequestStatus} from "@/types/types.common";
import {PlayerUpdate} from "../application/PlayerUpdate";
import {PlayerDelete} from "../application/PlayerDelete";
import {FulfilledFieldPosition} from "@/features/fieldPosition/domain/field-position.schema";
import {FulfilledPlayerWithStats} from "./player.effect.schema";
import {Record} from "effect";

export type PlayersStoreState = {
    teamId: string;
    fetchPlayersStatus: RequestStatus;
    playerStatusUpdate: { id: string | null; status: RequestStatus };
    playerStatusDelete: { id: string | null; status: RequestStatus };
    error: string | null;
    players: FulfilledPlayerWithStats[];
    allFieldPositions: FulfilledFieldPosition[];
    selectedPlayer: FulfilledPlayerWithStats | null;
    tab: string;
    filteredPlayers: Record<string, FulfilledPlayerWithStats[]>;
    categories: string[];
    lineup: Record<string, FulfilledPlayerWithStats | null>;
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
    setFavPosition(favPositionId: string): void;
    setSelectedPlayer(player: FulfilledPlayerWithStats | null): void;
    updateSelectedPlayer(player: FulfilledPlayerWithStats): void;
    updateSelectedPlayerPositions(newPositions: string[]): void;
    deletePlayer(playerId: string, token: string): Promise<void>;
    patchPlayerFieldPositions(token: string): Promise<void>;
    setTab(tab: string): void;
    refreshFilteredPlayers(players: FulfilledPlayerWithStats[]): Promise<void>;
    assignPlayerToPosition(positionId: string, player: FulfilledPlayerWithStats | null): void;
    resetLineup(): void;
};

export type PlayersStore = PlayersStoreState & PlayersStoreActions;

const defaultInitState: PlayersStoreState = {
    teamId: "",
    players: [],
    fetchPlayersStatus: "IDLE",
    error: null,
    playerStatusUpdate: {id: null, status: "IDLE"},
    playerStatusDelete: {id: null, status: "IDLE"},
    allFieldPositions: [],
    selectedPlayer: null,
    tab: "all",
    filteredPlayers: {all: []},
    categories: [],
    lineup: {},
};
export const makePlayersStore = (
    initState: PlayersStoreState = defaultInitState
) => {
    return createStore<PlayersStore>()(
        persist(
            (set, get) => ({
                ...initState,
                ...(typeof window !== "undefined" && localStorage.getItem("lineup-create"))
                    ? JSON.parse(<string>localStorage.getItem("lineup-create"))
                    : {},
                setTab(tab: string) {
                    set(() => ({tab}));
                },
                assignPlayerToPosition: (positionId, player) =>
                    set((state) => ({
                        lineup: {
                            ...state.lineup,
                            [positionId]: player,
                        },
                    })),
                resetLineup: () => set(() => ({lineup: {}})),
                async fetchPlayers(teamId, access_token) {
                    set(() => ({fetchPlayersStatus: "IN_PROGRESS"}));
                    const client = new PlayerGet(new ApiClient());
                    try {
                        const result = await client.getAllPlayersWithStats(
                            teamId,
                            access_token
                        );
                        set(() => ({
                            fetchPlayersStatus: "DONE",
                            players: result,
                        }));
                        get().refreshFilteredPlayers(result);
                        return;
                    } catch (error) {
                        if (error instanceof Error)
                            set(() => ({
                                fetchPlayersStatus: "ERROR",
                                error: error.message,
                            }));
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
                            if (p.id === playerId)
                                return {
                                    ...p,
                                    status: playerStatus,
                                };
                            return p;
                        }),
                    }));
                },
                setPlayerInactive(playerId: string, active: boolean) {
                    const players = get().players;
                    set(() => ({
                        players: players.map((p) => {
                            if (p.id === playerId) return {...p, active};
                            return p;
                        }),
                    }));
                },
                setFavPosition(favPositionId: string) {
                    const player = get().selectedPlayer;
                    if (!player) return;
                    set(() => ({
                        selectedPlayer: {
                            ...player,
                            favPositionId,
                        },
                    }));
                },
                async updatePlayer(
                    playerId: string,
                    player: PlayerUpdateType,
                    token: string
                ) {
                    set(() => ({
                        playerStatusUpdate: {id: playerId, status: "IN_PROGRESS"},
                    }));
                    const client = new PlayerUpdate(new ApiClient());
                    await client.editPlayer(playerId, player, token);
                    set(() => ({
                        playerStatusUpdate: {id: playerId, status: "DONE"},
                    }));
                },
                async deletePlayer(pid, token) {
                    const allPlayers = get().players;
                    set(() => ({
                        playerStatusDelete: {id: pid, status: "IN_PROGRESS"},
                    }));
                    const api = new PlayerDelete(new ApiClient());
                    const result = await api.deletePlayer(pid, token);
                    if (result) {
                        set(() => ({
                            players: (allPlayers ?? []).filter((x) => x.id !== pid),
                        }));
                    }
                    set(() => ({
                        playerStatusDelete: {id: pid, status: result ? "DONE" : "ERROR"},
                    }));
                },
                setSelectedPlayer(player) {
                    set(() => ({selectedPlayer: player}));
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
                                fieldPosition: {id: FulfilledFieldPosition.make({id: x}).id},
                            })),
                        },
                    }));
                },
                async patchPlayerFieldPositions(token) {
                    const player = get().selectedPlayer;
                    if (!player || !player.id) return;
                    const client = new PlayerUpdate(new ApiClient());
                    set(() => ({
                        playerStatusUpdate: {id: player.id!, status: "IN_PROGRESS"},
                    }));
                    await client.updatePlayerPositions(
                        player.id!,
                        player.favPositionId ?? "",
                        (player.playerPositions ?? []).map((x) => x.fieldPosition?.id ?? ""),
                        token
                    );
                    get().setSelectedPlayer(null);
                    const updatedPlayers = get().players.map((p) => {
                        if (p.id === player.id) return player;
                        return p;
                    }, {});
                    set(() => ({
                        players: updatedPlayers,
                        playerStatusUpdate: {id: player.id!, status: "DONE"},
                    }));
                },
                refreshFilteredPlayers: async (players) => {
                    const categories = get().categories;
                    const filteredPlayers = categories.reduce(
                        (acc, category) => ({
                            ...acc,
                            [category]: players.filter(
                                (player) =>
                                    player.favPosition?.category === category ||
                                    (player.playerPositions ?? []).some(
                                        (pos) => pos.fieldPosition?.category === category
                                    )
                            ),
                        }),
                        {}
                    );
                    set(() => ({filteredPlayers}));
                },
            }),
            {
                name: "lineup-create",
                partialize: (state) => ({lineup: state.lineup, teamId: state.teamId}),
            }
        )
    );
};
