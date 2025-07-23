import { Store } from "@/types/store";
import { RequestStatus } from "@/types/types.common";
import { StateCreator } from "zustand";

interface NewPlayer {
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
  shirtNumber?: string;
  shirtSize?: string;
  nameOnShirt?: string;
  height?: string;
  weight?: string;
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
};
export type PlayerInviteActions = {
  setNextStep: () => void;
  setPrevStep: () => void;
  setNewPlayer: (newPlayer: NewPlayer) => void;
  reset: () => void;
};

export type PlayerInviteSlice = PlayerInviteState & PlayerInviteActions;

const defaultState: PlayerInviteState = {
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
    height: "",
    riskInsurance: "",
    email: "",
    nameOnShirt: "",
    shirtNumber: "",
    shirtSize: "",
    weight: "",
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
});
