import { Data } from "effect";

export class NoTokenError extends Data.TaggedError("NoTokenError") {}

export class NoAuthError extends Data.TaggedError("NoAuthError") {}
