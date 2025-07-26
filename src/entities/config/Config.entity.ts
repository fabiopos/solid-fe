import { Schema as S } from "effect";
import configJson from "../../infra/config/config.json";

export const MethodType = S.Union(
  S.Literal("GET"),
  S.Literal("POST"),
  S.Literal("PATCH"),
  S.Literal("DELETE")
);

export type MethodType = S.Schema.Type<typeof MethodType>;

export const endpoint = S.Struct({
  method: MethodType,
  endpoint: S.String,
  isPrivate: S.optional(S.Boolean),
});

export const config = S.Struct({
  auth: S.Struct({
    login: endpoint,
    twoFactor: S.Struct({
      create: endpoint,
      verify: endpoint,
      invite: endpoint,
    }),
  }),
  player: S.Struct({
    addPlayer: endpoint,
    removePlayer: endpoint,
    updatePlayer: endpoint,
    getAll: endpoint,
    findById: endpoint,
  }),
});

export class Config extends S.TaggedClass<Config>()("Config", {}) {
  baseConfig = null;

  getLoginUrl = () => configJson.auth.login;
  get2FAUrl = () => configJson.auth["2fa"];
  get2FAVerifyUrl = () => configJson.auth["2faverify"];
  get2FADepsUrl = () => configJson.auth.invite;
  getPlayerAddUrl = () => configJson.player.add;
  getPlayerUpdateUrl = () => configJson.player.update;
}

//export class Config extends S.TaggedClass("Config")<Config>{}
