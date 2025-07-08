export enum ShirtSize {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export enum DocumentType {
  CC = "CC",
  CE = "CE",
  TI = "TI",
  PP = "PP",
  OTHER = "OTHER",
}

export enum DominantFoot {
  RIGHT = "right",
  LEFT = "left",
  BOTH = "both",
}

export enum PlayerStatus {
  OK = "OK",
  INJURIED = "INJURIED",
  DOWN = "DOWN",
}

export type PlayerActiveStatus = "active" | "inactive";
