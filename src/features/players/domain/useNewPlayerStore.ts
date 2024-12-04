import { createStore } from "zustand/vanilla";
import {
  isValidEmail,
  isValidHeight,
  isValidShirtNumber,
  isValidWeight,
} from "./player.schema";
import { EmptyPlayer } from "./player.effect.schema";
import { DocumentType } from "@/shared/enums/playerEnums";
import { DominantFoot, ShirtSize } from "@/types/types.common";
import { PlayerCreate } from "../application/PlayerCreate";
import { ApiClient } from "@/lib/ApiClient";

type NewPlayerStep = 1 | 2 | 3;

const MAX_STEP = 3;

export type NewPlayerStoreState = {
  step: NewPlayerStep;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  birthDate: Date | null;
  email: string;
  nameOnShirt: string;
  numberOnShirt: string | undefined;
  shirtSize: string;
  favPosition: string;
  height: string;
  weight: string;
  healthProvider: string;
  riskInsurance: string;
  teamId: string;
  dominantFoot: DominantFoot;
  address: string;
  avatarUrl: string;
  phone: string;
  city: string;
  country: string;
  isValidEmail: boolean;
  isValidNumberOnShirt: boolean;
  isValidHeight: boolean;
  isValidWeight: boolean;
};
export type NewPlayerStoreActions = {
  nextStep: () => void;
  prevStep: () => void;
  setBirthDate: (value: Date | null) => void;
  setDocumentNumber: (value: string) => void;
  setDocumentType: (value: string) => void;
  setEmail: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setNameOnShirt: (value: string) => void;
  setNumberOnShirt: (value: string) => void;
  setHeight: (value: string) => void;
  setWeight: (value: string) => void;
  setHealthProvider: (value: string) => void;
  setRiskInsurance: (value: string) => void;
  setFavFieldPosition: (value: string) => void;
  setShirtSize: (value: string) => void;
  reset: () => void;
  postPlayer: (token: string) => Promise<void>;
};

export type NewPlayerStore = NewPlayerStoreState & NewPlayerStoreActions;

const defaultInitState: NewPlayerStoreState = {
  step: 1,
  birthDate: null,
  documentNumber: "",
  documentType: "",
  email: "",
  firstName: "",
  lastName: "",
  nameOnShirt: "",
  healthProvider: "",
  height: "",
  numberOnShirt: undefined,
  riskInsurance: "",
  weight: "",
  favPosition: "",
  shirtSize: "M",
  isValidEmail: false,
  isValidNumberOnShirt: false,
  isValidHeight: false,
  isValidWeight: false,
  teamId: "",
  dominantFoot: DominantFoot.RIGHT,
  address: "",
  avatarUrl: "",
  phone: "",
  city: "",
  country: "",
};

export const makeNewPlayerStore = (
  initState: NewPlayerStoreState = defaultInitState
) => {
  return createStore<NewPlayerStore>()((set, get) => ({
    ...initState,
    nextStep: () => {
      const nextStep = (get().step + 1) as NewPlayerStep;
      if (nextStep > MAX_STEP && nextStep > 0) return;
      set(() => ({ step: nextStep }));
    },
    prevStep: () => {
      const prevStep = (get().step - 1) as NewPlayerStep;
      if (prevStep < 0) return;
      set(() => ({ step: prevStep }));
    },
    setBirthDate: (birthDate) => {
      set(() => ({ birthDate }));
    },
    setDocumentNumber: (documentNumber) => {
      set(() => ({ documentNumber }));
    },
    setDocumentType: (documentType) => {
      set(() => ({ documentType }));
    },
    setEmail: (email) => {
      const result = isValidEmail.safeParse(email);
      set(() => ({ email, isValidEmail: result.success }));
    },
    setFirstName: (firstName) => {
      set(() => ({ firstName }));
    },
    setLastName: (lastName) => {
      set(() => ({ lastName }));
    },
    setNameOnShirt: (value: string) => {
      set(() => ({ nameOnShirt: value }));
    },
    setNumberOnShirt: (value: string) => {
      const result = isValidShirtNumber.safeParse(Number(value));
      // todo: Validate if number is already used
      set(() => ({
        numberOnShirt: value.toString(),
        isValidNumberOnShirt: result.success,
      }));
    },
    setHeight: (value: string) => {
      const result = isValidHeight.safeParse(Number(value));
      set(() => ({ height: value, isValidHeight: result.success }));
    },
    setWeight: (value: string) => {
      const result = isValidWeight.safeParse(Number(value));
      set(() => ({ weight: value, isValidWeight: result.success }));
    },
    setHealthProvider: (value: string) => {
      set(() => ({ healthProvider: value }));
    },
    setRiskInsurance: (value: string) => {
      set(() => ({ riskInsurance: value }));
    },
    setFavFieldPosition: (value: string) => {
      set(() => ({ favPosition: value }));
    },
    setShirtSize: (value: string) => {
      set(() => ({ shirtSize: value }));
    },
    reset: () => {
      set(() => ({ ...defaultInitState }));
    },
    postPlayer: async (token) => {
      const documentNumber = get().documentNumber;
      const documentType = get().documentType as unknown as DocumentType;
      const teamId = get().teamId;
      const firstName = get().firstName;
      const lastName = get().lastName;
      const email = get().email;
      const shirtSize = get().shirtSize as unknown as ShirtSize;
      const shirtNumber = Number(get().numberOnShirt);
      const shirtName = get().nameOnShirt;
      const dominantFoot = get().dominantFoot as unknown as DominantFoot;
      const favPositionId = get().favPosition;
      const favPosition = get().favPosition;
      const address = get().address;
      const avatarUrl = get().avatarUrl;
      const phone = get().phone;
      const city = get().city;
      const country = get().country;
      const eps = get().healthProvider;
      const arl = get().riskInsurance;
      const weight = Number(get().weight);
      const height = Number(get().height);

      const emptyPlayer = EmptyPlayer.make({
        documentNumber,
        documentType,
        teamId,
        firstName,
        lastName,
        email,
        shirtSize,
        shirtNumber,
        shirtName,
        dominantFoot,
        favPositionId,
        favPosition: { id: favPosition },
        address,
        avatarUrl,
        phone,
        city,
        country,
        eps,
        arl,
        weight,
        height,
      });

      const clientCreate = new PlayerCreate(new ApiClient())
      await clientCreate.createNewPlayer(emptyPlayer, token)
    },
  }));
};
