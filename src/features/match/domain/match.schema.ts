import { playerSchema } from "@/features/players/domain/player.effect.schema";
import { CompetitionStatusEnum } from "@/shared/enums/competitionStatusEnum";
import * as S from "@effect/schema/Schema";

const matchTeam = S.Struct({
  id: S.optional(S.NullishOr(S.String)),
  name: S.optional(S.NullishOr(S.String)),
  players: S.optional(S.Array(playerSchema)),
});

const matchCompetition = S.Struct({
  id: S.NullishOr(S.String),
  name: S.NullishOr(S.String),
  status: S.NullishOr(S.Enums(CompetitionStatusEnum)),
});

const playerItem = playerSchema.pick(
  "id",
  "firstName",
  "lastName",
  "shirtNumber",
  "shirtName",
  "favPosition",
  "avatarUrl"
);

const matchAparition = S.Struct({
  id: S.String,
  minutes: S.optional(S.NullishOr(S.Number)),
  goals: S.optional(S.NullishOr(S.Number)),
  assists: S.optional(S.NullishOr(S.Number)),
  yellowCards: S.optional(S.NullishOr(S.Number)),
  redCards: S.optional(S.NullishOr(S.Number)),
  injury: S.optional(S.NullishOr(S.Boolean)),
  manOfTheMatch: S.optional(S.NullishOr(S.Boolean)),
  rating: S.optional(S.NullishOr(S.Number)),
  played: S.optional(S.NullishOr(S.Boolean)),
  confirmed: S.optional(S.NullishOr(S.Boolean)),
  playerId: S.optional(S.NullishOr(S.String)),
  matchId: S.optional(S.NullishOr(S.String)),
  player: S.optional(playerItem),
});

export const matchSchema = S.Struct({
  id: S.optional(S.String),
  homeTeamId: S.optional(S.String),
  awayTeamId: S.optional(S.String),
  competitionId: S.optional(S.String),
  createdAt: S.optional(S.Union(S.Date, S.String)),
  title: S.optional(S.String),
  homeTeam: S.optional(matchTeam),
  awayTeam: S.optional(matchTeam),
  awayScore: S.optional(S.NullishOr(S.Number)),
  homeScore: S.optional(S.NullishOr(S.Number)),
  matchDay: S.optional(S.NullishOr(S.Union(S.Date, S.String))),
  matchHour: S.optional(S.NullishOr(S.Union(S.Date, S.String))),
  wo: S.optional(S.Boolean),
  location: S.optional(S.NullishOr(S.String)),
  completed: S.optional(S.Boolean),
  competition: S.optional(matchCompetition),
  matchAparitions: S.optional(S.NullishOr(S.Array(matchAparition))),
});

export type MatchType = S.Schema.Type<typeof matchSchema>;

export class EmptyMatch extends S.TaggedClass<EmptyMatch>()("EmptyMatch", {
  title: matchSchema.fields.title,
  homeTeamId: matchSchema.fields.homeTeamId,
  awayTeamId: matchSchema.fields.awayTeamId,
  competitionId: matchSchema.fields.competitionId,
  matchDay: matchSchema.fields.matchDay,
  matchHour: matchSchema.fields.matchHour,
  wo: matchSchema.fields.wo,
  location: matchSchema.fields.location,
  completed: matchSchema.fields.completed,
  homeScore: matchSchema.fields.homeScore,
  awayScore: matchSchema.fields.awayScore,
}) {}

export class FulfilledMatch extends S.TaggedClass<FulfilledMatch>()(
  "FulfilledMatch",
  {
    ...matchSchema.fields,
  }
) {}

export const FulfilledMatchArray = S.Array(FulfilledMatch);

export const decodeFFMArray = S.decodeUnknown(FulfilledMatchArray);
export const encodeFFMArray = S.encodeUnknown(FulfilledMatchArray);

export const decodeFFM = S.decodeUnknown(FulfilledMatch);
export const encodeFFM = S.encodeUnknown(FulfilledMatch);

export class FulfilledMatchExtended extends FulfilledMatch.extend<FulfilledMatchExtended>(
  "FulfilledMatchExtended"
)({}) {
  get aparitions() {
    return this.matchAparitions ?? [];
  }

  get aparitionsGoals() {
    return this.aparitions.filter((x) => x.goals);
  }

  get playersWhoScored() {
    return this.aparitionsGoals.map((x) => x.player);
  }

  apartitionsByPlayer(pid: string) {
    return this.aparitions.filter((x) => x.player?.id === pid);
  }

  playerGoals(pid: string | undefined) {
    if (!pid) return 0;
    const playerApps = this.apartitionsByPlayer(pid);
    return playerApps.reduce((prev, curr) => prev + (curr.goals ?? 0), 0);
  }

  get scorers() {
    return this.playersWhoScored.map((player) => ({
      name: player?.shirtName?.toLocaleLowerCase(),
      goals: this.playerGoals(player?.id),
    }));
  }
}
