import { Config } from "@/entities/config/Config.entity";

export function makeConfig() {
  return Config.make({});
}
