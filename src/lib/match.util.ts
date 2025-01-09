import { EmptyMatch } from "@/features/match/domain/match.schema";
import { ApiClient } from "./ApiClient";
import { MatchUpdate } from "@/features/match/application/MatchUpdate";
import { Effect, pipe } from "effect";

export const getScoreFromFormatted = (formattedScore: string | undefined) => {
  const [sHomeScore, sAwayScore] = (formattedScore ?? "").split("");
  const homeScore = sHomeScore ? Number(sHomeScore) : 0;
  const awayScore = sAwayScore ? Number(sAwayScore) : 0;
  return [homeScore, awayScore];
};

export interface UpdateScoreActionProps {
  matchId?: string;
  fScore?: string;
  token?: string;
  onBegin?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}

export const updateScoreAction = async ({
  matchId,
  fScore,
  token,
}: UpdateScoreActionProps) => {
  if (!matchId) return;
  if (!fScore) return;
  if (!token) return;

  const [homeScore, awayScore] = getScoreFromFormatted(fScore);
  const payload = EmptyMatch.make({ homeScore, awayScore });
  const client = new ApiClient();
  const mClient = new MatchUpdate(client);
  return await mClient.updateMatch(matchId, payload, token);
};

export const runUpdateScoreEffect = (props: UpdateScoreActionProps) => {
  const client = new ApiClient();
  const mClient = new MatchUpdate(client);
 

  return pipe(
    props,
    ()=> props.onBegin,
    () => getScoreFromFormatted(props.fScore),
    ([homeScore, awayScore]) => EmptyMatch.make({ homeScore, awayScore }),
    (payload) =>
      Effect.tryPromise({
        try: () => mClient.updateMatch(props.matchId!, payload, props.token!),
        catch: () => Effect.fail("Error"),
      }),
    Effect.matchEffect({
      onSuccess: () => Effect.succeed(props.onSuccess),
      onFailure: () => Effect.fail(props.onError),
    })
  );
};
