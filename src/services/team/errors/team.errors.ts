import { Data } from "effect";

export class TeamNotFoundError extends Data.TaggedError("TeamNotFoundError") {}
export class TeamNotValidError extends Data.TaggedError("TeamNotValidError") {}
