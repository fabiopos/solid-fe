import { Console, Effect, pipe } from "effect";
import { CREATEPlayerPayload, PlayerApi } from "./player.api";
import { uploadAvatar } from "./avatar.upload.service";
import { EmptyPlayer } from "@/features/players/domain/player.effect.schema";
import { updatePlayer } from "./player.update.service";

/**
 * Creates a new player using the provided parameters.
 *
 * This function is a generator-based effect that interacts with the Player API
 * to create a player. It expects a payload containing the necessary player data,
 * and optionally a token for authentication.
 *
 * @param params - The payload for creating a player, which includes all required player fields
 *   and an optional authentication token.
 * @returns An Effect that, when executed, creates a player and yields the result.
 */
const runnableCreatePlayer = (
  params: CREATEPlayerPayload & { token?: string }
) =>
  Effect.gen(function* () {
    const playerApi = yield* PlayerApi;
    const program = playerApi.createPlayer(params);
    return yield* program;
  });

export const createPlayer = (
  params: CREATEPlayerPayload & { token?: string }
) =>
  runnableCreatePlayer(params).pipe(
    Effect.provideService(PlayerApi, PlayerApi.Live({ token: params.token }))
  );

export const createNewPlayerWithAvatar = ({
  file,
  onFailure,
  onSuccess,
  player,
}: {
  player: EmptyPlayer;
  file: File | undefined;
  onSuccess: () => void;
  onFailure: () => void;
}) =>
  pipe(
    createPlayer({ player }),
    Effect.map(({ id: pid }) =>
      uploadAvatar({ pid: pid!, file: file! }).pipe(
        Effect.map((avatarUrl) => Effect.succeed({ avatarUrl, pid })),
        Effect.tapError(Console.log),
        Effect.flatten
      )
    ),
    Effect.tap(Console.log),
    Effect.flatten,
    Effect.map(({ avatarUrl, pid }) =>
      Effect.runPromise(
        updatePlayer({ id: pid!, player: { avatarUrl }, token: "" })
      )
    ),
    Effect.tapBoth({
      onSuccess: () => Effect.sync(() => onSuccess()),
      onFailure: () => Effect.sync(() => onFailure()),
    })
  );
