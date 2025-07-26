import { type Config } from "@/entities/config/Config.entity";
import { Context, Effect } from "effect";
import { makeConfig } from "./config.infra";

export class ConfigService extends Context.Tag("ConfigService")<
  ConfigService,
  {
    readonly getConfig: Effect.Effect<Config>;
  }
>() {}

export type ConfigShape = Context.Tag.Service<ConfigService>;

export const configService = ConfigService.of({
  getConfig: Effect.sync(() => makeConfig()),
});
