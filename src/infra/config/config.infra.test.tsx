import { describe, expect, it } from "vitest";
import { makeConfig } from "./config.infra";

describe("Config tests", () => {
  it("returns config object", () => {
    const config = makeConfig();
    expect(config._tag === "Config");
  });
});
