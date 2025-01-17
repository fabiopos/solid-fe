import { MatchDeleteError } from "@/exceptions/MatchExceptions";
import { MatchDelete } from "@/features/match/application/MatchDelete";
import { ApiClient } from "@/lib/ApiClient";
import { Effect, pipe } from "effect";

interface MatchDeleteProps {
  token: string;
  matchId: string;
}
export function deleteMatchAct(props: MatchDeleteProps) {
  const client = new MatchDelete(new ApiClient()); 
  
  return pipe(
    props,
    (matchProps) =>
      Effect.tryPromise({
        try: () => client.deleteMatch(matchProps.matchId, matchProps.token),
        catch: () => new MatchDeleteError("Error deleting match"),
      }),
    Effect.matchEffect({
      onFailure: Effect.fail,
      onSuccess: (a) => a.ok ? Effect.succeed(a) : Effect.fail(new MatchDeleteError(a.statusText)),
    })
  );
}
