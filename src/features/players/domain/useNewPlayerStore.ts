import { createStore } from "zustand/vanilla";
import {
  isValidEmail,
  isValidHeight,
  isValidShirtNumber,
  isValidWeight,
} from "./player.schema";

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
  }));
};
