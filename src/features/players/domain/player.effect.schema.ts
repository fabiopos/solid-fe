import * as S from "@effect/schema/Schema";
// import { teamSchema } from '@/lib/Team/domain/TeamSchema';
import {
  DocumentType,
  DominantFoot,
  PlayerStatus,
  ShirtSize,
} from "@/shared/enums/playerEnums";

import { FieldPositionCategoryEnum } from "@/shared/enums/fieldPositionCategoryEnum";
import { fieldPositionSchema } from "@/features/fieldPosition/domain/field-position.schema";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const teamStruct = S.Struct({
  id: S.optional(S.String),
  name: S.optional(S.String),
});

const competitionStruct = S.Struct({
  id: S.optional(S.String),
  name: S.optional(S.String),
});

const aparitionStruct = S.Struct({
  id: S.optional(S.NullishOr(S.String)),
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
  match: S.optional(
    S.Struct({
      id: S.optional(S.String),
      homeTeamId: S.optional(S.String),
      awayTeamId: S.optional(S.String),
      competitionId: S.optional(S.String),
      createdAt: S.optional(S.Date),
      title: S.optional(S.String),
      homeTeam: S.optional(S.NullishOr(teamStruct)),
      awayTeam: S.optional(S.NullishOr(teamStruct)),
      awayScore: S.optional(S.NullishOr(S.Number)),
      homeScore: S.optional(S.NullishOr(S.Number)),
      matchDay: S.optional(S.NullishOr(S.Date)),
      matchHour: S.optional(S.NullishOr(S.Date)),
      wo: S.optional(S.Boolean),
      location: S.optional(S.NullishOr(S.String)),
      completed: S.optional(S.Boolean),
      competition: S.optional(competitionStruct),
    })
  ),
});

export const playerSchema = S.Struct({
  id: S.optional(S.String),
  teamId: S.optional(S.String),
  createdAt: S.optional(S.Union(S.String, S.Date, S.Null)),
  bornDate: S.optional(S.Union(S.String, S.Date, S.Null)),
  firstName: S.optional(S.String),
  lastName: S.optional(S.String),
  documentNumber: S.optional(S.String),
  documentType: S.optional(S.Enums(DocumentType)),
  active: S.optional(S.Boolean),
  status: S.optional(S.Enums(PlayerStatus)),
  email: S.optional(
    S.String.pipe(
      S.pattern(emailRegex, { message: () => "Player email is invalid" })
    )
  ),
  shirtSize: S.optional(S.Enums(ShirtSize)),
  shirtName: S.optional(S.String),
  shirtNumber: S.optional(
    S.Number.pipe(
      S.between(1, 99, { message: () => `Shirt number should be between` })
    )
  ),
  dominantFoot: S.optional(S.Enums(DominantFoot)),
  // team: S.optional(teamSchema),
  favPositionId: S.optional(S.NullOr(S.String)),
  favPosition: S.optional(
    S.NullishOr(
      S.Struct({
        id: S.optional(S.String),
        name: S.optional(S.NullOr(S.String)),
        category: S.optional(S.Enums(FieldPositionCategoryEnum)),
        order: S.optional(S.NullOr(S.Number)),
        fieldPosition: S.optional(fieldPositionSchema),
      })
    )
  ),
  address: S.optional(S.NullishOr(S.String)),
  avatarUrl: S.optional(S.NullishOr(S.String)),
  phone: S.optional(S.NullishOr(S.String)),
  city: S.optional(S.NullishOr(S.String)),
  country: S.optional(S.NullishOr(S.String)),
  eps: S.optional(S.NullishOr(S.String)),
  arl: S.optional(S.NullishOr(S.String)),
  weight: S.optional(
    S.NullishOr(
      S.Number.pipe(
        S.between(35, 200, {
          message: () => `Not supported weight to create a player`,
        })
      )
    )
  ),
  height: S.optional(
    S.NullishOr(
      S.Number.pipe(
        S.between(140, 210, {
          message: () => `Not supported height to create a player`,
        })
      )
    )
  ),
  playerPositions: S.optional(
    S.Array(
      S.Struct({
        id: S.optional(S.String),
        category: S.optional(S.Enums(FieldPositionCategoryEnum)),
        fieldPosition: S.optional(fieldPositionSchema),
      })
    )
  ),
  team: S.optional(teamStruct),
  matchAparitions: S.optional(S.Array(aparitionStruct)),
});

