import {
  decodeFulfilledPlayer,
  decodePWS,
  EmptyPlayer,
  encodePWS,
  FulfilledPlayer,
  FulfilledPlayerWithStats,
} from "@/features/players/domain/player.effect.schema";
import {
  FetchError,
  FileError,
  JsonError,
} from "@/services/http/errors/http.errors";
import {
  fetchReq,
  fetchRequest,
  getDefaultOptions,
} from "@/services/http/program/http.program";
import { ParseError } from "@effect/schema/ParseResult";
import { Console, Context, Effect } from "effect";
import { ConfigError } from "effect/ConfigError";
import { parseJson } from "../common";
import { PlayerUpdateType } from "@/features/players/domain/player.schema";
import { createSupaBrowserClient } from "@/lib/supabase.client";
import { SupabaseClient } from "@supabase/supabase-js";

export type GetPWSParams = {
  teamId: string;
  token?: string;
};

export type PATCHPlayerParams = {
  id: string;
  player: PlayerUpdateType;
  token?: string;
};

export type CREATEPlayerPayload = {
  player: EmptyPlayer;
};

export type UPLOADAvatarPayload = {
  pid: string;
  file: File;
};

export type DELETEPlayerParams = {
  id: string;
  token?: string;
};

export type PlayerApiLiveParams = {
  token?: string;
};

export type UpdateFieldPositionsParams = {
  pid: string;
  body: { favPositionId: string; fieldPositions: string[] };
};

interface PlayerApiImpl {
  readonly getPlayerWS: (
    teamId: string
  ) => Effect.Effect<
    FulfilledPlayerWithStats[],
    FetchError | JsonError | ParseError | ConfigError,
    never
  >;
  readonly updateFieldPositions: (
    params: UpdateFieldPositionsParams
  ) => Effect.Effect<
    void,
    FetchError | JsonError | ParseError | ConfigError,
    never
  >;

  readonly updatePlayer: (
    params: PATCHPlayerParams
  ) => Effect.Effect<
    void,
    FetchError | JsonError | ParseError | ConfigError,
    never
  >;

  readonly deletePlayer: (
    params: DELETEPlayerParams
  ) => Effect.Effect<
    void,
    FetchError | JsonError | ParseError | ConfigError,
    never
  >;

  readonly createPlayer: (
    params: CREATEPlayerPayload
  ) => Effect.Effect<
    FulfilledPlayer,
    FetchError | JsonError | ParseError | ConfigError,
    never
  >;

  readonly uploadAvatar: (
    params: UPLOADAvatarPayload
  ) => Effect.Effect<string, FileError, never>;
}

export class PlayerApi extends Context.Tag("PlayerApi")<
  PlayerApi,
  PlayerApiImpl
>() {
  static readonly Live = (liveParams: PlayerApiLiveParams) =>
    PlayerApi.of({
      getPlayerWS: (teamId) =>
        Effect.gen(function* () {
          const endpoint = `/player/${teamId}/with-stats`;

          const json = yield* fetchRequest({ endpoint });

          const players = yield* parseJson(json);

          const pws = yield* Effect.forEach((a) => decodePWS(a))(players);

          const encodedPWS = yield* Effect.forEach((a) => encodePWS(a))(pws);

          return encodedPWS as FulfilledPlayerWithStats[];
        }),
      updateFieldPositions: (req) =>
        Effect.gen(function* () {
          const endpoint = `/player/${req.pid}/field-positions`;
          const options = yield* getDefaultOptions("PATCH", liveParams.token);
          options.body = JSON.stringify(req.body);
          const response = yield* fetchReq({ endpoint, options });
          if (!response.ok) {
            return yield* new FetchError();
          }
        }),
      updatePlayer: (params) =>
        Effect.gen(function* () {
          const endpoint = `/player/${params.id}`;
          const options = yield* getDefaultOptions("PATCH", params.token);
          options.body = JSON.stringify(params.player);
          const response = yield* fetchReq({ endpoint, options });

          Console.log("PATCH", endpoint, options.body);

          if (!response.ok) return yield* new FetchError();

          return response;
        }),
      deletePlayer: (params) =>
        Effect.gen(function* () {
          const endpoint = `/player/${params.id}`;
          const options = yield* getDefaultOptions("DELETE", params.token);
          const response = yield* fetchReq({ endpoint, options });
          if (!response.ok) {
            return yield* new FetchError();
          }
          return response;
        }),
      createPlayer: (params) =>
        Effect.gen(function* () {
          const endpoint = `/player`;
          const options = yield* getDefaultOptions("POST", "");
          options.body = JSON.stringify(params.player);

          const json = yield* fetchRequest({ endpoint, options });

          const createdPlayer = yield* decodeFulfilledPlayer(json);

          return createdPlayer;
        }),

      uploadAvatar: ({ file, pid }) =>
        Effect.gen(function* () {
          const supabase = createSupaBrowserClient();

          if (file.size > 0) {
            const extension = file.name.split(".").pop();
            const fileName = `avatar_${pid}.${extension}`;

            const { error } = yield* uploadAvatar({ supabase, file, fileName });

            if (error) return yield* Effect.fail(new FileError());

            return `https://tvefqfrpvwacsfdyfked.supabase.co/storage/v1/object/public/assets/${fileName}`;
          }

          return yield* Effect.fail(new FileError());
        }),
    });
}

const uploadAvatar = ({
  supabase,
  fileName,
  file,
}: {
  supabase: SupabaseClient;
  fileName: string;
  file: File;
}) =>
  Effect.promise(() =>
    supabase.storage.from("assets").upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    })
  );
