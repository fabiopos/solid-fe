import { Schema as S } from "effect";

export const credentialsSchema = S.Struct({
  email: S.String,
  password: S.String,
});

export type CredentialsSchemaType = S.Schema.Type<typeof credentialsSchema>;

export const tokenSchema = S.Struct({
  email: credentialsSchema.fields.email,
  name: S.String,
  subscriptionId: S.String,
  tid: S.String,
});

export type TokenSchemaType = S.Schema.Type<typeof tokenSchema>;

export const authSchema = S.Struct({
  user: tokenSchema,
  token: S.String,
});

export type AuthSchemaType = S.Schema.Type<typeof authSchema>;
