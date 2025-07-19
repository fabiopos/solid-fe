import { Schema as S } from "@effect/schema";

export const fieldPositionSchema = S.Struct({
  id: S.optional(S.String),
  createdAt: S.optional(S.Union(S.String, S.Date, S.Null)),
  name: S.optional(S.String),
  description: S.optional(S.NullishOr(S.String)),
  order: S.optional(S.Number),
  category: S.optional(S.NullishOr(S.String)),
});

export type FieldPositionType = S.Schema.Type<typeof fieldPositionSchema>;

export class FulfilledFieldPosition extends S.TaggedClass<FulfilledFieldPosition>()(
  "FulfilledFieldPosition",
  {
    ...fieldPositionSchema.fields,
  }
) {}

export const decodeFP = S.decodeUnknown(FulfilledFieldPosition);

export const encodeFP = S.encodeUnknown(FulfilledFieldPosition);
