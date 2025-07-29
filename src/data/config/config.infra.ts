import {
  AuthConfig,
  DashboardConfig,
  FieldPositionConfig,
  PlayerConfig,
  SeasonConfig,
  SubscriptionConfig,
  TeamConfig,
  UserConfig,
  type Config,
} from "@/entities/config/Config.entity";

export function makeConfig(): Config {
  return {
    auth: AuthConfig.make(),
    player: PlayerConfig.make(),
    team: TeamConfig.make(),
    user: UserConfig.make(),
    subscription: SubscriptionConfig.make(),
    season: SeasonConfig.make(),
    fieldPosition: FieldPositionConfig.make(),
    dashboard: DashboardConfig.make(),
  } as Config;
}
