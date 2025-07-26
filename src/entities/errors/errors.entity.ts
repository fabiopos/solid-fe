import { Data } from "effect";

export class FetchError extends Data.TaggedError("FetchError")<{
  message?: string;
}> {}
export class JsonError extends Data.TaggedError("JsonError") {}
export class FileError extends Data.TaggedError("FileError") {}
export class InvalidCredsError extends Data.TaggedError("InvalidCredsError") {}
export class NoTeamIdError extends Data.TaggedError("NoTeamIdError") {}
export class NoSessionError extends Data.TaggedError("NoSessionError") {}
