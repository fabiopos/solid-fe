import { Schema as S } from "effect";
import configJson from "../../data/config/config.json";

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
});

export type Endpoint = S.Schema.Type<typeof endpoint>;

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

export class AuthConfig extends S.TaggedClass<AuthConfig>()("AuthConfig", {}) {
  getLoginEndpoint = (): Endpoint => ({
    endpoint: configJson.auth.login,
    method: "POST",
  });

  get2FAEndpoint = (): Endpoint => ({
    endpoint: configJson.auth["2fa"],
    method: "POST",
  });

  get2FAVerifyEndpoint = (): Endpoint => ({
    endpoint: configJson.auth["2faverify"],
    method: "POST",
  });

  get2FADepsEndpoint = (): Endpoint => ({
    endpoint: configJson.auth.invite,
    method: "GET",
  });
}

export class PlayerConfig extends S.TaggedClass<PlayerConfig>()(
  "PlayerConfig",
  {}
) {
  getPlayerAddEndpoint = (): Endpoint => ({
    endpoint: configJson.player.add,
    method: "POST",
  });

  getPlayerUpdateEndpoint = (pid: string): Endpoint => ({
    endpoint: configJson.player.update.replace(":pid", pid),
    method: "PATCH",
  });

  getPlayerGetEndpoint = (tid: string): Endpoint => ({
    endpoint: configJson.player.getAll.replace(":tid", tid),
    method: "GET",
  });

  getPlayerFindEndpoint = (pid: string): Endpoint => ({
    endpoint: configJson.player.find.replace(":pid", pid),
    method: "GET",
  });

  getPlayerDeleteEndpoint = (pid: string): Endpoint => ({
    endpoint: configJson.player.delete.replace(":pid", pid),
    method: "DELETE",
  });
}

export class UserConfig extends S.TaggedClass<UserConfig>()("UserConfig", {}) {
  getUserAddEndpoint = (): Endpoint => ({
    endpoint: configJson.user.add,
    method: "POST",
  });

  getUserUpdateEndpoint = (uid: string): Endpoint => ({
    endpoint: configJson.user.update.replace(":uid", uid),
    method: "PATCH",
  });

  getUserDeleteEndpoint = (uid: string): Endpoint => ({
    endpoint: configJson.user.delete.replace(":uid", uid),
    method: "DELETE",
  });

  getUserGetAllEndpoint = (): Endpoint => ({
    endpoint: configJson.user.getAll,
    method: "GET",
  });

  getUserValidateEndpoint = (): Endpoint => ({
    endpoint: configJson.user.validate,
    method: "POST",
  });
}

export class TeamConfig extends S.TaggedClass<TeamConfig>()("TeamConfig", {}) {
  getTeamGetAllEndpoint = (): Endpoint =>
    endpoint.make({
      endpoint: configJson.team.getAll,
      method: "GET",
    });

  getTeamAddEndpoint = (): Endpoint =>
    endpoint.make({
      endpoint: configJson.team.add,
      method: "POST",
    });

  getTeamGetByIdEndpoint = (tid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.team.getById.replace(":tid", tid),
      method: "GET",
    });

  getTeamDeleteEndpoint = (tid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.team.delete.replace(":tid", tid),
      method: "DELETE",
    });

  getTeamUpdateEndpoint = (tid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.team.update.replace(":tid", tid),
      method: "PATCH",
    });

  getTeamValidateEndpoint = (): Endpoint =>
    endpoint.make({
      endpoint: configJson.team.validate,
      method: "POST",
    });

  getTeamSearchByNameEndpoint = (name: string): Endpoint =>
    endpoint.make({
      endpoint: `${configJson.team.searchByName}?name=${name}`,
      method: "GET",
    });

  getTeamInviteValidateEndpoint = (): Endpoint =>
    endpoint.make({
      endpoint: configJson.team.inviteValidate,
      method: "POST",
    });
}

export class SubscriptionConfig extends S.TaggedClass<SubscriptionConfig>()(
  "SubscriptionConfig",
  {}
) {
  getSubsGetAllEndpoint = (): Endpoint =>
    endpoint.make({
      endpoint: configJson.subscription.getAll,
      method: "GET",
    });

  getSubsAddEndpoint = (): Endpoint =>
    endpoint.make({
      endpoint: configJson.subscription.createFull,
      method: "POST",
    });

  getTeamFindByIdEndpoint = (sid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.subscription.findById.replace(":sid", sid),
      method: "GET",
    });
}

export class SeasonConfig extends S.TaggedClass<SeasonConfig>()(
  "SeasonConfig",
  {}
) {
  getAll = (): Endpoint =>
    endpoint.make({
      endpoint: configJson.season.getAll,
      method: "GET",
    });

  find = (ssid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.season.find.replace(":ssid", ssid),
      method: "GET",
    });

  getSeasonTree = (ssid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.season.getSeasonTree.replace(":ssid", ssid),
      method: "GET",
    });

  getAllSeasonBySubscription = (sid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.season.getAllSeasonBySubscription.replace(
        ":sid",
        sid
      ),
      method: "GET",
    });

  create = (tid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.season.create.replace(":tid", tid),
      method: "POST",
    });

  update = (ssid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.season.update.replace(":ssid", ssid),
      method: "PATCH",
    });

  delete = (ssid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.season.delete.replace(":ssid", ssid),
      method: "DELETE",
    });
}

export class FieldPositionConfig extends S.TaggedClass<FieldPositionConfig>()(
  "FieldPositionConfig",
  {}
) {
  getAll = (): Endpoint =>
    endpoint.make({
      endpoint: configJson.fieldPosition.getAll,
      method: "GET",
    });
}

export class DashboardConfig extends S.TaggedClass<DashboardConfig>()(
  "DashboardConfig",
  {}
) {
  getTeamStats = (tid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.dashboard.getTeamStats.replace(":tid", tid),
      method: "GET",
    });

  getLastPlayersAdded = (tid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.dashboard.getLastPlayersAdded.replace(":tid", tid),
      method: "GET",
    });

  getLastMatches = (tid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.dashboard.getLastMatches.replace(":tid", tid),
      method: "GET",
    });

  getNextMatches = (tid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.dashboard.getNextMatches.replace(":tid", tid),
      method: "GET",
    });

  getTopScorers = (tid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.dashboard.getTopScorers.replace(":tid", tid),
      method: "GET",
    });

  getAsists = (tid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.dashboard.getAsists.replace(":tid", tid),
      method: "GET",
    });

  getCalendar = (tid: string): Endpoint =>
    endpoint.make({
      endpoint: configJson.dashboard.getCalendar.replace(":tid", tid),
      method: "GET",
    });
}

export const Config = S.Struct({
  auth: AuthConfig,
  user: UserConfig,
  player: PlayerConfig,
  team: TeamConfig,
  subscription: SubscriptionConfig,
  season: SeasonConfig,
  fieldPosition: FieldPositionConfig,
  dashboard: DashboardConfig,
});

export type Config = S.Schema.Type<typeof Config>;

//export class Config extends S.TaggedClass("Config")<Config>{}