export type SourcePlayerType = S.Schema.Type<typeof playerSchema>;

export type FulfiledPlayerAparition = S.Schema.Type<typeof aparitionStruct>;

export const updatePlayerSchema = playerSchema.pick(
  "active",
  "address",
  "arl",
  "avatarUrl",
  "city",
  "country",
  "dominantFoot",
  "eps",
  "favPositionId",
  "firstName",
  "height",
  "lastName",
  "phone",
  "shirtNumber",
  "shirtName",
  "shirtSize",
  "weight",
  "status",
  "bornDate"
);

export type UpdatePlayerType = S.Schema.Type<typeof updatePlayerSchema>;

export class EmptyPlayer extends S.TaggedClass<EmptyPlayer>()("EmptyPlayer", {
  teamId: playerSchema.fields.teamId,
  firstName: playerSchema.fields.firstName,
  lastName: playerSchema.fields.lastName,
  documentNumber: playerSchema.fields.documentNumber,
  documentType: playerSchema.fields.documentType,
  email: playerSchema.fields.email,
  shirtSize: playerSchema.fields.shirtSize,
  shirtNumber: playerSchema.fields.shirtNumber,
  shirtName: playerSchema.fields.shirtName,
  dominantFoot: playerSchema.fields.dominantFoot,
  favPositionId: playerSchema.fields.favPositionId,
  favPosition: playerSchema.fields.favPosition,
  address: playerSchema.fields.address,
  avatarUrl: playerSchema.fields.avatarUrl,
  phone: playerSchema.fields.phone,
  city: playerSchema.fields.city,
  country: playerSchema.fields.country,
  eps: playerSchema.fields.eps,
  arl: playerSchema.fields.eps,
  weight: playerSchema.fields.weight,
  height: playerSchema.fields.height,
  playerPositions: playerSchema.fields.playerPositions,
  fieldPositions: S.optional(S.Array(S.String)),
  team: S.optional(S.Struct({ id: S.optional(S.String) })),
}) {}

export class FulfilledPlayer extends S.TaggedClass<FulfilledPlayer>()(
  "FulfilledPlayer",
  {
    ...playerSchema.fields,
  }
) {}

export class PartialPlayer extends S.TaggedClass<PartialPlayer>()(
  "PartialPlayer",
  {
    ...updatePlayerSchema.fields,
  }
) {}

// export const decodePartialPlayer = S.decodeUnknownEither(PartialPlayer, {
//   errors: 'all',
// });

export class FulfilledPlayerWithStats extends S.TaggedClass<FulfilledPlayerWithStats>()(
  "FulfilledPlayerWithStats",
  {
    ...playerSchema.fields,
    totalTeamMatches: S.optional(S.Number),
    playedMatches: S.optional(S.Number),
    goalsCount: S.optional(S.Number),
    minutesPlayed: S.optional(S.Number),
    assists: S.optional(S.Number),
    playedMatchesPerc: S.optional(S.Number),
    goalsAvg: S.optional(S.Number),
    assistsAvg: S.optional(S.Number),
    minutesPerc: S.optional(S.Number),
  }
) {}

export const decodePWS = S.decodeUnknown(FulfilledPlayerWithStats);

export const encodePWS = S.encodeUnknown(FulfilledPlayerWithStats);
//const p = Effect.runPromise( decodePWS({}).pipe(p => p.))
