import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import { toDate } from "date-fns";
import { Effect as E, pipe } from "effect";

export const getFirstName = (player: FulfilledPlayer | undefined): string => {
  return pipe(
    player,
    (p) => p?.firstName,
    (name) => name?.split(" "),
    (name) => name?.[0] ?? ""
  );
};

export const getLastName = (player: FulfilledPlayer) => {
  return pipe(
    player,
    (p) => p?.lastName,
    (name) => name?.split(" "),
    (name) => name?.[0] ?? ""
  );
};

export const refineDate = (date: string | Date | null | undefined) => {
  return date ? toDate(date) : null;
};
