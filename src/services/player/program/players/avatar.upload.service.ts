import { Effect } from "effect";
import { PlayerApi, UPLOADAvatarPayload } from "./player.api";

const runnableUploadAvatar = (
  params: UPLOADAvatarPayload & { token?: string }
) =>
  Effect.gen(function* () {
    const playerApi = yield* PlayerApi;
    const program = playerApi.uploadAvatar(params);
    return yield* program;
  });

export const uploadAvatar = (
  params: UPLOADAvatarPayload & { token?: string }
) =>
  runnableUploadAvatar(params).pipe(
    Effect.provideService(PlayerApi, PlayerApi.Live({ token: params.token }))
  );
