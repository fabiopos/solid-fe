import { InviteDataSchemaType } from "@/features/players/domain/invite-data.schema";
import { Store } from "@/types/store";
import { RequestStatus, ShirtSize } from "@/types/types.common";
import { StateCreator } from "zustand";

export interface NewPlayer {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  birthDate?: Date | null;
  fieldPositionsIds?: string[];
  favPositionId?: string;
  teamId?: string;
  avatarUrl?: string;
  avatarFile?: File;
  shirtNumber?: number;
  shirtSize?: ShirtSize;
  nameOnShirt?: string;
  height?: number;
  weight?: number;
  country?: string;
  city?: string;
  documentType?: string;
  documentNumber?: string;
  healthProvider?: string;
  riskInsurance?: string;
}

export type PlayerInviteState = {
  step: number;
  newPlayer: NewPlayer | undefined;
  createNewPlayerStatus: RequestStatus;
  inviteData?: InviteDataSchemaType;
};
export type PlayerInviteActions = {
  setNextStep: () => void;
  setPrevStep: () => void;
  setNewPlayer: (newPlayer: NewPlayer) => void;
  setCreateNewPlayerStatus: (status: RequestStatus) => void;
  reset: () => void;
  resetPlayer: () => void;
};

export type PlayerInviteSlice = PlayerInviteState & PlayerInviteActions;

const defaultState: PlayerInviteState = {
  inviteData: undefined,
  newPlayer: {
    avatarUrl: "",
    city: "",
    country: "",
    documentNumber: "",
    documentType: "",
    favPositionId: "",
    healthProvider: "",
    firstName: "",
    lastName: "",
    phone: "",
    height: undefined,
    riskInsurance: "",
    email: "",
    nameOnShirt: "",
    shirtNumber: undefined,
    shirtSize: ShirtSize.M,
    weight: undefined,
  },
  step: 1,
  createNewPlayerStatus: "IDLE",
};

export const createPlayerInviteSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  PlayerInviteSlice
> = (set, _get) => ({
  ...defaultState,
  setNewPlayer: (newPlayer) =>
    set((state) => ({ newPlayer: { ...state.newPlayer, ...newPlayer } })),
  setNextStep: () => set((state) => ({ step: state.step + 1 })),
  setPrevStep: () => set((state) => ({ step: state.step - 1 })),
  reset: () => set(() => defaultState),
  setCreateNewPlayerStatus: (createNewPlayerStatus) =>
    set(() => ({ createNewPlayerStatus })),
  resetPlayer: () =>
    set(() => ({
      newPlayer: defaultState.newPlayer,
      createNewPlayerStatus: "IDLE",
      step: 1,
    })),
});
